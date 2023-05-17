import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class Clound {
  @IsString()
  public_id: string;

  @IsString()
  url: string;
}

export class LoginUserInput {
  @IsString({
    message: "Vui lòng nhập đúng dữ liệu!",
  })
  @IsNotEmpty({
    message: "Vui lòng nhập trường email",
  })
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  @IsNotEmpty()
  password: string;
}

export class RegisterUserInput {
  @IsString({
    message: "Vui lòng nhập đúng dữ liệu!",
  })
  @IsNotEmpty({
    message: "Vui lòng nhập trường email",
  })
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  avatar: string;
}

export class ForgotPassworInput {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;
}

export class ResetPasswordInput {
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  passwordConfirm: string;
}
