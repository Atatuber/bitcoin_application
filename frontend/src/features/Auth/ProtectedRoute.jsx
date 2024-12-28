import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { checkUser } from "../../api/auth";
import { getUserData } from "../../common/retrieveuserdata";
import { updateWalletBalances } from "../../common/updatebalance";

export default function ProtectedRoute() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const authenticateUser = async () => {
      try {
        const user = await checkUser();
        if (!user) {
          setIsAuthenticated(false);
          navigate("/login", { replace: true });
          return null;
        }

        const userData = await getUserData();
        if (!userData || !userData.account_id) {
          console.error("User data not found or invalid");
          setIsAuthenticated(false);
          navigate("/login", { replace: true });
          return null;
        }

        setIsAuthenticated(true);
        return userData;
      } catch (error) {
        console.error("Error during authentication", error);
        setIsAuthenticated(false);
        navigate("/login", { replace: true });
        return null;
      }
    };

    const initialize = async () => {
      const userData = await authenticateUser();
      if (userData) {
        await updateWalletBalances(userData.account_id);
      }
    };

    initialize();
  }, [navigate]);

  if (isAuthenticated === null) {
    return (
      <h1 className="flex justify-center items-center font-bold text-xl">
        Laden...
      </h1>
    );
  }

  return <Outlet />;
}
