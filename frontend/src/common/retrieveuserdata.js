import { checkUser } from "../api/auth";
import { getUserDataByEmailAddress } from "../api/users";

export const getUserData = async () => {
  const userEmail = await checkUser();
  if (userEmail === null) {
    return null;
  }
  const userData = await getUserDataByEmailAddress(userEmail);
  return userData;
};
