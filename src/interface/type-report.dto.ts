import { IsNotEmpty, IsNumber, IsString, MinLength } from "class-validator";

export class CreateReportType {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(20)
  description: string;

  @IsNotEmpty()
  @IsNumber()
  level: number;
}

export class UpdateReportType {
  @IsString()
  title: string;

  @IsString()
  @MinLength(20)
  description: string;

  @IsNumber()
  level: number;
}

export class ParamsReportType {
  @IsString()
  id: string;
}
