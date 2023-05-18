import { ServerInternalError } from "../core";
import { Bill } from "../models";

export const findBill = async () => {
  return await Bill.find({});
};

export const findBillLean = async () => {
  return await Bill.find({}).lean();
};

export const findBillById = async (id: string) => {
  return await Bill.findById(id);
};

export const findBillByIdLean = async (id: string) => {
  return await Bill.findById(id).lean();
};

export const findBillByIdAndUpdate = async (data: any, id: string) => {
  const updateBill = await Bill.findByIdAndUpdate(id, data);
  if (updateBill) return updateBill;
  throw new ServerInternalError("Update bill error");
};

export const findBillByIdUser = async (id: string) => {
  return await Bill.find({ userId: id }).lean();
};

export const findBillByRoomId = async (id: string) => {
  return await Bill.find({ roomId: id }).lean();
};
