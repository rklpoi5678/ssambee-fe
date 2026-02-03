"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Lecture, LectureStatus } from "@/types/lectures";

import { LectureDetailStudents } from "./LectureDetailStudents";
import { LectureDetailHeader } from "./LectureDetailHeader";
import { LectureDetailEditForm } from "./LectureDetailEditForm";
import { LectureDetailReadOnly } from "./LectureDetailReadOnly";
import { useLectureDetailModal } from "./_hooks/useLectureDetailModal";

type LectureDetailModalProps = {
  lecture: Lecture | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function LectureDetailModal({
  lecture,
  open,
  onOpenChange,
}: LectureDetailModalProps) {
  const {
    mergedLecture,
    studentList,
    currentStudents,
    isLectureLoading,
    isEditing,
    setIsEditing,
    resetEditState,
    editTitle,
    editSubject,
    editGrade,
    editStatus,
    editStartDate,
    editInstructor,
    editTimes,
    subjectOptions,
    gradeOptions,
    statusOptions,
    dayOptions,
    scheduleSummary,
    setEditTitle,
    setEditSubject,
    setEditGrade,
    setEditStatus,
    setEditStartDate,
    handleEditStart,
    handleEditCancel,
    handleSaveEdit,
    handleAddSchedule,
    handleRemoveSchedule,
    handleScheduleChange,
  } = useLectureDetailModal({ lecture, open });

  if (!lecture) return null;

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        resetEditState();
        setIsEditing(false);
        onOpenChange(nextOpen);
      }}
    >
      <DialogContent className="max-w-3xl" showClose={false}>
        <LectureDetailHeader
          isEditing={isEditing}
          onSave={handleSaveEdit}
          onCancel={handleEditCancel}
          onEditStart={handleEditStart}
          onClose={() => onOpenChange(false)}
        />

        <div className="space-y-6">
          {isEditing ? (
            <LectureDetailEditForm
              editTitle={editTitle}
              editSubject={editSubject}
              editGrade={editGrade}
              editStatus={editStatus}
              editStartDate={editStartDate}
              editInstructor={editInstructor}
              editTimes={editTimes}
              currentStudents={currentStudents}
              subjectOptions={subjectOptions}
              gradeOptions={gradeOptions}
              statusOptions={statusOptions}
              dayOptions={dayOptions}
              onTitleChange={setEditTitle}
              onSubjectChange={setEditSubject}
              onGradeChange={setEditGrade}
              onStatusChange={(value) => setEditStatus(value as LectureStatus)}
              onStartDateChange={setEditStartDate}
              onScheduleAdd={handleAddSchedule}
              onScheduleRemove={handleRemoveSchedule}
              onScheduleChange={handleScheduleChange}
            />
          ) : (
            <LectureDetailReadOnly
              lecture={mergedLecture}
              currentStudents={currentStudents}
              scheduleSummary={scheduleSummary()}
              subjectOverride={editSubject}
              gradeOverride={editGrade}
              statusOverride={editStatus}
              startDateOverride={editStartDate}
              instructorOverride={editInstructor}
            />
          )}

          {isEditing ? null : (
            <>
              {/* 등록 학생 목록 */}
              {isLectureLoading ? (
                <div className="rounded-lg border px-3 py-4 text-sm text-muted-foreground">
                  학생 목록 불러오는 중...
                </div>
              ) : (
                <LectureDetailStudents students={studentList} />
              )}
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
