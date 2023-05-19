import { ReasonPhrases } from "./../enums/reason-phrases";
import { StatusCodes } from "../enums";
import { NextFunction, Request, Response } from "express";
import { SuccessResponse } from "../core";
import catchAsyncError from "../middleware/catchAsyncError";
import { UserService } from "../services";
import {
  ForgotPassworInput,
  LoginUserInput,
  RegisterUserInput,
  ResetPasswordInput,
  UpdateUserInput,
} from "./../interface/User.dto";
import { ParamsBill } from "../interface";

class UserController {
  register = catchAsyncError(
    async (req: Request, res: Response, _next: NextFunction) => {
      const createInput = <RegisterUserInput>req.body;
      const data = await UserService.register(createInput);
      new SuccessResponse({
        message: "create success",
        statusCode: StatusCodes.CREATED,
        metadata: data,
        reasonStatusCode: ReasonPhrases.CREATED,
      }).send(res);
    }
  );

  login = catchAsyncError(
    async (req: Request, res: Response, _next: NextFunction) => {
      const loginInput = <LoginUserInput>req.body;
      const data = await UserService.login(loginInput, res);
      new SuccessResponse({
        message: "login success",
        statusCode: StatusCodes.OK,
        metadata: data,
        reasonStatusCode: ReasonPhrases.OK,
      });
    }
  );

  logout = catchAsyncError(
    async (_req: Request, res: Response, _next: NextFunction) => {
      await UserService.logout(res);
      new SuccessResponse({
        message: "logout success",
        statusCode: StatusCodes.OK,
        reasonStatusCode: ReasonPhrases.OK,
      }).send(res);
    }
  );

  forgotPassword = catchAsyncError(
    async (req: Request, res: Response, _next: NextFunction) => {
      const forgotPasswordInput = <ForgotPassworInput>req.body;
      const data = await UserService.forgotPassword(forgotPasswordInput);
      new SuccessResponse({
        message: "logout success",
        statusCode: StatusCodes.OK,
        reasonStatusCode: ReasonPhrases.OK,
        metadata: data,
      }).send(res);
    }
  );

  resetPassword = catchAsyncError(
    async (req: Request, res: Response, _next: NextFunction) => {
      const resetPasswordInput = <ResetPasswordInput>req.body;
      const data = await UserService.resetPassowrd(
        resetPasswordInput,
        res,
        req.params.token
      );
      new SuccessResponse({
        message: "logout success",
        statusCode: StatusCodes.OK,
        reasonStatusCode: ReasonPhrases.OK,
        metadata: data,
      });
    }
  );

  me = catchAsyncError(
    async (req: Request, res: Response, _next: NextFunction) => {
      const data = await UserService.me(req.user.id);
      new SuccessResponse({
        message: "get me success",
        metadata: data,
      }).send(res);
    }
  );

  getAllCustomer = catchAsyncError(
    async (_req: Request, res: Response, _next: NextFunction) => {
      const customer = await UserService.getCustommer();
      new SuccessResponse({
        message: "get all customer successfully",
        metadata: {
          customer,
        },
      }).send(res);
    }
  );

  getOne = catchAsyncError(
    async (req: Request, res: Response, _next: NextFunction) => {
      const { id } = <ParamsBill>(<unknown>req.params);
      new SuccessResponse({
        message: "get one users",
        metadata: await UserService.getOne(id),
      }).send(res);
    }
  );

  updateUser = catchAsyncError(
    async (req: Request, res: Response, _next: NextFunction) => {
      const { id } = <ParamsBill>(<unknown>req.params);
      const body = <UpdateUserInput>req.body;
      console.log(id);
      const data = await UserService.updateUser(body, id);
      new SuccessResponse({
        message: "update user success",
        metadata: data,
      }).send(res);
    }
  );
}

export const userController = new UserController();
