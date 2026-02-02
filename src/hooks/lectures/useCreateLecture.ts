import { useMutation, useQueryClient } from "@tanstack/react-query";

import { lectureKeys } from "@/constants/query-keys";
import {
  createLectureAPI,
  LectureCreatePayload,
} from "@/services/lectures.service";

type UseCreateLectureOptions = {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
};

export const useCreateLecture = (options?: UseCreateLectureOptions) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: LectureCreatePayload) => createLectureAPI(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: lectureKeys.lists() });
      queryClient.invalidateQueries({ queryKey: lectureKeys.todays() });
      queryClient.invalidateQueries({ queryKey: lectureKeys.all });
      options?.onSuccess?.();
    },
    onError: (error) => {
      const message = error instanceof Error ? error.message : "Unknown error";
      console.error("강의 생성 실패:", message);
      options?.onError?.(error as Error);
    },
  });
};
