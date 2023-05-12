import { COLLECTION_MODELS } from "./../constansts/index";
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const roomTypeSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    short_description: {
      type: String,
      required: true,
    },
    thumbnail: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  },
  { timestamps: true, collection: COLLECTION_MODELS.room_type.collection }
);

export const RoomType = mongoose.model(
  COLLECTION_MODELS.room_type.document,
  roomTypeSchema
);
