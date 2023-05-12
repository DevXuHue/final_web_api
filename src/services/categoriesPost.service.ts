import cloundinary from "cloudinary";
import { CreateCategoryPost, UpdateCategoryPost } from "../interface";
import { CategoryPost } from "../models";
import { checkValidator } from "../utils/handle-validator";
import {
  findCategoryPost,
  findCategoryPostAndUpdate,
  findCategoryPostById,
} from "./../repositories/categories-post.repository";
import { findUserById } from "./../repositories/user.repository";

export class CategoriesPostService {
  static async create(body: CreateCategoryPost, userId: string) {
    await checkValidator(CreateCategoryPost, body);
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
      ...body,
      thumbnail: {
        public_id: thumbnailResponseClound.public_id,
        url: thumbnailResponseClound.url,
      },
      userId,
      author_name: user.username,
    });

    return newCategoriesPost;
  }

  static async findCategoryById(idPost: string) {
    return await findCategoryPostById(idPost);
  }

  static async findCategoriesPost() {
    return await findCategoryPost();
  }

  static async publicCategoriesPost() {}

  static async updateCategoriesPost(body: UpdateCategoryPost, id: string) {
    await checkValidator(UpdateCategoryPost, body);
    const { thumbnail } = body;
    const categoriesPost = await findCategoryPostById(id);
    if (thumbnail) {
      await cloundinary.v2.uploader.destroy(
        categoriesPost.thumbnail?.public_id as string
      );

      const thumbnailCloundResponse = await cloundinary.v2.uploader.upload(
        thumbnail,
        {
          folder: "categories-post",
          format: "png",
        }
      );

      return await findCategoryPostAndUpdate(
        {
          ...body,
          thumbnail: {
            public_id: thumbnailCloundResponse.public_id,
            url: thumbnailCloundResponse.url,
          },
        },
        id
      );
    }

    return await findCategoryPostAndUpdate({ ...body }, id);
  }
}
