import mongoose from "mongoose";
import { COLLECTION_MODELS } from "../constansts";
const schema = mongoose.Schema;

const postSchema = new schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
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
    user: {
      name: String,
      url: String,
    },
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: COLLECTION_MODELS.user.document,
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
    isPublish: {
      type: Boolean,
      default: true,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: COLLECTION_MODELS.categoryPost.document,
    },
  },
  { timestamps: true, collection: COLLECTION_MODELS.post.collection }
);

export const Post = mongoose.model(COLLECTION_MODELS.post.document, postSchema);
