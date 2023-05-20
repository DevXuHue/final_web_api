import { NextFunction, Request, Response } from "express";
import catchAsyncError from "../middleware/catchAsyncError";
import { SuccessResponse } from "../core";
import { CategoriesUtilServive } from "../services";

class CategoriesUtilsController {
  getAll = catchAsyncError(
    async (_req: Request, res: Response, _next: NextFunction) => {
      new SuccessResponse({
        message: "get all categories utils",
        metadata: await CategoriesUtilServive.findAll(),
      }).send(res);
    }
  );
  getOne = catchAsyncError(
    async (req: Request, res: Response, _next: NextFunction) => {
      new SuccessResponse({
        message: "get all categories util",
        metadata: await CategoriesUtilServive.findOne(req.params.id),
      }).send(res);
    }
  );
  getUtilsByCategoris = catchAsyncError(
    async (req: Request, res: Response, _next: NextFunction) => {
      new SuccessResponse({
        message: "get utils by categories",
        metadata: await CategoriesUtilServive.getUtilsByCategories(
          req.params.id
        ),
      }).send(res);
    }
  );
  create = catchAsyncError(
    async (req: Request, res: Response, _next: NextFunction) => {
      new SuccessResponse({
        message: "create successfully",
        metadata: await CategoriesUtilServive.createCategoriesUtil(
          req.body,
          req.user.id
        ),
      }).send(res);
    }
  );
  update = catchAsyncError(
    async (req: Request, res: Response, _next: NextFunction) => {
      new SuccessResponse({
        message: "update categories utils",
        metadata: await CategoriesUtilServive.updateCategoriesUtil(
          req.body,
          req.params.id
        ),
      }).send(res);
    }
  );
}

export const categoriesUtilsController = new CategoriesUtilsController();
