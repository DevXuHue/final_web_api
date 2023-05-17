import { SuccessResponse } from "./../core/success.response";
import { CategoriesPostService } from "./../services/categoriesPost.service";
import {
  CreateCategoryPost,
  ParamsIdCategoriesPost,
  UpdateCategoryPost,
} from "./../interface/categories-post.dto";
import { NextFunction, Request, Response } from "express";
import catchAsyncError from "../middleware/catchAsyncError";

class CategoriesPostController {
  create = catchAsyncError(
    async (req: Request, res: Response, _next: NextFunction) => {
      const input = <CreateCategoryPost>req.body;
      const userId = req.user.id;
      const data = await CategoriesPostService.create(input, userId);
      new SuccessResponse({
        message: "create categories post successfully",
        metadata: data,
      }).send(res);
    }
  );
  findCategoriesPostById = catchAsyncError(
    async (req: Request, res: Response, _next: NextFunction) => {
      const { id } = <ParamsIdCategoriesPost>(<unknown>req.params);
      const data = await CategoriesPostService.findCategoryById(id);
      new SuccessResponse({
        message: "Find categories post by id successfully",
        metadata: data,
      }).send(res);
    }
  );

  findCategories = catchAsyncError(
    async (_req: Request, res: Response, _next: NextFunction) => {
      new SuccessResponse({
        message: "Find categories post  successfully",
        metadata: await CategoriesPostService.findCategoriesPost(),
      }).send(res);
    }
  );

  update = catchAsyncError(
    async (req: Request, res: Response, _next: NextFunction) => {
      const input = <UpdateCategoryPost>req.body;
      const data = await CategoriesPostService.updateCategoriesPost(
        input,
        req.params.id
      );

      new SuccessResponse({
        message: "update categories successfully",
        metadata: data,
      }).send(res);
    }
  );
}

export const categoriesPostController = new CategoriesPostController();
