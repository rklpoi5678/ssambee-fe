"use client";

import { useCallback } from "react";

import { CheckModal } from "@/components/common/modals/CheckModal";
import { useModal } from "@/providers/ModalProvider";

type AlertOptions = {
  title?: string;
  description: string;
  confirmText?: string;
};

type ConfirmOptions = {
  title?: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
};

export const useDialogAlert = () => {
  const { openModal } = useModal();

  const showAlert = useCallback(
    ({ title = "알림", description, confirmText = "확인" }: AlertOptions) =>
      new Promise<void>((resolve) => {
        openModal(
          <CheckModal
            title={title}
            description={description}
            confirmText={confirmText}
            hideCancel
            onConfirm={resolve}
            onCancel={resolve}
          />
        );
      }),
    [openModal]
  );

  const showConfirm = useCallback(
    ({
      title = "확인",
      description,
      confirmText = "확인",
      cancelText = "취소",
    }: ConfirmOptions) =>
      new Promise<boolean>((resolve) => {
        openModal(
          <CheckModal
            title={title}
            description={description}
            confirmText={confirmText}
            cancelText={cancelText}
            onConfirm={() => resolve(true)}
            onCancel={() => resolve(false)}
          />
        );
      }),
    [openModal]
  );

  return {
    showAlert,
    showConfirm,
  };
};
