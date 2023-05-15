import { SuccessResponse } from "./../core/success.response";
import { ReportService } from "./../services";
import { NextFunction, Request, Response } from "express";
import catchAsyncError from "../middleware/catchAsyncError";
import { ReportParams } from "../interface";

class ReportController {
  getAll = catchAsyncError(
    async (_req: Request, res: Response, _next: NextFunction) => {
      const data = await ReportService.getAll();
      new SuccessResponse({
        message: "get all reports",
        metadata: data,
      }).send(res);
    }
  );

  getById = catchAsyncError(
    async (req: Request, res: Response, _next: NextFunction) => {
      const { id } = <ReportParams>(<unknown>req.params);
      const data = await ReportService.getById(id, req.user.id);
      new SuccessResponse({
        message: "get report by id",
        metadata: data,
      }).send(res);
    }
  );

  getMe = catchAsyncError(
    async (req: Request, res: Response, _next: NextFunction) => {
      const { id } = req.user;
      const data = await ReportService.getReportByMe(id);
      new SuccessResponse({
        message: "get reports by me",
        metadata: data,
      }).send(res);
    }
  );
}

export const reportController = new ReportController();
