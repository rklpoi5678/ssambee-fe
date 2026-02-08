"use client";

import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Card, CardContent } from "@/components/ui/card";
import { InputForm } from "@/components/common/input/InputForm";
import { TextareaForm } from "@/components/common/input/TextareaForm";
import { VideoFormData, FormMode, Materials } from "@/types/materials.type";
import { videoFormSchema } from "@/validation/materials.validation";
import { getVideoFormDefaults } from "@/constants/materials.default";
import { getYoutubeVideoId } from "@/utils/youtubeLink";

type VideoTypeFormProps = {
  mode?: FormMode;
  initialData?: Materials;
  onDataChange?: (data: VideoFormData, isValid: boolean) => void;
  userName: string;
};

export default function VideoTypeForm({
  mode = "create",
  initialData,
  onDataChange,
  userName,
}: VideoTypeFormProps) {
  const isDisabled = mode === "view";

  const {
    register,
    control,
    getValues,
    formState: { errors, isValid },
  } = useForm<VideoFormData>({
    resolver: mode === "view" ? undefined : zodResolver(videoFormSchema),
    mode: "onChange",
    defaultValues: initialData
      ? {
          title: initialData.title,
          writer: initialData?.writer ? initialData.writer : userName,
          className: initialData.className || "",
          description: initialData.description,
          youtubeLink: initialData.link || "",
        }
      : { ...getVideoFormDefaults(), writer: userName },
  });

  const watchedFields = useWatch({ control });
  const youtubeLink = watchedFields.youtubeLink;
  const videoId = getYoutubeVideoId(youtubeLink || "");

  useEffect(() => {
    if (mode !== "view") {
      const formData = getValues();
      onDataChange?.(formData, isValid);
    }
  }, [watchedFields, isValid, getValues, onDataChange, mode]);

  return (
    <Card>
      <CardContent className="p-6 space-y-6">
        <div>
          <h3 className="font-semibold text-lg mb-2">
            {mode === "create" ? "동영상 강의 등록" : "동영상 강의"}
          </h3>
          <p className="text-sm text-muted-foreground">
            {mode === "create"
              ? "동영상 강의를 YouTube 링크로 등록합니다."
              : mode === "view"
                ? "동영상 강의 정보를 확인합니다."
                : "동영상 강의 정보를 수정합니다."}
          </p>
        </div>

        <div className="space-y-4">
          <InputForm
            label="제목"
            id="title"
            error={errors.title?.message}
            disabled={isDisabled}
            {...register("title")}
          />

          <div className="flex flex-row gap-2">
            <InputForm
              label="클래스명"
              id="className"
              error={errors.className?.message}
              disabled={isDisabled}
              {...register("className")}
            />

            <InputForm
              label="등록자"
              id="writer"
              readOnly
              className="bg-gray-50"
              {...register("writer")}
            />
          </div>

          <TextareaForm
            label="세부 내용"
            id="description"
            error={errors.description?.message}
            disabled={isDisabled}
            {...register("description")}
          />

          <InputForm
            label="YouTube 링크"
            id="youtubeLink"
            error={errors.youtubeLink?.message}
            disabled={isDisabled}
            {...register("youtubeLink")}
          />

          {youtubeLink && videoId && (
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-700 mb-2">미리보기</p>
              <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-black">
                <iframe
                  src={`https://www.youtube.com/embed/${videoId}`}
                  title="YouTube video preview"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute top-0 left-0 w-full h-full"
                />
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
