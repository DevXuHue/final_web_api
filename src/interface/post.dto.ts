import { IsNotEmpty, IsString } from "class-validator";

export class CreatePostInput {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  short_description: string;

  @IsString()
  @IsNotEmpty()
  body: string;

  @IsString()
  thumbnail: string;

  @IsString()
  @IsNotEmpty()
  categoryId: string;
}

export class UpdatePostInput {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  short_description: string;

  @IsString()
  body: string;

  @IsString()
  @IsNotEmpty()
  categoryId: string;
}

export class ParamsPost {
  @IsString()
  id: string;
}
