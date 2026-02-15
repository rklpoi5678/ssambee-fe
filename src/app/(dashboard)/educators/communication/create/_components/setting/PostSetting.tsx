"use client";

import { useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import SelectBtn from "@/components/common/button/SelectBtn";
import { TargetRole } from "@/types/communication/instructorPost";
import { NOTICE_TYPE_OPTIONS } from "@/constants/communication.default";
import { useInstructorPostTargets } from "@/hooks/useInstructorPost";

type PostSettingProps = {
  selectedClassId: string;
  onClassIdChange: (id: string) => void;
  selectedStudentIds: string[];
  onStudentIdsChange: (ids: string[]) => void;
  targetRole: TargetRole;
  onTargetRoleChange: (role: TargetRole) => void;
};

export default function PostSetting({
  selectedClassId,
  onClassIdChange,
  selectedStudentIds,
  onStudentIdsChange,
  targetRole,
  onTargetRoleChange,
}: PostSettingProps) {
  const [studentSearchQuery, setStudentSearchQuery] = useState("");

  const { data, isLoading } = useInstructorPostTargets({ lectures: [] });

  // 클래스 선택
  const classOptions = [
    { label: "전체 클래스", value: "ALL" },
    ...(data?.lectures?.map((lex) => ({
      label: lex.lectureTitle,
      value: lex.lectureId,
    })) || []),
  ];

  // 필터링된 학생 목록
  const getFilteredStudents = () => {
    if (!data?.lectures) return [];

    const studentsMap = new Map(); // 중복 학생 제거용 (Map 사용 시 enrollmentId 기준)

    data.lectures.forEach((lecture) => {
      // 선택된 클래스가 'ALL'이거나 현재 루프의 강의 ID와 같을 때만 처리
      if (selectedClassId === "ALL" || lecture.lectureId === selectedClassId) {
        lecture.students.forEach((student) => {
          // 검색어 필터링
          if (
            student.studentName
              .toLowerCase()
              .includes(studentSearchQuery.toLowerCase())
          ) {
            if (!studentsMap.has(student.enrollmentId)) {
              studentsMap.set(student.enrollmentId, {
                ...student,
                lectureTitle: lecture.lectureTitle, // UI 표시용 강의명 추가
              });
            }
          }
        });
      }
    });

    return Array.from(studentsMap.values());
  };

  const filteredStudents = getFilteredStudents();

  // 학생 선택 토글
  const toggleStudent = (studentId: string) => {
    onStudentIdsChange(
      selectedStudentIds.includes(studentId)
        ? selectedStudentIds.filter((id) => id !== studentId)
        : [...selectedStudentIds, studentId]
    );
  };

  // 전체 선택/해제
  const toggleAllStudents = () => {
    const allFilteredIds = filteredStudents.map((s) => s.enrollmentId);
    const areAllSelected = allFilteredIds.every((id) =>
      selectedStudentIds.includes(id)
    );
    if (areAllSelected) {
      onStudentIdsChange(
        selectedStudentIds.filter((id) => !allFilteredIds.includes(id))
      );
    } else {
      onStudentIdsChange(
        Array.from(new Set([...selectedStudentIds, ...allFilteredIds]))
      );
    }
  };

  // 알림 수신 대상 표시
  const renderTargetRole = (targetRole: TargetRole) => {
    const targetRoleLabel = {
      STUDENT: "학생",
      PARENT: "학부모",
      ALL: "학생 및 학부모",
    };
    return (
      <span className="text-xs text-muted-foreground">
        {targetRoleLabel[targetRole]}
      </span>
    );
  };

  if (isLoading)
    return <div className="p-10 text-center">데이터 로딩 중...</div>;

  return (
    <Card>
      <CardContent className="p-6 space-y-4">
        <h3 className="font-semibold text-lg">게시글 설정</h3>
        <p className="text-sm text-muted-foreground">
          게시글을 작성할 클래스와 알림을 받을 대상을 선택하세요.
        </p>

        {/* 클래스 선택 */}
        <div className="space-y-2">
          <Label className="text-base font-medium">클래스 선택</Label>
          <SelectBtn
            id="classSelect"
            value={selectedClassId}
            onChange={(value) => onClassIdChange(value)}
            placeholder="클래스를 선택하세요"
            optionSize="sm"
            className="text-base px-4 h-[58px] w-full my-2"
            options={classOptions}
          />
          <p className="text-xs text-muted-foreground">
            * 선택한 클래스의 학생들만 게시글을 확인할 수 있습니다.
          </p>
        </div>

        {/* 알림 수신 대상 */}
        <div className="space-y-2">
          <Label className="text-base font-medium">알림 수신 대상</Label>
          <SelectBtn
            id="recipientSelect"
            value={targetRole}
            onChange={(value) => onTargetRoleChange(value as TargetRole)}
            placeholder="알림 수신 대상 선택"
            optionSize="sm"
            className="h-[58px] w-full my-2"
            options={NOTICE_TYPE_OPTIONS}
          />
          <p className="text-xs text-muted-foreground">
            * 게시글 등록 알림을 받을 대상을 선택합니다.
          </p>
        </div>

        {/* 학생 검색 */}
        <div className="space-y-2">
          <Label className="text-base font-medium">학생 검색</Label>
          <Input
            className="h-14 w-full p-4 text-base placeholder:text-base my-2"
            placeholder="이름으로 검색해보세요"
            value={studentSearchQuery}
            onChange={(e) => setStudentSearchQuery(e.target.value)}
          />
        </div>

        {/* 학생 선택 */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-base font-medium">학생 선택</Label>
            {filteredStudents.length > 0 && (
              <Button
                variant="outline"
                onClick={toggleAllStudents}
                className="h-auto py-1 px-2 text-xs"
              >
                {filteredStudents.every((s) =>
                  selectedStudentIds.includes(s.enrollmentId)
                )
                  ? "전체 해제"
                  : "전체 선택"}
              </Button>
            )}
          </div>

          <div className="max-h-[350px] overflow-y-auto space-y-1.5 border rounded-md p-2">
            {filteredStudents.length > 0 ? (
              filteredStudents.map((student) => (
                <div
                  key={student.enrollmentId}
                  className={`px-4 py-3 border border-neutral-200 rounded-md text-sm cursor-pointer transition-colors ${
                    selectedStudentIds.includes(student.enrollmentId)
                      ? "bg-blue-50 border-blue-600 shadow-sm"
                      : "hover:bg-muted"
                  }`}
                  onClick={() => toggleStudent(student.enrollmentId)}
                >
                  <div className="flex flex-col justify-center">
                    <div className="flex items-center">
                      <p className="text-sm">{student.studentName}</p>
                      <p className="text-sm text-muted-foreground ml-2">
                        ({student.school} / {student.schoolYear})
                      </p>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {renderTargetRole(targetRole)}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground text-center py-4">
                검색 결과가 없습니다.
              </p>
            )}
          </div>

          {selectedStudentIds.length > 0 && (
            <p className="text-xs text-muted-foreground">
              {selectedStudentIds.length}명 선택되었습니다.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
