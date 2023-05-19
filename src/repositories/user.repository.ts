import { NotFoundRequestError } from "./../core/error.response";
import { User } from "../models";

export const findUserById = async (id: string) => {
  const user = await User.findById(id);

  if (user) return user;
  throw new NotFoundRequestError("user not found");
};

export const findAllCustomer = async () => {
  return await User.find({});
};

export const findAllCustomerLean = async () => {
  return await User.find({}).lean();
};

export const findUserByIdAndUpdate = async (data: any, id: string) => {
  return await User.findByIdAndUpdate(id, data);
};
