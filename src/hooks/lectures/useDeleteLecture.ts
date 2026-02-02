import { useMutation, useQueryClient } from "@tanstack/react-query";

import { lectureKeys } from "@/constants/query-keys";
import { deleteLectureAPI } from "@/services/lectures.service";

type UseDeleteLectureOptions = {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
};

export const useDeleteLecture = (options?: UseDeleteLectureOptions) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (lectureId: string) => deleteLectureAPI(lectureId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: lectureKeys.lists() });
      queryClient.invalidateQueries({ queryKey: lectureKeys.todays() });
      queryClient.invalidateQueries({ queryKey: lectureKeys.all });
      options?.onSuccess?.();
    },
    onError: (error) => {
      const message = error instanceof Error ? error.message : "Unknown error";
      console.error("강의 삭제 실패:", message);
      options?.onError?.(error as Error);
    },
  });
};
