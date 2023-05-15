import {
  CreateReportType,
  ParamsReportType,
  UpdateReportType,
} from "./../interface";
import { SuccessResponse } from "./../core";
import { ReportTypeService } from "./../services";
import { NextFunction, Request, Response } from "express";
import catchAsyncError from "../middleware/catchAsyncError";

class TypeReportController {
  findAll = catchAsyncError(
    async (_req: Request, res: Response, _next: NextFunction) => {
      const data = await ReportTypeService.getAllReportTypes();
      new SuccessResponse({
        message: "get all typereports",
        metadata: data,
      }).send(res);
    }
  );

  findOne = catchAsyncError(
    async (req: Request, res: Response, _next: NextFunction) => {
      const { id } = <ParamsReportType>(<unknown>req.params);
      const data = await ReportTypeService.getReportTypeById(id);
      new SuccessResponse({
        message: "get report port successfully",
        metadata: data,
      }).send(res);
    }
  );

  create = catchAsyncError(
    async (req: Request, res: Response, _next: NextFunction) => {
      const input = <CreateReportType>req.body;
      const data = await ReportTypeService.createReportType(input, req.user.id);
      new SuccessResponse({
        message: "create typr report successfully",
        metadata: data,
      }).send(res);
    }
  );

  update = catchAsyncError(
    async (req: Request, res: Response, _next: NextFunction) => {
      const input = <UpdateReportType>req.body;
      const { id } = <ParamsReportType>(<unknown>req.params);
      const data = await ReportTypeService.updateReportType(input, id);
      new SuccessResponse({
        message: "update successfully",
        metadata: data,
      }).send(res);
    }
  );
}

export const typeReportController = new TypeReportController();
