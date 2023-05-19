import { v2 } from "cloudinary";
import { Utils } from "../models";
import { NotFoundRequestError } from "../core";

export class UtilsService {
  static async getAll() {
    return await Utils.find({}).lean();
  }

  static async getOneById(id: string) {
    return await Utils.findById(id).lean();
  }

  static async create(body: any, id: string) {
    const imageRes = await v2.uploader.upload(body.image, {
      folder: "utils",
      format: "png",
    });

    body.image = {
      public_id: imageRes.public_id,
      url: imageRes.url,
    };
    return await Utils.create({
      ...body,
      authorId: id,
    });
  }

  static async update(body: any, id: string) {
    if (body.image) {
      const utils = await Utils.findById(id);
      if (!utils) throw new NotFoundRequestError("not found util");
      await v2.uploader.destroy(utils.images?.public_id as string);
      const imageRes = await v2.uploader.upload(body.image, {
        folder: "utils",
        format: "png",
      });
      body.image = {
        public_id: imageRes.public_id,
        url: imageRes.url,
      };

      return await Utils.findByIdAndUpdate(id, body);
    }

    return await Utils.findByIdAndUpdate(id, body);
  }
}
