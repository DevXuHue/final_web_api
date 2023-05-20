import { SuccessResponse } from "./../core/success.response";
import { PostService } from "./../services/post.service";
import {
  CreatePostInput,
  ParamsPost,
  UpdatePostInput,
} from "./../interface/post.dto";
import { NextFunction, Request, Response } from "express";
import catchAsyncError from "../middleware/catchAsyncError";

class PostController {
  create = catchAsyncError(
    async (req: Request, res: Response, _next: NextFunction) => {
      const input = <CreatePostInput>req.body;
      const data = await PostService.create(input, req.user.id);
      new SuccessResponse({
        message: "Create post successfully",
        metadata: data,
      }).send(res);
    }
  );

  getAllPost = catchAsyncError(
    async (_req: Request, res: Response, _next: NextFunction) => {
      new SuccessResponse({
        message: "get all post successfully",
        metadata: await PostService.findPosts(),
      }).send(res);
    }
  );

  getPost = catchAsyncError(
    async (req: Request, res: Response, _next: NextFunction) => {
      const { id } = <ParamsPost>(<unknown>req.params);
      const data = await PostService.findOnePost(id);
      new SuccessResponse({
        message: "get one post success",
        metadata: data,
      }).send(res);
    }
  );

  update = catchAsyncError(
    async (req: Request, res: Response, _next: NextFunction) => {
      const input = <UpdatePostInput>req.body;
      const { id } = <ParamsPost>(<unknown>req.params);
      const data = await PostService.update(input, id);
      new SuccessResponse({
        message: "update post success",
        metadata: data,
      }).send(res);
    }
  );

  unPublish = catchAsyncError(
    async (req: Request, res: Response, _next: NextFunction) => {
      const { id } = <ParamsPost>(<unknown>req.params);
      const data = await PostService.unPublishPost(id);
      new SuccessResponse({
        message: "unPublish success",
        metadata: data,
      }).send(res);
    }
  );
  publish = catchAsyncError(
    async (req: Request, res: Response, _next: NextFunction) => {
      const { id } = <ParamsPost>(<unknown>req.params);
      const data = await PostService.publishPost(id);
      new SuccessResponse({
        message: "unPublish success",
        metadata: data,
      }).send(res);
    }
  );

  getPostsAuthorParam = catchAsyncError(
    async (req: Request, res: Response, _next: NextFunction) => {
      const { id } = <ParamsPost>(<unknown>req.params);
      const data = await PostService.getPostByIdUser(id);
      new SuccessResponse({
        message: "get posts by author",
        metadata: data,
      }).send(res);
    }
  );

  getPostsMe = catchAsyncError(
    async (req: Request, res: Response, _next: NextFunction) => {
      const userId = req.user.id;
      const data = await PostService.getPostMe(userId);
      new SuccessResponse({
        message: "get post me successfully",
        metadata: data,
      }).send(res);
    }
  );

  getPostByCategoriesId = catchAsyncError(
    async (req: Request, res: Response, _next: NextFunction) => {
      new SuccessResponse({
        message: "get posts by categories id",
        metadata: await PostService.getPostByCategoryId(req.params.id),
      }).send(res);
    }
  );
}

export const postController = new PostController();
