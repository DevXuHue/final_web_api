import { NotFoundRequestError, ServerInternalError } from "../core";
import { RoomType } from "../models";

export const findRoomType = async () => {
  return await RoomType.find({});
};

export const findRooomTypeById = async (id: string) => {
  const roomType = await RoomType.findById(id);
  if (roomType) return roomType;
  throw new NotFoundRequestError("Not found room type");
};

export const createRoomType = async (input: any) => {
  const newRoomType = await RoomType.create(input);
  if (newRoomType) return newRoomType;
  throw new ServerInternalError("Error to create room type");
};

export const findRoomTypeByIdAndUpdate = async (input: any, id: string) => {
  const updateRoomType = await RoomType.findByIdAndUpdate(id, input);
  if (updateRoomType) return updateRoomType;
  throw new ServerInternalError("Error to update room type");
};

export const findRoomTypesLean = async () => {
  return await RoomType.find({}).lean();
};
