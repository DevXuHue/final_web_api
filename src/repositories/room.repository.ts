import mongoose from "mongoose";
import { NotFoundRequestError, ServerInternalError } from "../core";
import { Room } from "../models";

export const findRoom = async () => {
  return await Room.find({});
};

export const findRoomById = async (id: string) => {
  const room = await Room.findById(id);
  if (room) return room;
  throw new NotFoundRequestError("room not found");
};

export const createRoom = async (input: any) => {
  const room = await Room.create(input);
  if (room) return room;
  throw new ServerInternalError("Error to create room");
};

export const findRoomIdAndUpdate = async (input: any, id: string) => {
  const updateRoom = await Room.findByIdAndUpdate(id, input);
  if (updateRoom) return updateRoom;
  throw new ServerInternalError("Error to update room");
};

export const findRoomByType = async (id: string) => {
  return await Room.find({ type: new mongoose.Types.ObjectId(id) });
};
