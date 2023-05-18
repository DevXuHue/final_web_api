import { StatusCodes } from "./../enums/status-code";
import { ErrorResponse, NotFoundRequestError } from "./../core/error.response";
import { CategoryPost } from "../models";

export const findCategoryPostById = async (id: string) => {
  const categoriesPost = await CategoryPost.findById(id);
  if (categoriesPost) return categoriesPost;
  throw new NotFoundRequestError("not found categories post by id");
};

export const findCategoryPost = async () => {
  return await CategoryPost.find({ isPublish: false });
};

export const findCategoryPostAndUpdate = async (data: any, id: string) => {
  const categoriesPost = await CategoryPost.findByIdAndUpdate(id, data);
  if (!categoriesPost)
    throw new ErrorResponse(
      "error to update",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  return await categoriesPost.save();
};

export const findCategoriesLean = async () => {
  return await CategoryPost.find({}).lean();
};
