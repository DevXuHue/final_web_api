import { v2 } from "cloudinary";
import { CreateRoomInput, UpdateRoomInput } from "../interface";
import {
  createRoom,
  findRoom,
  findRoomById,
  findRoomByType,
  findRoomIdAndUpdate,
} from "../repositories";
import { Room } from "../models";
import mongoose from "mongoose";

export class RoomService {
  static async getAll() {
    return await findRoom();
  }

  static async getOneById(id: string) {
    return await findRoomById(id);
  }

  static async getRoomByTypeId(id: string) {
    return await findRoomByType(id);
  }

  static async newRoom(input: CreateRoomInput) {
    const {
      acreage,
      address,
      body,
      description,
      from,
      phoneConnect,
      short_description,
      title,
      to,
      type,
      utilities,
      user_booking,
      images,
    } = input;
    const resImage = await v2.uploader.upload(images, {
      folder: "room",
      format: "png",
    });

    const bodyInput = {
      info: {
        acreage,
        address,
        phoneConnect,
        utilities,
      },
      body,
      description,
      short_description,
      title,
      to,
      from,
      type,
      user_booking,
      image: {
        public_id: resImage.public_id,
        url: resImage.url,
      },
    };

    return await createRoom(bodyInput);
  }

  static async updateRoom(input: UpdateRoomInput, id: string) {
    const {
      acreage,
      address,
      body,
      description,
      form,
      phoneConnect,
      short_description,
      title,
      to,
      type,
      utilities,
      user_booking,
      images,
    } = input;
    console.log("id", id);

    if (images) {
      const room = await findRoomById(id);
      await v2.uploader.destroy(room.image?.public_id as string);
      const resImage = await v2.uploader.upload(images, {
        folder: "room",
        format: "png",
      });
      const bodyInput = {
        info: {
          acreage,
          address,
          phoneConnect,
          utilities,
        },
        body,
        description,
        short_description,
        title,
        to,
        image: {
          public_id: resImage.public_id,
          url: resImage.url,
        },
      };
      return await findRoomIdAndUpdate(bodyInput, id);
    }
    const bodyInput = {
      info: {
        acreage,
        address,
        phoneConnect,
        utilities,
      },
      body,
      description,
      short_description,
      title,
      to,
      form,
      type,
      user_booking,
    };

    return await findRoomIdAndUpdate(bodyInput, id);
  }

  static getRoomByUserId = async (id: string) => {
    console.log(id);
    return await Room.find({
      user_booking: new mongoose.Types.ObjectId(id),
    }).lean();
  };
}
