import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsPhoneNumber,
  IsString,
} from "class-validator";

export class CreateReport {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  level: number;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  emailConnect: string;

  @IsString()
  @IsNotEmpty()
  @IsPhoneNumber("VI")
  phoneConnect: string;

  @IsString()
  @IsNotEmpty()
  roomId: string;
}

export class ReportParams {
  @IsString()
  @IsNotEmpty()
  id: string;
}

export class UpdateReport {}
