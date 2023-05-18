import { CommonService } from "./../services";
import { NextFunction, Request, Response } from "express";
import catchAsyncError from "../middleware/catchAsyncError";
import { SuccessResponse } from "../core";

class CommonController {
  dataIndex = catchAsyncError(
    async (_req: Request, res: Response, _next: NextFunction) => {
      const data = await CommonService.dataIndex();
      new SuccessResponse({
        message: "get data index successfully",
        metadata: data,
      }).send(res);
    }
  );
}

export const commonController = new CommonController();
