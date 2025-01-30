import { Outlet, useNavigate, useLoaderData } from "react-router-dom";
import { checkUser } from "../../api/auth";
import { getUserData } from "../../common/retrieveuserdata";

export async function loader() {
  try {
    const [user, userData] = await Promise.all([checkUser(), getUserData()]);

    if (!user || !userData || !userData.account_id) {
      return null;
    }

    return {
      user,
      userData,
    };
  } catch (error) {
    console.error("Error in loader:", error);
    return null;
  }
}

export default function ProtectedRoute() {
  const navigate = useNavigate();
  const { user, userData } = useLoaderData();

  if (!user || !userData) {
    navigate("/login", { replace: true });
    return null;
  }

  return <Outlet context={userData} />;
}
