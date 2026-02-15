import { axiosClient } from "@/services/axiosClient";
import {
  GetInstructorPostsResponse,
  GetInstructorPostDetailResponse,
  CreateInstructorPostRequest,
  GetInstructorPostTargetsQuery,
  UpdateInstructorPostRequest,
  CreateInstructorPostCommentRequest,
  InstructorPostDetailComment,
} from "@/types/communication/instructorPost";
import { ApiResponse } from "@/types/api";
import {
  GetStudentPostDetailResponse,
  GetStudentPostsResponse,
  StudentPostDetailComment,
  UpdateStudentPostCommentRequest,
  CreateStudentPostCommentRequest,
} from "@/types/communication/studentPost";
import { CommonPostQuery } from "@/types/communication/commonPost";

export const instructorPostService = {
  // 강사 게시글 알림 대상 조회
  getInstructorPostTargets: async (params: GetInstructorPostTargetsQuery) => {
    const { data } = await axiosClient.get<
      ApiResponse<GetInstructorPostTargetsQuery>
    >("/instructor-posts/targets", {
      params,
    });
    return data.data;
  },

  // 강사 게시글 - 공지 생성
  createInstructorNoticePost: async (payload: CreateInstructorPostRequest) => {
    const { data } = await axiosClient.post<
      ApiResponse<GetInstructorPostDetailResponse>
    >("/instructor-posts/submit", payload);
    return data.data;
  },

  // 강사 게시글 - 자료 공유 생성
  createInstructorSharePost: async (payload: CreateInstructorPostRequest) => {
    const { data } = await axiosClient.post<
      ApiResponse<GetInstructorPostDetailResponse>
    >("/instructor-posts/submit", payload);
    return data.data;
  },

  // 강사 게시글 댓글 작성
  createInstructorPostComment: async (
    postId: string,
    payload: CreateInstructorPostCommentRequest
  ) => {
    const { data } = await axiosClient.post<
      ApiResponse<InstructorPostDetailComment>
    >(`/instructor-posts/${postId}/comments`, payload);
    return data.data;
  },

  // 강사 게시글 댓글 수정

  // 강사 게시글 댓글 삭제

  // 강사 게시글 목록 전체 조회
  getInstructorPosts: async (params: CommonPostQuery) => {
    const { data } = await axiosClient.get<
      ApiResponse<GetInstructorPostsResponse>
    >("/instructor-posts", {
      params,
    });
    return data.data;
  },

  // 공지 상세 조회
  getInstructorPostDetail: async (postId: string) => {
    const { data } = await axiosClient.get<
      ApiResponse<GetInstructorPostDetailResponse>
    >(`/instructor-posts/${postId}`);
    return data.data;
  },

  // 강사 게시글 수정
  updateInstructorPost: async (
    postId: string,
    payload: UpdateInstructorPostRequest
  ) => {
    const { data } = await axiosClient.patch<
      ApiResponse<GetInstructorPostDetailResponse>
    >(`/instructor-posts/${postId}`, payload);
    return data.data;
  },

  // 강사 게시글 삭제
  deleteInstructorPost: async (postId: string) => {
    const { data } = await axiosClient.delete<
      ApiResponse<GetInstructorPostDetailResponse>
    >(`/instructor-posts/${postId}`);
    return data.data;
  },
};

export const studentPostService = {
  // 학생 문의 답변 생성
  createStudentPostComment: async (
    postId: string,
    payload: CreateStudentPostCommentRequest
  ) => {
    const { data } = await axiosClient.post<
      ApiResponse<StudentPostDetailComment>
    >(`/student-posts/${postId}/comments`, payload);
    return data.data;
  },

  // 학생 문의 목록 전체 조회
  getStudentPosts: async (params: CommonPostQuery) => {
    const { data } = await axiosClient.get<
      ApiResponse<GetStudentPostsResponse>
    >("/student-posts", {
      params,
    });
    return data.data;
  },

  // 학생 문의 상세 조회
  getStudentPostDetail: async (postId: string) => {
    const { data } = await axiosClient.get<
      ApiResponse<GetStudentPostDetailResponse>
    >(`/student-posts/${postId}`);
    return data.data;
  },

  // 학생 문의 답변 수정
  updateStudentPostComment: async (
    postId: string,
    commentId: string,
    payload: UpdateStudentPostCommentRequest
  ) => {
    const { data } = await axiosClient.patch<
      ApiResponse<StudentPostDetailComment>
    >(`/student-posts/${postId}/comments/${commentId}`, payload);
    return data.data;
  },

  // 학생 문의 답변 삭제
  deleteStudentPostComment: async (postId: string, commentId: string) => {
    const { data } = await axiosClient.delete<
      ApiResponse<StudentPostDetailComment>
    >(`/student-posts/${postId}/comments/${commentId}`);
    return data.data;
  },
};
