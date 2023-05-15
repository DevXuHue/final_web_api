import { NotFoundRequestError, ServerInternalError } from "./../core";
import { TypeReport } from "./../models";

export const findAllReportType = async () => {
  return await TypeReport.find({});
};

export const findReportTypeById = async (id: string) => {
  const typeReport = await TypeReport.findById(id);
  if (typeReport) return typeReport;
  throw new NotFoundRequestError("type report not found....");
};

export const createReportType = async (input: any) => {
  const newTypeReport = await TypeReport.create(input);
  if (newTypeReport) return newTypeReport;
  throw new ServerInternalError("error to create new type report");
};

export const updateReportType = async (newInput: any | unknown, id: string) => {
  const updateReportType = await TypeReport.findByIdAndUpdate(id, newInput, {
    new: true,
    runValidators: true,
  });

  if (!updateReportType)
    throw new ServerInternalError("Error to update type report");

  return await updateReportType?.save();
};
