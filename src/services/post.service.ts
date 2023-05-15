import { v2 as cloundinary } from "cloudinary";
import {
  createPost,
  findAllPost,
  findPostById,
  getAuthorPost,
  updatePost,
  getPostsMe,
} from "./../repositories";
import { findUserById } from "./../repositories/user.repository";
import { checkValidator } from "../utils/handle-validator";
import { CreatePostInput, UpdatePostInput } from "./../interface/post.dto";

export class PostService {
  static async create(body: CreatePostInput, idUser: string) {
    await checkValidator(CreatePostInput, body);
    const user = await findUserById(idUser);

    const thumbnailRes = await cloundinary.uploader.upload(body.thumbnail, {
      folder: "post",
      format: "png",
    });

    const newPost = await createPost({
      ...body,
      user: user.username,
      authorId: user._id,
      thumbnail: {
        public_id: thumbnailRes.public_id,
        url: thumbnailRes.url,
      },
    });

    return newPost;
  }

  static async findPosts() {
    return await findAllPost();
  }

  static async findOnePost(id: string) {
    return await findPostById(id);
  }

  static async update(input: UpdatePostInput, id: string) {
    return await updatePost(input, id);
  }

  static async publishPost(id: string) {
    const post = await findPostById(id);
    post.isPublish = true;
    return await post.save();
  }

  public static async unPublishPost(id: string) {
    const post = await findPostById(id);
    post.isPublish = false;
    return await post.save();
  }

  public static async getPostByIdUser(id: string) {
    const user = await findUserById(id);
    return await getAuthorPost(user._id);
  }

  public static async getPostMe(id: string) {
    return await getPostsMe(id);
  }
}
