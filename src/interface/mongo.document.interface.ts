import { Role } from "../models/user.model";
import { CloundImage } from ".";

export interface User {
  username: string;
  email: string;
  password: string;
  avatar?: CloundImage;
  role: Role;
  phone?: string;
  address?: string;
  resetPasswordToken: string;
  resetPasswordExpire: Date;
}

export interface ICollectionModelName {
  collection: string;
  document: string;
}
