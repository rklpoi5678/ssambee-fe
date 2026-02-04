import StatusLabel from "@/components/common/label/StatusLabel";

type InquiryStatus = "ANSWERED" | "ANSWERING" | "UNANSWERED";
type WriterType = "student" | "educator";
type ContentType = "INQUIRY" | "NOTICE";

type Writer = {
  name: string;
  type: WriterType;
};

type Inquiry = {
  id: string;
  date: string;
  status: InquiryStatus;
  title: string;
  content: string;
  writer: Writer;
  responsibleEducator: string;
  comment?: string | null;
  content_type: ContentType;
};

const INQUIRY_STATUS_LABEL = {
  UNANSWERED: { label: "미답변", color: "red" },
  ANSWERED: { label: "답변완료", color: "gray" },
  ANSWERING: { label: "답변중", color: "yellow" },
} as const;

const CONTENT_TYPE_LABEL = {
  INQUIRY: { label: "문의", color: "green" },
  NOTICE: { label: "공지", color: "blue" },
} as const;

// TODO: 목데이터 삭제
export const InquiryMock: Inquiry[] = [
  {
    id: "1",
    date: "2026-01-01",
    status: "UNANSWERED",
    title: "문의 제목",
    content: "문의 내용",
    writer: {
      name: "김학생",
      type: "student",
    },
    content_type: "INQUIRY",
    responsibleEducator: "김강사",
    comment: "문의 답변",
  },
  {
    id: "2",
    date: "2026-01-02",
    status: "ANSWERING",
    title: "두쫀쿠 맛있나요?",
    content:
      "두쫀쿠가 그렇게 맛있나요? 엄청 비싸던데.. 그만한 가치가 있는지 궁금합니다.",
    writer: {
      name: "최강사",
      type: "educator",
    },
    content_type: "NOTICE",
    responsibleEducator: "이조교",
    comment: "저도 모르겠네요..",
  },
  {
    id: "3",
    date: "2026-01-03",
    status: "ANSWERED",
    title: "코딩 꿀팁 알려주세요.",
    content: "코딩 잘하는 꿀팁 있나요?? 알려주세요.",
    writer: {
      name: "박학생",
      type: "student",
    },
    content_type: "INQUIRY",
    responsibleEducator: "이강사",
    comment: null,
  },
];

export const INQUIRY_TABLE_COLUMNS = [
  {
    key: "status",
    label: "답변 상태",
    render: (row: Inquiry) => (
      <div className="flex items-center gap-1">
        <StatusLabel color={INQUIRY_STATUS_LABEL[row.status].color}>
          {INQUIRY_STATUS_LABEL[row.status].label}
        </StatusLabel>
      </div>
    ),
  },
  {
    key: "writer",
    label: "작성자",
    render: (row: Inquiry) => <span>{row.writer.name}</span>,
  },
  {
    key: "title",
    label: "제목",
    render: (row: Inquiry) => <span>{row.title}</span>,
  },
  {
    key: "responsibleEducator",
    label: "책임자",
    render: (row: Inquiry) => <span>{row.responsibleEducator}</span>,
  },
  {
    key: "content_type",
    label: "분류",
    render: (row: Inquiry) => (
      <div className="flex items-center gap-1">
        <StatusLabel color={CONTENT_TYPE_LABEL[row.content_type].color}>
          {CONTENT_TYPE_LABEL[row.content_type].label}
        </StatusLabel>
      </div>
    ),
  },
  {
    key: "date",
    label: "작성일",
    render: (row: Inquiry) => <span>{row.date}</span>,
  },
];
