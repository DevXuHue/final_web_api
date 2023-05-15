import { checkValidator } from "../utils/handle-validator";
import { CreateRoomType, UpdateRoomType } from "../interface";
import {
  createRoomType,
  findRoomType,
  findRooomTypeById,
  updateReportType,
} from "./../repositories";
import { v2 } from "cloudinary";

export class RoomTypeService {
  static async findAll() {
    return await findRoomType();
  }
  static async findOneById(id: string) {
    return await findRooomTypeById(id);
  }
  static async create(input: CreateRoomType, authorId: string) {
    await checkValidator(CreateRoomType, input);
    const { thumbnail } = input;
    const thumbnailResponseClound = await v2.uploader.upload(thumbnail, {
      folder: "room-type",
      format: "png",
    });
    const body = {
      ...input,
      thumbnail: {
        public_id: thumbnailResponseClound.public_id,
        url: thumbnailResponseClound.url,
      },
      authorId,
    };
    return await createRoomType(body);
  }
  static async update(input: UpdateRoomType, id: string) {
    await checkValidator(UpdateRoomType, input);
    const { thumbnail } = input;
    if (thumbnail) {
      const updateRoomType = await findRooomTypeById(id);
      await v2.uploader.destroy(updateRoomType.thumbnail?.public_id as string);
      const thumbnailResponseClound = await v2.uploader.upload(thumbnail, {
        folder: "room-type",
        format: "png",
      });
      const body = {
        ...input,
        thumbnail: {
          public_id: thumbnailResponseClound.public_id,
          url: thumbnailResponseClound.url,
        },
      };
      return await updateReportType(body, id);
    }

    return await updateReportType(input, id);
  }
}
