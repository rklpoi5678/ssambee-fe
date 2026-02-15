import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import {
  CreateInstructorPostCommentRequest,
  CreateInstructorPostRequest,
  UpdateInstructorPostRequest,
} from "@/types/communication/instructorPost";
import { GetInstructorPostTargetsQuery } from "@/types/communication/instructorPost";
import {
  CreateStudentPostCommentRequest,
  UpdateStudentPostCommentRequest,
} from "@/types/communication/studentPost";
import {
  instructorPostService,
  studentPostService,
} from "@/services/instructorPost.service";
import { CommonPostQuery } from "@/types/communication/commonPost";

// 공지 알림 대상 조회
export const useInstructorPostTargets = (
  params: GetInstructorPostTargetsQuery
) => {
  return useQuery({
    queryKey: ["instructorPostsTargets", params],
    queryFn: () => instructorPostService.getInstructorPostTargets(params),
  });
};

// 공지 목록 조회
export const useInstructorPosts = (params: CommonPostQuery) => {
  return useQuery({
    queryKey: ["instructorPosts", params],
    queryFn: () => instructorPostService.getInstructorPosts(params),
  });
};

// 공지 상세 조회
export const useInstructorPostDetail = (
  postId: string,
  options?: { enabled?: boolean }
) => {
  return useQuery({
    queryKey: ["instructorPost", postId],
    queryFn: () => instructorPostService.getInstructorPostDetail(postId),
    enabled: !!postId && !!options?.enabled,
  });
};

// 강사 게시글 관련 mutations
export const useInstructorPostMutations = () => {
  const queryClient = useQueryClient();

  // 공지 생성
  const createNoticeMutation = useMutation({
    mutationFn: (payload: CreateInstructorPostRequest) =>
      instructorPostService.createInstructorNoticePost(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["instructorPosts"],
        refetchType: "active",
      });
      alert("공지사항이 성공적으로 등록되었습니다.");
    },
    onError: (error) => {
      console.error("공지 등록 실패:", error);
      alert("공지 등록 중 오류가 발생했습니다. 다시 시도해주세요.");
    },
  });

  // 자료 공유 생성
  const createShareMutation = useMutation({
    mutationFn: (payload: CreateInstructorPostRequest) =>
      instructorPostService.createInstructorSharePost(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["instructorPosts"],
        refetchType: "active",
      });
      alert("자료 공유가 성공적으로 등록되었습니다.");
    },
    onError: (error) => {
      console.error("자료 공유 등록 실패:", error);
      alert("자료 공유 등록 중 오류가 발생했습니다. 다시 시도해주세요.");
    },
  });

  // 공지 수정
  const updateNoticeMutation = useMutation({
    mutationFn: ({
      postId,
      payload,
    }: {
      postId: string;
      payload: UpdateInstructorPostRequest;
    }) => instructorPostService.updateInstructorPost(postId, payload),
    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries({
        queryKey: ["instructorPost", variables.postId],
        refetchType: "active",
      });
      await queryClient.invalidateQueries({
        queryKey: ["instructorPosts"],
        refetchType: "active",
      });
      alert("공지사항이 수정되었습니다.");
    },
    onError: (error) => {
      console.error("공지 수정 실패:", error);
      alert("공지 수정 중 오류가 발생했습니다. 다시 시도해주세요.");
    },
  });

  // 공지 삭제
  const deleteNoticeMutation = useMutation({
    mutationFn: (postId: string) =>
      instructorPostService.deleteInstructorPost(postId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["instructorPosts"],
        refetchType: "active",
      });
      alert("공지사항이 삭제되었습니다.");
    },
    onError: (error) => {
      console.error("공지 삭제 실패:", error);
      alert("공지 삭제 중 오류가 발생했습니다. 다시 시도해주세요.");
    },
  });

  return {
    createNoticeMutation,
    createShareMutation,
    updateNoticeMutation,
    deleteNoticeMutation,
  };
};

