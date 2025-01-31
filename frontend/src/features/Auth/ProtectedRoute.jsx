import { Outlet, useNavigate, useLoaderData } from "react-router-dom";
import { useEffect } from "react";

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

