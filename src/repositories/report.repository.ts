import {
  NotFoundRequestError,
  ServerInternalError,
} from "./../core/error.response";
import { Report } from "../models";

export const findAllReport = async () => {
  return await Report.find({});
};

export const findReportById = async (id: string) => {
  const report = await Report.findById(id);
  if (report) return report;
  throw new NotFoundRequestError("Not found report");
};

export const createReport = async (body: any) => {
  const newReport = await Report.create(body);
  if (newReport) return newReport;
  throw new ServerInternalError("Error to create report");
};

export const findReportByIdAndUpdate = async (body: any, id: string) => {
  const updatePost = await Report.findByIdAndUpdate(id, body);
  if (updatePost) return updatePost;
  throw new ServerInternalError("Update error report");
};

export const findReportMe = async (id: string) => {
  return await Report.find({ userId: id });
};
