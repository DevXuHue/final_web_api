export interface CloundImage {
  public_id?: string;
  url?: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export * from "./categories-post.dto";
