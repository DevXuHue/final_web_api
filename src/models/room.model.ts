import { COLLECTION_MODELS } from "./../constansts";
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const roomSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    short_description: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: COLLECTION_MODELS.user.document,
    },
    price: {
      type: Number,
      default: 100,
    },
    isBooked: {
      type: Boolean,
      default: false,
    },
    from: {
      type: Date,
    },
    to: {
      type: Date,
    },
    user_booking: {
      type: mongoose.Schema.Types.ObjectId,
      ref: COLLECTION_MODELS.user.document,
    },
    type: {
      type: mongoose.Schema.Types.ObjectId,
      ref: COLLECTION_MODELS.room_type.document,
    },
    info: {
      address: {
        type: String,
        required: true,
      },
      phoneConnect: {
        type: String,
        required: true,
      },
      acreage: {
        type: String,
        required: true,
      },
      utilities: {
        type: Boolean,
        required: true,
      },
    },
  },
  { timestamps: true, collection: COLLECTION_MODELS.room.collection }
);

export const Room = mongoose.model(COLLECTION_MODELS.room.document, roomSchema);
