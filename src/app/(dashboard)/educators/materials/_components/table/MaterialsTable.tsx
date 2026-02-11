"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";

import DataTable from "@/components/common/table/DataTable";
import { Materials, MaterialsType } from "@/types/materials.type";
import { Pagination } from "@/components/common/pagination/Pagination";
import { useMaterials } from "@/hooks/useMaterials";
import { materialsService } from "@/services/materials.service";

import { MATERIALS_TABLE_COLUMNS } from "./MaterialsTableColumns";

type MaterialsTableProps = {
  searchKeyword: string;
  selectedType: MaterialsType | "ALL";
  selectedSort: "latest" | "oldest";
};

export default function MaterialsTable({
  searchKeyword,
  selectedType,
  selectedSort,
}: MaterialsTableProps) {
  const [page, setPage] = useState(1);
  const limit = 10;

  const [prevFilters, setPrevFilters] = useState({
    selectedType,
    selectedSort,
  });

  // 필터 바뀌면 페이지 리셋
  if (
    prevFilters.selectedType !== selectedType ||
    prevFilters.selectedSort !== selectedSort
  ) {
    setPrevFilters({ selectedType, selectedSort });
    setPage(1);
  }

  // 실제 데이터 Fetching
  const { materialsQuery } = useMaterials({
    page,
    limit,
    type: selectedType,
    sort: selectedSort,
  });

  const { data, isLoading } = materialsQuery;

  // TODO: 서버에 검색 기능 요청
  // 검색 필터링
  const materials = data?.materials || [];
  const filteredMaterials = searchKeyword.trim()
    ? materials.filter((material) =>
        material.title.toLowerCase().includes(searchKeyword.toLowerCase())
      )
    : materials;

  const handleDownload = async (material: Materials) => {
    try {
      const response = await materialsService.getDownloadUrl(material.id);

      // 파일이든 YouTube든 새 탭에서 열기
      window.open(response.url, "_blank");
    } catch (error) {
      console.error("다운로드 링크를 가져오는데 실패했습니다.", error);
      alert("다운로드 링크를 가져오는데 실패했습니다.");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-[500px] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-[550px]">
      <DataTable
        data={filteredMaterials}
        columns={MATERIALS_TABLE_COLUMNS({
          onDownload: handleDownload,
        })}
      />

      <Pagination
        pagination={{
          totalCount: data?.pagination.totalCount || 0,
          totalPage: data?.pagination.totalPage || 0,
          currentPage: data?.pagination.currentPage || 1,
          limit: data?.pagination.limit || limit,
          hasNextPage: data?.pagination.hasNextPage || false,
          hasPrevPage: data?.pagination.hasPrevPage || false,
        }}
        onPageChange={(page) => setPage(page)}
      />
    </div>
  );
}
