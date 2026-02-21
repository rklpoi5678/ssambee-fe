import type { ColumnDefinition } from "@/components/common/table/DataTable";
import type {
  LearnerChild,
  LearnerInstructor,
} from "@/types/learners-profile.type";

export const instructorColumns: ColumnDefinition<LearnerInstructor>[] = [
  {
    key: "name",
    label: "강사명",
    render: (instructor) => (
      <span className="font-medium">{instructor.name}</span>
    ),
  },
  {
    key: "academyName",
    label: "소속",
    render: (instructor) => <span>{instructor.academyName}</span>,
  },
  {
    key: "subject",
    label: "과목",
    render: (instructor) => <span>{instructor.subject}</span>,
  },
];

export const childColumns: ColumnDefinition<LearnerChild>[] = [
  {
    key: "name",
    label: "자녀명",
    render: (child) => <span className="font-medium">{child.name}</span>,
  },
  {
    key: "phone",
    label: "휴대폰 번호",
    render: (child) => <span>{child.phone}</span>,
  },
];
