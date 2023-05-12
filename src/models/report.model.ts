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
  },
  { timestamps: true, collection: COLLECTION_MODELS.report.collection }
);

export const Report = mongoose.model(
  COLLECTION_MODELS.report.document,
  reportSchema
);
