import { MinLength } from "class-validator";
import { IsNotEmpty } from "class-validator";
import { IsString } from "class-validator";

export class CreateCategoryPost {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(20)
  description: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(20)
  shortDescription: string;

  @IsString()
  @IsNotEmpty()
  thumbnail: string;
}
