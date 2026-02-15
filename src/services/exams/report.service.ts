import { axiosClient } from "@/services/axiosClient";
import type { ApiResponse } from "@/types/api";
import type { ExamGradeReportApi } from "@/types/grades";
import {
  parseScopedDescriptionFromRaw,
  resolveCommonMessageFromLegacy,
} from "@/services/exams/report-description.mapper";

export type ExamCommonPayload = {
  template?: "premium" | "simple";
  message: string;
};

export type StudentReportPayload = {
  template?: "premium" | "simple";
  reviewTest: string;
  homeworkWord: string;
  homeworkTask: string;
  homeworkExtra: string;
  weaknessType: string;
  attendanceRate: string;
};

export type StudentStructuredReportPayload = {
  template?: "premium" | "simple";
  personalMessage: string;
  reviewTest: string;
  homeworkWord: string;
  homeworkTask: string;
  homeworkExtra: string;
  attendanceRate: string;
};

export type ExamCommonSaveResult = {
  updatedCount: number;
  totalCount: number;
  failedGradeIds: string[];
};

type ExamCommonReportResponse = {
  message?: string | null;
};

export type StudentReportResponse = {
  reviewTest?: string | null;
  homeworkWord?: string | null;
  homeworkTask?: string | null;
  homeworkExtra?: string | null;
  weaknessType?: string | null;
  attendanceRate?: string | null;
};

type ExamGradeIdItem = {
  id: string;
};

type ExamDescriptionResponse = {
  description?: string | null;
};

const getGradeReportDescription = async (
  gradeId: string
): Promise<string | null | undefined> => {
  const { data } = await axiosClient.get<ApiResponse<ExamGradeReportApi>>(
    `/grades/${gradeId}/report`
  );

  return data?.data?.gradeReport?.description;
};

const getExamDescription = async (
  examId: string
): Promise<{ hasDescriptionField: boolean; description: string | null }> => {
  const { data } = await axiosClient.get<ApiResponse<ExamDescriptionResponse>>(
    `/exams/${examId}`
  );

  const exam = data?.data;
  const hasDescriptionField =
    !!exam && Object.prototype.hasOwnProperty.call(exam, "description");

  return {
    hasDescriptionField,
    description: exam?.description ?? null,
  };
};

const loadExamGradeIds = async (examId: string): Promise<string[]> => {
  const { data } = await axiosClient.get<ApiResponse<ExamGradeIdItem[]>>(
    `/exams/${examId}/grades`
  );
  return (data?.data ?? []).map((grade) => grade.id).filter(Boolean);
};

export const getExamCommonReport = async (
  examId: string
): Promise<ExamCommonReportResponse> => {
  try {
    const { hasDescriptionField, description } =
      await getExamDescription(examId);

    if (hasDescriptionField && description !== null) {
      return { message: description };
    }

    const gradeIds = await loadExamGradeIds(examId);

    if (gradeIds.length === 0) {
      return { message: "" };
    }

    const rawDescription = await getGradeReportDescription(gradeIds[0]);
    return {
      message: resolveCommonMessageFromLegacy(rawDescription),
    };
  } catch (error) {
    console.warn("[report][common-load] failed", { examId, error });
    return { message: "" };
  }
};

export const getStudentReport = async (
  gradeId: string
): Promise<StudentReportResponse> => {
  try {
    if (!gradeId) {
      return {};
    }

    const rawDescription = await getGradeReportDescription(gradeId);
    const parsedDescription = parseScopedDescriptionFromRaw(rawDescription);

    return {
      reviewTest: "",
      homeworkWord: "",
      homeworkTask: "",
      homeworkExtra: "",
      weaknessType: parsedDescription.personalMessage,
      attendanceRate: "",
    };
  } catch (error) {
    console.warn("[report][student-load] failed", {
      gradeId,
      error,
    });
    return {};
  }
};

export const saveExamCommonReport = async (
  examId: string,
  payload: ExamCommonPayload
): Promise<ExamCommonSaveResult> => {
  console.info("[report][common-save] request", {
    examId,
    payload,
  });

  await axiosClient.patch<ApiResponse<unknown>>(`/exams/${examId}`, {
    description: payload.message,
  });

  return {
    updatedCount: 1,
    totalCount: 1,
    failedGradeIds: [],
  };
};

export const saveStudentReport = async (
  gradeId: string,
  payload: StudentReportPayload
) => {
  const descriptionPayload = {
    description: payload.weaknessType,
  };

  console.info("[report][student-save] request", {
    gradeId,
    payload,
    mappedPayload: descriptionPayload,
    skippedFields: {
      reviewTest: payload.reviewTest,
      homeworkWord: payload.homeworkWord,
      homeworkTask: payload.homeworkTask,
      homeworkExtra: payload.homeworkExtra,
      attendanceRate: payload.attendanceRate,
    },
  });

  const { data } = await axiosClient.post<ApiResponse<unknown>>(
    `/grades/${gradeId}/report/description`,
    descriptionPayload
  );

  return data?.data;
};

const toStructuredStudentReportPayload = (
  payload: StudentReportPayload
): StudentStructuredReportPayload => {
  return {
    template: payload.template,
    personalMessage: payload.weaknessType,
    reviewTest: payload.reviewTest,
    homeworkWord: payload.homeworkWord,
    homeworkTask: payload.homeworkTask,
    homeworkExtra: payload.homeworkExtra,
    attendanceRate: payload.attendanceRate,
  };
};

export const saveStudentStructuredReport = async (
  gradeId: string,
  payload: StudentReportPayload
) => {
  const structuredPayload = toStructuredStudentReportPayload(payload);

  console.info("[report][student-structured-save] request", {
    gradeId,
    payload,
    mappedPayload: structuredPayload,
  });

  const { data } = await axiosClient.post<ApiResponse<unknown>>(
    `/grades/${gradeId}/report`,
    structuredPayload
  );

  return data?.data;
};

export const uploadGradeReportFile = async (
  gradeId: string,
  file: File
): Promise<{ reportUrl: string }> => {
  const formData = new FormData();
  formData.append("file", file);

  const { data } = await axiosClient.post<ApiResponse<{ reportUrl: string }>>(
    `/grades/${gradeId}/report/file-upload`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return data.data;
};

export const getGradeReportFileDownloadUrl = async (
  gradeId: string
): Promise<{ downloadUrl: string }> => {
  const { data } = await axiosClient.get<ApiResponse<{ downloadUrl: string }>>(
    `/grades/${gradeId}/report/file-download`
  );

  return data.data;
};
