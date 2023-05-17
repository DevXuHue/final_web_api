import { ForbiddenRequestError } from "../core";
import { CreateReport } from "../interface";
import {
  createReport,
  findAllReport,
  findReportById,
  findReportMe,
  findUserById,
} from "../repositories";

export class ReportService {
  public static getAll = async () => {
    return await findAllReport();
  };

  public static getById = async (id: string, idUser: string) => {
    const user = await findUserById(idUser);
    const report = await findReportById(id);
    if (user.role.toString().includes("admin")) return report;
    if (report.userId !== user.id)
      throw new ForbiddenRequestError("permisson denined");
    return report;
  };

  public static craeteReport = async (body: CreateReport, userId: string) => {
    return await createReport({
      ...body,
      userId,
    });
  };

  public static getReportByMe = async (id: string) => {
    return await findReportMe(id);
  };
}
