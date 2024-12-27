import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { checkUser } from "../../api/auth";

export default function ProtectedRoute() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyAuth = async () => {
      const user = await checkUser();
      if (user && user !== null) {
        setIsAuthenticated(true);
      } 
      if(user === null) {
        setIsAuthenticated(false);
        navigate("/login", { replace: true });
      }
    };

    verifyAuth();
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
