import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreatePostInput {
  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  title: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(30)
  description: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(30)
  short_description: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(50)
  body: string;

  @IsString()
  thumbnail: string;
}

export class UpdatePostInput {
  @IsString()
  @MinLength(10)
  title: string;

  @IsString()
  @MinLength(30)
  description: string;

  @IsString()
  @MinLength(30)
  short_description: string;

  @IsString()
  @MinLength(50)
  body: string;

  @IsString()
  @IsNotEmpty()
  categoryId: string;
}

export class ParamsPost {
  @IsString()
  id: string;
}
