import { axiosClientSVC } from "@/services/axiosClient";
import type { ApiResponse } from "@/types/api";
import type {
  LearnerMyProfileApiResponse,
  UpdateLearnerMyProfilePayload,
} from "@/types/learners-profile.api";

export const fetchMyLearnerProfileAPI =
  async (): Promise<LearnerMyProfileApiResponse> => {
    const { data } =
      await axiosClientSVC.get<ApiResponse<LearnerMyProfileApiResponse>>("/me");

    return data.data;
  };

export const updateMyLearnerProfileAPI = async (
  payload: UpdateLearnerMyProfilePayload
): Promise<LearnerMyProfileApiResponse> => {
  const { data } = await axiosClientSVC.patch<
    ApiResponse<LearnerMyProfileApiResponse>
  >("/me", payload);

  return data.data;
};
