import { IsString } from "class-validator";

export class ParamsBill {
  @IsString()
  id: string;
}
