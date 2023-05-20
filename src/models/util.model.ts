import mongoose from "mongoose";
import { COLLECTION_MODELS } from "../constansts";
const Scheme = mongoose.Schema;

const utilsChema = new Scheme(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    images: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    body: {
      type: String,
      required: true,
    },
    authorId: {
      type: mongoose.Types.ObjectId,
      ref: COLLECTION_MODELS.user.document,
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_MODELS.utils.collection,
  }
);

export const Utils = mongoose.model(
  COLLECTION_MODELS.utils.document,
  utilsChema
);
