import mongoose from "mongoose";
import { COLLECTION_MODELS } from "../constansts";
const Schema = mongoose.Schema;

const billSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    note: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: COLLECTION_MODELS.user.document,
    },
    total: {
      type: Number,
      required: true,
    },
    from: {
      type: Date,
      required: true,
    },
    to: {
      type: Date,
      required: true,
    },
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: COLLECTION_MODELS.user.document,
    },
    roomId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: COLLECTION_MODELS.room.document,
    },
    total_days: {
      type: Number,
      required: true,
    },
  },
  { collection: COLLECTION_MODELS.bill.collection, timestamps: true }
);

export const Bill = mongoose.model(COLLECTION_MODELS.bill.document, billSchema);
