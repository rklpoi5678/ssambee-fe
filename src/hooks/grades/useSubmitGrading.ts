import { useMutation, useQueryClient } from "@tanstack/react-query";

import { examKeys } from "@/constants/query-keys";
import { submitGradingAPI } from "@/services/exams/grades.service";
import type { ExamGradeApi, SubmitGradingPayload } from "@/types/grades";

type SubmitGradingParams = {
  examId: string;
  payload: SubmitGradingPayload;
};

type UseSubmitGradingOptions = {
  onSuccess?: (variables: SubmitGradingParams) => void;
  onError?: (error: Error) => void;
};

export const useSubmitGrading = (options?: UseSubmitGradingOptions) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ examId, payload }: SubmitGradingParams) =>
      submitGradingAPI(examId, payload),
    onSuccess: (_result, variables) => {
      const examId = variables.examId;
      const enrollmentId = variables.payload.lectureEnrollmentId;
      const cachedGrades = queryClient.getQueryData<ExamGradeApi[]>(
        examKeys.grades(examId)
      );
      const matchedGradeId = cachedGrades?.find(
        (grade) => grade.lectureEnrollmentId === enrollmentId
      )?.id;

      queryClient.invalidateQueries({ queryKey: examKeys.detail(examId) });
      queryClient.invalidateQueries({ queryKey: examKeys.grades(examId) });
      if (matchedGradeId) {
        queryClient.invalidateQueries({
          queryKey: examKeys.gradeDetail(matchedGradeId),
        });
      }

      options?.onSuccess?.(variables);
    },
    onError: (error) => {
      const normalizedError =
        error instanceof Error ? error : new Error(String(error));
      console.error("채점 저장 실패:", normalizedError.message);
      options?.onError?.(normalizedError);
    },
  });
};
