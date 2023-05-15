import { Type } from "class-transformer";
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsPhoneNumber,
  IsString,
  MaxLength,
  MinLength,
  ValidateNested,
} from "class-validator";

export class InfoRoom {
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
}

export class CreateRoomInput {
  @ValidateNested()
  info: InfoRoom;

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

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsString()
  @IsNotEmpty()
  type: string;
}
