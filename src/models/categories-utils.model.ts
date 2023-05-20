import { COLLECTION_MODELS } from "./../constansts/index";
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const categoriesUtils = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: COLLECTION_MODELS.user.document,
    },
    thumbnail: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_MODELS.categories_utils.collection,
  }
);

export const CategoriesUtil = mongoose.model(
  COLLECTION_MODELS.categories_utils.document,
  categoriesUtils
);
