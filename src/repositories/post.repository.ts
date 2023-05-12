import {
  ErrorResponse,
  NotFoundRequestError,
  ServerInternalError,
} from "./../core/error.response";
import { StatusCodes } from "./../enums/status-code";
import { Post } from "./../models";

export const createPost = async (input: any) => {
  const post = await Post.create(input);
  if (post) return post;
  throw new ErrorResponse(
    "error create post",
    StatusCodes.INTERNAL_SERVER_ERROR
  );
};

export const findAllPost = async () => {
  return await Post.find({ isPublish: true }).lean();
};

export const findPostPushlish = async (id: string) => {
  const post = await Post.findById(id);
  if (!post || !post.isPublish) {
    throw new NotFoundRequestError("Post not found");
  }

  return post;
};

export const findPostById = async (id: string) => {
  const post = await Post.findById(id);
  if (post) return post;
  throw new NotFoundRequestError("Post not found");
};

export const updatePost = async (newInput: any, id: string) => {
  const post = await Post.findByIdAndUpdate(id, newInput);
  if (!post) {
    throw new ServerInternalError();
  }
  return await post?.save();
};
