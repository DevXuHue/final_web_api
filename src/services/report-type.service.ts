import mongoose from "mongoose";
import { checkValidator } from "../utils/handle-validator";
import { CreateReportType, UpdateReportType } from "./../interface";
import {
  createReportType as CreateReportTypeFunc,
  findAllReportType,
  findReportTypeById,
  updateReportType as updateReportTypeFunc,
} from "./../repositories";

export class ReportTypeService {
  public static getAllReportTypes = async () => {
    return await findAllReportType();
  };

  public static getReportTypeById = async (id: string) => {
    return await findReportTypeById(id);
  };

  public static createReportType = async (
    body: CreateReportType,
    idUser: string
  ) => {
    await checkValidator(CreateReportType, body);
    return await CreateReportTypeFunc({
      ...body,
      userId: new mongoose.Types.ObjectId(idUser),
    });
  };

  public static updateReportType = async (
    body: UpdateReportType,
    id: string
  ) => {
    await checkValidator(UpdateReportType, body);
    return await updateReportTypeFunc(body, id);
  };
}
