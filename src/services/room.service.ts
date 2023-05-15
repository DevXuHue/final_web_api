import { findReportById, findRoom, findRoomByType } from "../repositories";

export class RoomService {
  static async getAll() {
    return await findRoom();
  }

  static async getOneById(id: string) {
    return await findReportById(id);
  }

  static async getRoomByTypeId(id: string) {
    return await findRoomByType(id);
  }
}
