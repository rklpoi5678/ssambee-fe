"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Title from "@/components/common/header/Title";
import {
  PostType,
  PostScope,
  TargetRole,
} from "@/types/communication/instructorPost";
import { InputForm } from "@/components/common/input/InputForm";
import TiptapEditor from "@/components/common/editor/TiptapEditor";
import { useInstructorPostMutations } from "@/hooks/useInstructorPost";

import PostTypeSelect from "./_components/setting/PostTypeSelect";
import PostSetting from "./_components/setting/PostSetting";

export default function CreateInstructorPostPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [selectedClassId, setSelectedClassId] = useState<string>("ALL");
  const [selectedPostType, setSelectedPostType] = useState<PostType>("NOTICE");

  // 알림 대상 선택
  const [selectedStudentIds, setSelectedStudentIds] = useState<string[]>([]);
  const [targetRole, setTargetRole] = useState<TargetRole>("ALL");

  // Mutations
  const { createNoticeMutation, createShareMutation } =
    useInstructorPostMutations();

  // 게시글 분류 토글
  const togglePostType = (postType: PostType) => {
    setSelectedPostType(postType);
  };

  // 게시글 등록
  const handleSubmit = () => {
    if (!title.trim()) {
      alert("제목을 입력해주세요.");
      return;
    }

    if (!content.trim()) {
      alert("내용을 입력해주세요.");
      return;
    }

    let scope: PostScope = "GLOBAL";

    if (selectedStudentIds.length > 0) {
      // 학생이 한 명이라도 직접 선택된 경우
      scope = "SELECTED";
    } else if (selectedClassId !== "ALL") {
      // 학생 선택은 없지만, 특정 클래스가 지정된 경우
      scope = "LECTURE";
    } else {
      // 클래스도 ALL, 학생 선택도 없는 경우
      scope = "GLOBAL";
    }

    const payload = {
      title,
      content,
      isImportant: selectedPostType === "NOTICE",
      scope,
      targetRole,
      lectureId: selectedClassId === "ALL" ? null : selectedClassId,
      targetEnrollmentIds: selectedStudentIds,
      materialIds: [],
    };

    const mutation =
      selectedPostType === "NOTICE"
        ? createNoticeMutation
        : createShareMutation;

    mutation.mutate(payload, {
      onSuccess: () => {
        const targetTab = selectedPostType === "NOTICE" ? "NOTICE" : "INQUIRY";
        router.push(`/educators/communication?tab=${targetTab}`);
      },
    });
  };

  const isSubmitting =
    createNoticeMutation.isPending || createShareMutation.isPending;

  return (
    <div className="container mx-auto px-8 py-8 space-y-6 max-w-[1400px]">
      {/* 헤더 */}
      <div className="flex items-center justify-between gap-4">
        <Title title="게시글 등록" description="새로운 게시글을 작성합니다." />

        <Button
          variant="outline"
          onClick={() => router.back()}
          className="max-w-[180px] h-[50px] w-full rounded-lg text-base cursor-pointer"
        >
          <ArrowLeft className="h-5 w-5" />
          뒤로가기
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="space-y-6">
          <PostTypeSelect
            selectedPostType={selectedPostType}
            togglePostType={togglePostType}
          />

          <PostSetting
            selectedClassId={selectedClassId}
            onClassIdChange={setSelectedClassId}
            selectedStudentIds={selectedStudentIds}
            onStudentIdsChange={setSelectedStudentIds}
            targetRole={targetRole}
            onTargetRoleChange={(role) => setTargetRole(role)}
          />
        </div>

        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <h3 className="font-semibold text-lg">게시글 작성</h3>

              <div className="space-y-2">
                <InputForm
                  label="제목"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">내용</Label>
                <TiptapEditor
                  content={content}
                  onChange={setContent}
                  placeholder="내용을 입력하세요"
                  className="min-h-[400px]"
                />
              </div>

              {selectedPostType === "NOTICE" && (
                <div className="space-y-2">
                  <p className="text-xs text-muted-foreground">
                    * 현재 공지사항에는 첨부파일을 추가할 수 없습니다. (추후
                    업데이트 예정)
                  </p>
                </div>
              )}

              {/* 첨부파일 (자료 공유 시에만 표시) */}
              {selectedPostType === "SHARE" && (
                <div className="space-y-2">
                  <Label className="text-sm font-medium">첨부파일</Label>
                  <div className="border-2 border-dashed rounded-lg p-6 text-center">
                    <p className="text-sm text-muted-foreground mb-2">
                      학습 자료실에서 자료를 선택하세요
                    </p>
                    <Button variant="outline">자료실에서 선택</Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    * 자료 공유는 학습 자료실에 미리 업로드한 파일만 첨부할 수
                    있습니다.
                  </p>
                </div>
              )}

              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => router.back()}>
                  취소
                </Button>
                <Button onClick={handleSubmit} disabled={isSubmitting}>
                  {isSubmitting ? "등록 중..." : "게시글 등록"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
