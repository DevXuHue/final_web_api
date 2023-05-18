import {
  IsBoolean,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";

export class CreateRoomInput {
  @IsString()
  @IsPhoneNumber("VI")
  @IsNotEmpty()
  phoneConnect: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  acreage: string;

  @IsBoolean()
  utilities: boolean;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(30)
  description: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(50)
  body: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  short_description: string;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsString()
  to: string;

  @IsString()
  form: string;

  @IsString()
  user_booking: string;

  @IsString()
  images: string;
}

export class UpdateRoomInput {
  @IsString()
  @IsPhoneNumber("VI")
  phoneConnect: string;

  @IsString()
  address: string;

  @IsString()
  acreage: string;

  @IsBoolean()
  utilities: boolean;

  @IsString()
  title: string;

  @IsString()
  @MinLength(30)
  description: string;

  @IsString()
  @MinLength(50)
  body: string;

  @IsString()
  @MaxLength(50)
  short_description: string;

  @IsString()
  type: string;

  @IsString()
  to: string;

  @IsString()
  form: string;

  @IsString()
  user_booking: string;

  @IsString()
  images: string;
}

export class ParamsRoom {
  @IsString()
  id: string;
}
