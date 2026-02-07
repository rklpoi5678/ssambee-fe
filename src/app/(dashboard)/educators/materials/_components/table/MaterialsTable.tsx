"use client";

import { useState } from "react";

import DataTable from "@/components/common/table/DataTable";
import { MOCK_MATERIALS } from "@/data/materials.mock";
import { Materials } from "@/types/materials.type";
import { Pagination } from "@/components/common/pagination/Pagination";

import { MATERIALS_TABLE_COLUMNS } from "./MaterialsTableColumns";

export default function MaterialsTable() {
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);

  // 전체 선택 여부 계산
  const isAllSelected =
    MOCK_MATERIALS.length > 0 &&
    selectedMaterials.length === MOCK_MATERIALS.length;

  // 전체 선택/해제
  const handleToggleAll = () => {
    if (isAllSelected) {
      // 이미 다 선택되어 있다면 모두 해제
      setSelectedMaterials([]);
    } else {
      // 아니라면 모든 ID를 추가
      setSelectedMaterials(MOCK_MATERIALS.map((m) => m.id));
    }
  };

  const handleToggleMaterial = (material: Materials) => {
    setSelectedMaterials(
      (prev) =>
        prev.includes(material.id)
          ? prev.filter((id) => id !== material.id) // 이미 있으면 제거
          : [...prev, material.id] // 없으면 추가
    );
  };

  // 파일 다운로드 핸들러
  const handleDownload = (material: Materials) => {
    if (!material.file) {
      alert("다운로드할 파일이 없습니다.");
      return;
    }

    // TODO: 실제 API에서는 파일 URL을 받아서 다운로드
    // 임시로 File 객체의 이름만 사용
    const fileName = material.file.name || `${material.title}.pdf`;
    alert(`다운로드: ${fileName}`);
  };

  return (
    <div className="min-h-[550px]">
      <DataTable
        data={MOCK_MATERIALS}
        columns={MATERIALS_TABLE_COLUMNS({
          selectedMaterials,
          onToggleMaterial: handleToggleMaterial,
          onToggleAllMaterials: handleToggleAll,
          isCurrentPageAllSelected: isAllSelected,
          onDownload: handleDownload,
        })}
      />

      <Pagination
        pagination={{
          totalCount: MOCK_MATERIALS.length,
          totalPage: 1,
          currentPage: 1,
          limit: 10,
          hasNextPage: false,
          hasPrevPage: false,
        }}
        onPageChange={(page) => console.log(page)}
      />
    </div>
  );
}
