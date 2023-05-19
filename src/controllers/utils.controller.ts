import { NextFunction, Request, Response } from "express";
import catchAsyncError from "../middleware/catchAsyncError";
import { SuccessResponse } from "../core";
import { UtilsService } from "../services/utils.service";

class UtilsController {
  getAll = catchAsyncError(
    async (_req: Request, res: Response, _next: NextFunction) => {
      new SuccessResponse({
        message: "get all utils",
        metadata: await UtilsService.getAll(),
      }).send(res);
    }
  );

  getOne = catchAsyncError(
    async (req: Request, res: Response, _next: NextFunction) => {
      const { id } = req.params;
      new SuccessResponse({
        message: "get one successfully",
        metadata: await UtilsService.getOneById(id),
      }).send(res);
    }
  );

  create = catchAsyncError(
    async (req: Request, res: Response, _next: NextFunction) => {
      new SuccessResponse({
        message: "create successfully",
        metadata: await UtilsService.create(req.body, req.user.id),
      }).send(res);
    }
  );

  update = catchAsyncError(
    async (req: Request, res: Response, _next: NextFunction) => {
      new SuccessResponse({
        message: "update successfully",
        metadata: await UtilsService.update(req.body, req.params.id),
      }).send(res);
    }
  );
}

export const utilsController = new UtilsController();
