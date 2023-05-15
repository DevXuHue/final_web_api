import { COLLECTION_MODELS } from "./../constansts/index";
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const reportSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    level: {
      type: Number,
      default: 1,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: COLLECTION_MODELS.user.document,
    },
    roomId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: COLLECTION_MODELS.room.document,
    },
    emailConnect: {
      type: String,
      required: true,
    },
    phoneConnect: {
      type: String,
      required: true,
    },
    isCheck: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true, collection: COLLECTION_MODELS.report.collection }
);

export const Report = mongoose.model(
  COLLECTION_MODELS.report.document,
  reportSchema
);
