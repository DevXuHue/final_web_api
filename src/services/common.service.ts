import {
  findAllCustomerLean,
  findRoomLean,
  findRoomTypesLean,
} from "../repositories";

export class CommonService {
  static dataIndex = async () => {
    const customers = await findAllCustomerLean();
    const countCustomer = customers.length;

    const roomTypes = await findRoomTypesLean();
    const countRoomTypes = roomTypes.length;

    const rooms = await findRoomLean();
    const countRooms = rooms.length;

    return {
      customers,
      countCustomer,
      roomTypes,
      countRoomTypes,
      rooms,
      countRooms,
    };
  };
}
