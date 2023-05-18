import {
  findAllCustomerLean,
  findRoomLean,
  findRoomTypesLean,
  findCategoriesLean,
  findPostLean,
  findReportTypeLean,
} from "../repositories";

export class CommonService {
  static dataIndex = async () => {
    const customers = await findAllCustomerLean();
    const countCustomer = customers.length;

    const roomTypes = await findRoomTypesLean();
    const countRoomTypes = roomTypes.length;

    const rooms = await findRoomLean();
    const countRooms = rooms.length;

    const categoriesPost = await findCategoriesLean();
    const countCategoriesPost = categoriesPost.length;

    const posts = await findPostLean();
    const countPosts = posts.length;

    const reportTypes = await findReportTypeLean();
    const countReportTypes = reportTypes.length;

    return {
      customers,
      countCustomer,
      roomTypes,
      countRoomTypes,
      rooms,
      countRooms,
      countCategoriesPost,
      countPosts,
      posts,
      categoriesPost,
      reportTypes,
      countReportTypes,
    };
  };
}
