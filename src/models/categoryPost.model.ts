import { COLLECTION_MODELS } from "./../constansts/index";
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const categoryPostSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    shortDescription: {
      type: String,
      required: true,
      maxLength: 30,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: COLLECTION_MODELS.user.document,
    },
    author_name: {
      type: String,
    },
    thumbnail: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
    isPublish: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, collection: COLLECTION_MODELS.categoryPost.collection }
);

export const CategoryPost = mongoose.model(
  COLLECTION_MODELS.categoryPost.document,
  categoryPostSchema
);
