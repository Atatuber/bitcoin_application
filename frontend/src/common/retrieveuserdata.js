import { checkUser } from "../api/auth";
import { getUserDataByEmailAddress } from "../api/users";

export const getUserData = async () => {
  const user = await checkUser();

  if (user === null) {
    return null;
  }

  const userData = await getUserDataByEmailAddress(user);

  return userData;
};
