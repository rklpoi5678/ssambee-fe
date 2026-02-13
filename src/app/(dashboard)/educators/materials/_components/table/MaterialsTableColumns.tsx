import Link from "next/link";
import { Download } from "lucide-react";

import { Materials } from "@/types/materials.type";
import { MATERIALS_TYPE_LABEL } from "@/constants/materials.default";
import StatusLabel from "@/components/common/label/StatusLabel";
import { Button } from "@/components/ui/button";

export const MATERIALS_TABLE_COLUMNS = ({
  onDownload,
}: {
  onDownload: (material: Materials) => void;
}) => [
  {
    key: "title",
    label: "자료명",
    render: (row: Materials) => (
      <Link
        href={`/educators/materials/${row.id}`}
        className="font-medium hover:text-primary hover:underline block w-full"
      >
        {row.title || "-"}
      </Link>
    ),
  },
  {
    key: "type",
    label: "자료 유형",
    render: (row: Materials) => (
      <StatusLabel color={MATERIALS_TYPE_LABEL[row.type].color}>
        {MATERIALS_TYPE_LABEL[row.type].label}
      </StatusLabel>
    ),
  },
  {
    key: "writer",
    label: "작성자",
    render: (row: Materials) => <span>{row.writer}</span>,
  },
  {
    key: "date",
    label: "등록일",
    render: (row: Materials) => <span>{row.date}</span>,
  },
  {
    key: "download",
    label: "다운로드",
    render: (row: Materials) => {
      // 파일이 있는 타입만 다운로드 버튼 표시
      if (row.type === "VIDEO") return <span className="text-gray-400">-</span>;

      return (
        <Button
          variant="outline"
          onClick={(e) => {
            e.stopPropagation();
            onDownload(row);
          }}
          className="cursor-pointer"
        >
          <Download className="h-4 w-4" />
        </Button>
      );
    },
  },
];
