import { findUserById } from "./../repositories/user.repository";
import cloundinary from "cloudinary";
import { Request } from "express";
import { checkValidator } from "src/utils/handle-validator";
import { CreateCategoryPost } from "../interface";
import { CategoryPost } from "../models";

export class CategoriesPostService {
  static async create(body: CreateCategoryPost, req: Request) {
    await checkValidator(CreateCategoryPost, body);

    const userId = req.user.id;
    const { thumbnail } = body;
    const thumbnailResponseClound = await cloundinary.v2.uploader.upload(
      thumbnail,
      {
        folder: "categories-post",
        format: "png",
      }
    );

    const user = await findUserById(userId);

    const newCategoriesPost = CategoryPost.create({
      ...req.body,
      thumbnail: {
        public_id: thumbnailResponseClound.public_id,
        url: thumbnailResponseClound.url,
      },
      userId,
      author_name: user.username,
    });

    return newCategoriesPost;
  }
}
