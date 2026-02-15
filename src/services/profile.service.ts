import { axiosClient } from "@/services/axiosClient";
import type { ApiResponse } from "@/types/api";
import type {
  MyProfileApiResponse,
  UpdateMyProfilePayload,
} from "@/types/profile.api";

export const fetchMyProfileAPI = async (): Promise<MyProfileApiResponse> => {
  const { data } =
    await axiosClient.get<ApiResponse<MyProfileApiResponse>>("/me");

  return data.data;
};

export const updateMyProfileAPI = async (
  payload: UpdateMyProfilePayload
): Promise<MyProfileApiResponse> => {
  const { data } = await axiosClient.patch<ApiResponse<MyProfileApiResponse>>(
    "/me",
    payload
  );

  return data.data;
};
