import { COLLECTION_MODELS } from "./../constansts/index";
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const roomSchema = new Schema(
  {},
  { timestamps: true, collection: COLLECTION_MODELS.room.collection }
);

export const room = mongoose.model(COLLECTION_MODELS.room.document, roomSchema);
