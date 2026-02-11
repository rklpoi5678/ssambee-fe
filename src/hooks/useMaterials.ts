import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { MaterialsType } from "@/types/materials.type";
import { materialsService } from "@/services/materials.service";

export const useMaterials = (params: {
  page: number;
  limit: number;
  type: MaterialsType | "ALL";
  sort: "latest" | "oldest";
}) => {
  const queryClient = useQueryClient();

  // 목록 조회
  const materialsQuery = useQuery({
    queryKey: ["materials", params],
    queryFn: () => materialsService.getMaterials(params),
  });

  // 등록
  const createMutation = useMutation({
    mutationFn: materialsService.createMaterial,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["materials"],
        refetchType: "active",
      });
      alert("학습 자료가 성공적으로 등록되었습니다.");
    },
    onError: (error) => {
      console.error("등록 실패:", error);
      alert("자료 등록 중 오류가 발생했습니다. 다시 시도해주세요.");
    },
  });

  // 수정
  const updateMutation = useMutation({
    mutationFn: ({
      materialId,
      payload,
    }: {
      materialId: string;
      payload: FormData;
    }) => materialsService.updateMaterial(materialId, payload),
    onSuccess: async (_, variables) => {
      // 해당 자료의 상세 쿼리 무효화 및 refetch
      await queryClient.invalidateQueries({
        queryKey: ["material", variables.materialId],
        refetchType: "active",
      });
      alert("자료가 수정되었습니다.");
    },
    onError: (error) => {
      console.error("수정 실패:", error);
      alert("자료 수정 중 오류가 발생했습니다. 다시 시도해주세요.");
    },
  });

  // 삭제
  const deleteMutation = useMutation({
    mutationFn: materialsService.deleteMaterial,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["materials"],
        refetchType: "active",
      });
      alert("자료가 삭제되었습니다.");
    },
    onError: (error) => {
      console.error("삭제 실패:", error);
      alert("자료 삭제 중 오류가 발생했습니다. 다시 시도해주세요.");
    },
  });

  return { materialsQuery, createMutation, updateMutation, deleteMutation };
};

// 자료 상세 조회
export const useMaterialDetail = (id: string) => {
  return useQuery({
    queryKey: ["material", id],
    queryFn: () => materialsService.getMaterialDetail(id),
    enabled: !!id,
  });
};
