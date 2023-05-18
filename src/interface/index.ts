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
export * from "./post.dto";
export * from "./type-report.dto";
export * from "./report.dto";
export * from "./room-type.dto";
export * from "./room.dto";
export * from "./bill.dto";
