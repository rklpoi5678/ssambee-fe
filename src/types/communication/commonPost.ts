import { AnswerStatus, InquiryWriterType } from "./studentPost";
import { PostType } from "./instructorPost";

export type CommonPostQuery = {
  page: number;
  limit: number;
  search?: string;
  // Inquiry 전용
  answerStatus?: AnswerStatus | null;
  writerType?: InquiryWriterType | null;
  // Notice 전용
  postType?: PostType | null;
};
