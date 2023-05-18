import { NextFunction, Request, Response } from "express";
import catchAsyncError from "../middleware/catchAsyncError";
import { RoomService } from "../services";
import { SuccessResponse } from "../core";
import { CreateRoomInput, ParamsRoom, UpdateRoomInput } from "../interface";

class RoomController {
  getAll = catchAsyncError(
    async (_req: Request, res: Response, _next: NextFunction) => {
      const data = await RoomService.getAll();
      new SuccessResponse({
        message: "get rooms successfully!",
        metadata: data,
      }).send(res);
    }
  );

  getRoom = catchAsyncError(
    async (req: Request, res: Response, _next: NextFunction) => {
      const { id } = <ParamsRoom>(<unknown>req.params);
      const data = await RoomService.getOneById(id);
      new SuccessResponse({
        message: "get room by id",
        metadata: data,
      }).send(res);
    }
  );

  getRoomByType = catchAsyncError(
    async (req: Request, res: Response, _next: NextFunction) => {
      const { id } = <ParamsRoom>(<unknown>req.params);
      const data = await RoomService.getRoomByTypeId(id);
      new SuccessResponse({
        message: "get room by types",
        metadata: data,
      }).send(res);
    }
  );

  createRoom = catchAsyncError(
    async (req: Request, res: Response, _next: NextFunction) => {
      const body = <CreateRoomInput>req.body;
      const data = await RoomService.newRoom(body);
      new SuccessResponse({
        message: "create room",
        metadata: data,
      }).send(res);
    }
  );

  updateRoom = catchAsyncError(
    async (req: Request, res: Response, _next: NextFunction) => {
      const body = <UpdateRoomInput>req.body;
      const { id } = <ParamsRoom>(<unknown>req.params);
      const data = await RoomService.updateRoom(body, id);
      new SuccessResponse({
        message: "update room successfully",
        metadata: data,
      }).send(res);
    }
  );
}

export const roomController = new RoomController();
