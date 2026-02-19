"use client";

import { useSetBreadcrumb } from "@/hooks/useBreadcrumb";
import { useModal } from "@/providers/ModalProvider";
import { useMyLearnerProfile } from "@/hooks/profile/useMyLearnerProfile";
import type { LearnersProfileUpdateFormData } from "@/validation/learners-profile.validation";
import { PhoneChangeModal } from "@/app/(dashboard)/educators/profile/_components/modal/PhoneChangeModal";
import { SettingsSecurityModal } from "@/app/(dashboard)/educators/profile/_components/modal/SettingsSecurityModal";

import { LearnersProfileSummary } from "./_components/LearnersProfileSummary";
import { LearnersBasicInfo } from "./_components/LearnersBasicInfo";
import { LearnersRoleInfo } from "./_components/LearnersRoleInfo";
import { LearnersProfileEditModal } from "./_components/modal/LearnersProfileEditModal";

export default function LearnersProfilePage() {
  useSetBreadcrumb([{ label: "프로필" }]);

  const { openModal, closeModal } = useModal();
  const { profile, isPending, isError, updateProfile, isUpdating } =
    useMyLearnerProfile();

  const handleEditClick = () => {
    if (!profile) return;

    openModal(
      <LearnersProfileEditModal
        profile={profile}
        onSubmit={handleProfileUpdate}
      />
    );
  };

  const handleSettingsClick = () => {
    if (!profile) return;

    openModal(<SettingsSecurityModal email={profile.email} />);
  };

  const handlePhoneChangeClick = () => {
    if (!profile) return;

    openModal(<PhoneChangeModal currentPhone={profile.phone} />);
  };

  const handleProfileUpdate = (data: LearnersProfileUpdateFormData) => {
    if (!profile || isUpdating) return;

    updateProfile(data)
      .then(() => {
        closeModal();
      })
      .catch((error) => {
        const normalizedError =
          error instanceof Error ? error : new Error(String(error));
        console.error("프로필 업데이트 실패:", normalizedError.message);
      });
  };

  if (isError) {
    return (
      <div className="p-8 text-center text-red-500">
        프로필 정보를 불러오지 못했습니다.
      </div>
    );
  }

  if (isPending || !profile) {
    return <div className="p-8 text-center">프로필을 불러오는 중...</div>;
  }

  return (
    <div className="space-y-6 p-4 max-w-[1400px] mx-auto w-full">
      <LearnersProfileSummary
        profile={profile}
        onEditClick={handleEditClick}
        onSettingsClick={handleSettingsClick}
      />

      <LearnersBasicInfo
        profile={profile}
        onPhoneChangeClick={handlePhoneChangeClick}
      />

      <LearnersRoleInfo profile={profile} />
    </div>
  );
}
