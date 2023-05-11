import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { StatusCodes, ReasonPhrases } from "../enums";
import { ErrorResponse } from "./../core/error.response";

export async function checkValidator(typeInput: any, body: any) {
  const checkData = plainToInstance(typeInput, body);
  const errors = await validate(checkData);
  if (errors.length) {
    let rawErrors: string[] = [];
    for (const errorItem of errors) {
      rawErrors = rawErrors.concat(
        ...rawErrors,
        Object.values(errorItem.constraints ?? [])
      );
    }

    throw new ErrorResponse(
      ReasonPhrases.BAD_REQUEST,
      StatusCodes.BAD_REQUEST,
      rawErrors
    );
  }
}
