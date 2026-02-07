import Link from "next/link";

import { Materials } from "@/types/materials.type";
import { MATERIALS_TYPE_LABEL } from "@/constants/materials.default";
import { Checkbox } from "@/components/ui/checkbox";
import StatusLabel from "@/components/common/label/StatusLabel";

export const MATERIALS_TABLE_COLUMNS = ({
  selectedMaterials,
  onToggleMaterial,
  onToggleAllMaterials,
  isCurrentPageAllSelected,
}: {
  selectedMaterials: string[];
  onToggleMaterial: (material: Materials) => void;
  onToggleAllMaterials: (checked: boolean) => void;
  isCurrentPageAllSelected: boolean;
}) => [
  {
    key: "select",
    label: (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={isCurrentPageAllSelected}
          onCheckedChange={onToggleAllMaterials}
        />
      </div>
    ),
    render: (row: Materials) => (
      <label className="flex items-center justify-center w-full h-full cursor-pointer">
        <Checkbox
          checked={selectedMaterials.includes(row.id)}
          onCheckedChange={() => onToggleMaterial(row)}
        />
      </label>
    ),
  },
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
    label: "작성일",
    render: (row: Materials) => <span>{row.date}</span>,
  },
];
