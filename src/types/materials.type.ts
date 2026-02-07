// 시험지, 동영상, 요청 자료, 기타
export type MaterialsType = "PAPER" | "VIDEO" | "REQUEST" | "OTHER";
export type SortOption = "LATEST" | "OLDEST";

export type MaterialsPagination = {
  totalCount: number;
  totalPage: number;
  currentPage: number;
  limit: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
};

export type MaterialsResponse = {
  status: string;
  data: { materials: Materials[]; pagination: MaterialsPagination };
  message: string;
};

export type Materials = {
  id: string;
  title: string; // 제목
  description: string; // 소개 또는 세부 내용
  file?: { name: string; file: File }; // 첨부파일(시험지, 요청 자료)
  link?: string; // 동영상 링크
  writer: string; // 작성자
  date: string; // 작성일
  type: MaterialsType; // 자료 유형
  classId?: string; // 반 아이디
  className?: string; // 반 이름
};
