import { Request, Response, NextFunction } from "express";
import catchAsyncError from "../middleware/catchAsyncError";
import { BillService } from "../services/bill.service";
import { ForbiddenRequestError, SuccessResponse } from "../core";
import { ParamsBill } from "../interface";
import { findUserById } from "../repositories";

class BillController {
  getBills = catchAsyncError(
    async (_req: Request, res: Response, _next: NextFunction) => {
      const data = await BillService.getAllBills();
      new SuccessResponse({
        message: "get all bills",
        metadata: data,
      }).send(res);
    }
  );

  getOne = catchAsyncError(
    async (req: Request, res: Response, _next: NextFunction) => {
      const { id } = <ParamsBill>(<unknown>req.params);
      const data = await BillService.findBillOne(id);
      new SuccessResponse({
        message: "get one bills",
        metadata: data,
      }).send(res);
    }
  );

  getBillsUserId = catchAsyncError(
    async (req: Request, res: Response, _next: NextFunction) => {
      const { id } = <ParamsBill>req.user;
      const data = await BillService.getAllBillByUserId(id);
      new SuccessResponse({
        message: "get allbill user",
        metadata: data,
      }).send(res);
    }
  );

  getBillsParams = catchAsyncError(
    async (req: Request, res: Response, _next: NextFunction) => {
      const { id } = <ParamsBill>(<unknown>req.params);
      const bill = await BillService.findBillOne(id);
      const user = await findUserById(req.user.id);
      if (!user.role.toString().includes("admin") || bill?.userId !== user.id)
        throw new ForbiddenRequestError();
      new SuccessResponse({
        message: "get bills success",
        metadata: bill,
      }).send(res);
    }
  );

  getBillsRoonId = catchAsyncError(
    async (req: Request, res: Response, _next: NextFunction) => {
      const { id } = <ParamsBill>(<unknown>req.params);
      const data = await BillService.getAllBillByRoomId(id);
      new SuccessResponse({
        message: "get bill room id",
        metadata: data,
      }).send(res);
    }
  );
}

export const billController = new BillController();
