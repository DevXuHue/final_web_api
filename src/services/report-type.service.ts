import { CreateReportType, UpdateReportType } from "./../interface";
import { ForbiddenRequestError } from "./../core";
import {
  createReportType as CreateReportTypeFunc,
  findAllReportType,
  findReportTypeById,
  findUserById,
  updateReportType as updateReportTypeFunc,
} from "./../repositories";
import { checkValidator } from "../utils/handle-validator";
import mongoose from "mongoose";

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
    const user = await findUserById(idUser);
    if (!Array.isArray(user.role) || !user.role.includes("admin"))
      throw new ForbiddenRequestError("permission denined...");

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