// 강사 게시글 댓글 관련 mutations
export const useCreateInstructorPostComment = () => {
  const queryClient = useQueryClient();

  const createInstructorPostComment = useMutation({
    mutationFn: ({
      postId,
      payload,
    }: {
      postId: string;
      payload: CreateInstructorPostCommentRequest;
    }) => instructorPostService.createInstructorPostComment(postId, payload),
    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries({
        queryKey: ["instructorPost", variables.postId],
        refetchType: "active",
      });
      alert("댓글이 등록되었습니다.");
    },
    onError: (error) => {
      console.error("댓글 등록 실패:", error);
      alert("댓글 등록 중 오류가 발생했습니다. 다시 시도해주세요.");
    },
  });

  return { createInstructorPostComment };
};

// 학생 문의 목록 조회
export const useStudentPosts = (params: CommonPostQuery) => {
  return useQuery({
    queryKey: ["studentPosts", params],
    queryFn: () => studentPostService.getStudentPosts(params),
  });
};

// 학생 문의 상세 조회
export const useStudentPostDetail = (
  postId: string,
  options?: { enabled?: boolean }
) => {
  return useQuery({
    queryKey: ["studentPost", postId],
    queryFn: () => studentPostService.getStudentPostDetail(postId),
    enabled: !!postId && !!options?.enabled,
  });
};

// 학생 문의 답변 관련 mutations
export const useStudentPostMutations = () => {
  const queryClient = useQueryClient();

  // 학생 문의 답변 생성
  const createStudentPostCommentMutation = useMutation({
    mutationFn: ({
      postId,
      payload,
    }: {
      postId: string;
      payload: CreateStudentPostCommentRequest;
    }) => studentPostService.createStudentPostComment(postId, payload),
    onSuccess: async (_, variables) => {
      // 상세 페이지 정보 갱신 (댓글 목록 포함)
      await queryClient.invalidateQueries({
        queryKey: ["studentPost", variables.postId],
        refetchType: "active",
      });
      // 목록의 답변 완료 상태 업데이트를 위해 목록 쿼리도 갱신
      await queryClient.invalidateQueries({
        queryKey: ["studentPosts"],
        refetchType: "active",
      });
      alert("답변이 등록되었습니다.");
    },
    onError: (error) => {
      console.error("답변 등록 실패:", error);
      alert("답변 등록 중 오류가 발생했습니다.");
    },
  });

  // 학생 문의 답변 수정
  const updateStudentPostCommentMutation = useMutation({
    mutationFn: ({
      postId,
      commentId,
      payload,
    }: {
      postId: string;
      commentId: string;
      payload: UpdateStudentPostCommentRequest;
    }) =>
      studentPostService.updateStudentPostComment(postId, commentId, payload),
    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries({
        queryKey: ["studentPost", variables.postId],
        refetchType: "active",
      });
      alert("답변이 수정되었습니다.");
    },
    onError: (error) => {
      console.error("답변 수정 실패:", error);
      alert("답변 수정 중 오류가 발생했습니다.");
    },
  });

  // 학생 문의 답변 삭제
  const deleteStudentPostCommentMutation = useMutation({
    mutationFn: ({
      postId,
      commentId,
    }: {
      postId: string;
      commentId: string;
    }) => studentPostService.deleteStudentPostComment(postId, commentId),
    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries({
        queryKey: ["studentPost", variables.postId],
        refetchType: "active",
      });
      // 삭제 후 목록 상태(답변 대기 등) 반영을 위해 목록 갱신
      await queryClient.invalidateQueries({
        queryKey: ["studentPosts"],
        refetchType: "active",
      });
      alert("답변이 삭제되었습니다.");
    },
    onError: (error) => {
      console.error("답변 삭제 실패:", error);
      alert("답변 삭제 중 오류가 발생했습니다.");
    },
  });

  return {
    createStudentPostCommentMutation,
    updateStudentPostCommentMutation,
    deleteStudentPostCommentMutation,
  };
};
