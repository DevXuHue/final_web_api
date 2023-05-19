import { Response } from "express";
import { StatusCodes, ReasonPhrases } from "../enums";

interface ContructorData {
  message?: string;
  statusCode?: number;
  reasonStatusCode?: string;
  metadata?: any;
  options?: any;
}

export class SuccessResponse {
  message: string;
  status: number;
  metadata: any;
  options: any;

  constructor({
    message,
    statusCode = StatusCodes.OK,
    reasonStatusCode = ReasonPhrases.OK,
    metadata = {},
    options = {},
  }: ContructorData) {
    this.message = !message ? reasonStatusCode : message;
    this.status = statusCode;
    this.metadata = metadata;
    this.options = options;
  }

  send(res: Response) {
    return res.status(this.status).json(this);
  }

  async sendToken(_user: any, _statusCode: StatusCodes.OK, _token: string) {}
}
export class Oke extends SuccessResponse {
  constructor({ message, metadata, options }: ContructorData) {
    super({ message, metadata, options });
  }
}

export class Created extends SuccessResponse {
  constructor({
    message,
    statusCode = StatusCodes.CREATED,
    reasonStatusCode = ReasonPhrases.CREATED,
    metadata,
    options,
  }: ContructorData) {
    super({
      message,
      statusCode,
      reasonStatusCode,
      metadata,
      options,
    });
  }
}
