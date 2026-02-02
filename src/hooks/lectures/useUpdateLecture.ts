import { useMutation, useQueryClient } from "@tanstack/react-query";

import { lectureKeys } from "@/constants/query-keys";
import {
  LectureUpdatePayload,
  updateLectureAPI,
} from "@/services/lectures.service";

type UpdateLectureParams = {
  lectureId: string;
  payload: LectureUpdatePayload;
};

type UseUpdateLectureOptions = {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
};

export const useUpdateLecture = (options?: UseUpdateLectureOptions) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ lectureId, payload }: UpdateLectureParams) =>
      updateLectureAPI(lectureId, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: lectureKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: lectureKeys.detail(variables.lectureId),
      });
      queryClient.invalidateQueries({ queryKey: lectureKeys.todays() });
      queryClient.invalidateQueries({ queryKey: lectureKeys.all });
      options?.onSuccess?.();
    },
    onError: (error) => {
      const message = error instanceof Error ? error.message : "Unknown error";
      console.error("강의 수정 실패:", message);
      options?.onError?.(error as Error);
    },
  });
};
