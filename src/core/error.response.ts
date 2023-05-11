import { StatusCodes, ReasonPhrases } from "../enums";

export class ErrorResponse extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

export class ConflictRequestError extends ErrorResponse {
  constructor(
    message: string = ReasonPhrases.CONFLICT,
    status: number = StatusCodes.CONFLICT
  ) {
    super(message, status);
  }
}

export class ForbiddenRequestError extends ErrorResponse {
  constructor(
    message: string = ReasonPhrases.FORBIDDEN,
    status: number = StatusCodes.FORBIDDEN
  ) {
    super(message, status);
  }
}

export class NotFoundRequestError extends ErrorResponse {
  constructor(
    message: string = ReasonPhrases.NOT_FOUND,
    status: number = StatusCodes.NOT_FOUND
  ) {
    super(message, status);
  }
}

export class AuthFailureError extends ErrorResponse {
  constructor(
    message: string = ReasonPhrases.UNAUTHORIZED,
    statusCode = StatusCodes.UNAUTHORIZED
  ) {
    super(message, statusCode);
  }
}
