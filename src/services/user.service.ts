import crypto from "crypto";
import cloundinary from "cloudinary";
import { Response } from "express";
import { ReasonPhrases, StatusCodes } from "../enums";
import {
  RegisterUserInput,
  ResetPasswordInput,
  ForgotPassworInput,
  LoginUserInput,
} from "../interface/User.dto";
import { User } from "../models";
import { checkValidator } from "../utils/handle-validator";
import sendToken from "../utils/jwtToken";
import {
  BadRequestError,
  ErrorResponse,
  NotFoundRequestError,
} from "./../core/error.response";
import { sendEmail } from "./../utils/sendEmailChangeOrForgotPassword";

export class UserService {
  static register = async (body: RegisterUserInput, res: Response) => {
    await checkValidator(RegisterUserInput, body);
    const { email, password, username, avatar } = body;

    if (!avatar) {
      const newUser = await User.create({
        username,
        password,
        email,
      });

      return sendToken(newUser, 200, res);
    }

    const myClound = await cloundinary.v2.uploader.upload(avatar, {
      folder: "avatar",
      type: "facebook",
      format: "jpg",
    });

    const user = await User.create({
      ...body,
      avatar: {
        public_id: myClound.public_id,
        url: myClound.url,
      },
    });

    return sendToken(user, 200, res);
  };

  static async login(body: LoginUserInput, res: Response) {
    await checkValidator(LoginUserInput, body);
    const { email, password } = body;
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      throw new NotFoundRequestError("Wrong user or password!");
    }

    // @ts-ignore
    const isPasswrodMatched = await user.comparePassword(password);

    if (!isPasswrodMatched) {
      throw new ErrorResponse(
        "Wrong email or password",
        StatusCodes.BAD_REQUEST
      );
    }

    return sendToken(user, 200, res);
  }

  static logout(res: Response) {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });
  }

  static async forgotPassword(body: ForgotPassworInput) {
    await checkValidator(ForgotPassworInput, body);

    const { email } = body;

    const user = await User.findOne({ email });
    if (!user) throw new NotFoundRequestError("User not found");

    // @ts-ignore
    const tokenReset: string = await user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false });

    const resetPasswordUrl: string = `http://localhost:3000/reset-password/${tokenReset}`;

    const message: string = `Your password reset token is <a href="${resetPasswordUrl}">Click</a> you have a link`;

    try {
      await sendEmail({
        email: user.email,
        suject: "Ecommerce",
        message: `<b>Changepassword Link:${message} </b>`,
        html: `<b>Changepassword Link: ${message}</b>`,
      });

      return {
        email: user.email,
        suject: "Quản lý Thành - Trường - Kiên",
        html: `<b>Changepassword Link: </b>${message}`,
      };
    } catch (error) {
      // @ts-ignore
      user.resetPasswordToken = undefined;
      // @ts-ignore
      user.resetPasswordExpire = undefined;

      await user.save({ validateBeforeSave: false });

      throw new ErrorResponse(
        ReasonPhrases.INTERNAL_SERVER_ERROR,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  static resetPassowrd = async (
    body: ResetPasswordInput,
    res: Response,
    token: string
  ) => {
    await checkValidator(ResetPasswordInput, body);
    const resetPasswordToken = await crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordExpire: { $gt: Date.now() },
      resetPasswordToken,
    });

    if (!user) throw new NotFoundRequestError("User not found");

    const { password, passwordConfirm } = body;
    if (password !== passwordConfirm) throw new BadRequestError();

    user.password = password;
    await user.save();

    sendToken(user, StatusCodes.OK, res);
  };
}
