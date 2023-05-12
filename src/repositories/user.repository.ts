import { NotFoundRequestError } from "./../core/error.response";
import { User } from "../models";

export const findUserById = async (id: string) => {
  const user = await User.findById(id);

  if (user) return user;
  throw new NotFoundRequestError("user not found");
};
