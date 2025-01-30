import { Outlet, useNavigate, useLoaderData } from "react-router-dom";
import { useEffect } from "react";
import { checkUser } from "../../api/auth";
import { getUserData } from "../../common/retrieveuserdata";

export async function loader() {
  try {
    const [user, userData] = await Promise.all([checkUser(), getUserData()]);

    if (!user || !userData || !userData.account_id) {
      return { user: null, userData: null };
    }

    return {
      user,
      userData,
    };
  } catch (error) {
    console.error("Error in loader:", error);
    return { user: null, userData: null };
  }
}

export default function ProtectedRoute() {
  const navigate = useNavigate();
  const { user, userData } = useLoaderData();

  useEffect(() => {
    if (user === null || userData === null) {
      navigate("/login", { replace: true });
    }
  }, [user, userData, navigate]);

  if (user === null || userData === null) {
    return null; 
  }

  return <Outlet context={userData} />;
}

