import jwt from "jsonwebtoken";
import { ForbiddenRequestError } from "./../core/error.response";
import catchAsyncError from "./catchAsyncError";
import { User } from "../models";
import { NextFunction, Request, Response } from "express";

export const isAuthenticated = catchAsyncError(
  async (req: Request, _: Response, next: NextFunction) => {
    const { token } = req.cookies;

    if (!token) {
      throw new ForbiddenRequestError("You not logging!");
    }

    const decodedToken: any = await jwt.verify(
      token,
      process.env.SECRET_KEY_TOKEN as string
    );

    req.user = await User.findById(decodedToken.id);
    next();
  }
);

export const authorizeRoles = (...roles: string[]) => {
  return (req: Request, _: Response, next: NextFunction) => {
    if (!roles.includes(req.user.role)) {
      throw new ForbiddenRequestError();
    }
    next();
  };
};
