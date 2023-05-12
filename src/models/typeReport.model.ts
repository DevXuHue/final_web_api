import { COLLECTION_MODELS } from "./../constansts/index";
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const typeReportSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: COLLECTION_MODELS.user.document,
    },
    level: {
      type: Number,
      default: 1,
    },
  },
  { timestamps: true, collection: COLLECTION_MODELS.type_report.collection }
);

export const TypeReport = mongoose.model(
  COLLECTION_MODELS.categoryPost.document,
  typeReportSchema
);
