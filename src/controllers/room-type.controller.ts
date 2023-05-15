import { RoomTypeService } from "./../services";
import { NextFunction, Request, Response } from "express";
import catchAsyncError from "../middleware/catchAsyncError";
import { SuccessResponse } from "../core";
import { CreateRoomType, ParamsRoomType, UpdateRoomType } from "../interface";

class RoomTypeController {
  findAllRoomType = catchAsyncError(
    async (_req: Request, res: Response, _next: NextFunction) => {
      const data = await RoomTypeService.findAll();
      new SuccessResponse({
        message: "find all room type successfully",
        metadata: data,
      }).send(res);
    }
  );

  findOneById = catchAsyncError(
    async (req: Request, res: Response, _next: NextFunction) => {
      const { id } = <ParamsRoomType>(<unknown>req.params);
      const data = await RoomTypeService.findOneById(id);
      new SuccessResponse({
        message: "find room type successfully",
        metadata: data,
      }).send(res);
    }
  );

  create = catchAsyncError(
    async (req: Request, res: Response, _next: NextFunction) => {
      const input = <CreateRoomType>req.body;
      const { id } = req.user;
      const data = await RoomTypeService.create(input, id);
      new SuccessResponse({
        message: "create room type successfully",
        metadata: data,
      }).send(res);
    }
  );

  update = catchAsyncError(
    async (req: Request, res: Response, _next: NextFunction) => {
      const input = <UpdateRoomType>req.body;
      const data = await RoomTypeService.update(input, req.user.id);
      new SuccessResponse({
        message: "update room type successfully",
        metadata: data,
      }).send(res);
    }
  );
}

export const roomTypeController = new RoomTypeController();
