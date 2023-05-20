import { v2 } from "cloudinary";
import {
  BadRequestError,
  NotFoundRequestError,
  ServerInternalError,
} from "../core";
import { CategoriesUtil, Utils } from "../models";
import mongoose from "mongoose";

export class CategoriesUtilServive {
  static async findAll() {
    return await CategoriesUtil.find({});
  }

  static async findOne(id: string) {
    const categoriesUtil = await CategoriesUtil.findById(id);
    if (categoriesUtil) return categoriesUtil;
    throw new NotFoundRequestError("not found categories utils");
  }

  static async getUtilsByCategories(id: string) {
    return await Utils.find({
      categoriesId: new mongoose.Types.ObjectId(id),
    });
  }

  static async createCategoriesUtil(body: any, authorId: string) {
    const { thumbnail } = body;
    if (!thumbnail) throw new BadRequestError("thumbnail is required");
    const thumbnailRes = await v2.uploader.upload(thumbnail, {
      folder: "thumbnail-categories-utils",
      format: "png",
    });

    body.thumbnail = {
      public_id: thumbnailRes.public_id,
      url: thumbnailRes.url,
    };

    const categoriesUtil = await CategoriesUtil.create({
      ...body,
      authorId,
    });

    if (!categoriesUtil)
      throw new ServerInternalError("create categories util error");

    return categoriesUtil;
  }

  static async updateCategoriesUtil(body: any, id: string) {
    const { thumbnail } = body;
    if (thumbnail) {
      const updateCateUtil = await CategoriesUtil.findById(id);
      if (!updateCateUtil) throw new NotFoundRequestError("not found error");
      await v2.uploader.destroy(updateCateUtil.thumbnail?.public_id as string);
      const thumbnailRes = await v2.uploader.upload(thumbnail, {
        folder: "thumbnail-categories-utils",
        format: "png",
      });

      body.thumbnail = {
        public_id: thumbnailRes.public_id,
        url: thumbnailRes.url,
      };

      const categoriesUtil = await CategoriesUtil.findByIdAndUpdate(id, {
        ...body,
      });

      if (!categoriesUtil)
        throw new ServerInternalError("create categories util error");

      return categoriesUtil;
    }

    delete body.thumbnail;
    const categoriesUtil = await CategoriesUtil.findByIdAndUpdate(id, {
      ...body,
    });

    if (!categoriesUtil)
      throw new ServerInternalError("create categories util error");

    return categoriesUtil;
  }
}
