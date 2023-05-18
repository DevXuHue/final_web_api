import {
  findBillByIdAndUpdate,
  findBillByIdLean,
  findBillByIdUser,
  findBillByRoomId,
  findBillLean,
  findUserById,
} from "../repositories";

export class BillService {
  static async getAllBills() {
    return await findBillLean();
  }
  static async findBillOne(id: string) {
    return findBillByIdLean(id);
  }

  static async update(data: any, id: string) {
    const userId = await findUserById(id);
    return await findBillByIdAndUpdate(data, userId.id);
  }

  static async getAllBillByUserId(id: string) {
    return await findBillByIdUser(id);
  }

  static async getAllBillByRoomId(id: string) {
    return await findBillByRoomId(id);
  }
}
