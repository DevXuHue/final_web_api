import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class CreateRoomType {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(20)
  description: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  short_description: string;

  @IsString()
  @IsNotEmpty()
  thumbnail: string;
}

export class UpdateRoomType {
  @IsString()
  title: string;

  @IsString()
  @MinLength(20)
  description: string;

  @IsString()
  @MaxLength(50)
  short_description: string;

  @IsString()
  thumbnail: string;
}

export class ParamsRoomType {
  @IsString()
  @IsNotEmpty()
  id: string;
}
