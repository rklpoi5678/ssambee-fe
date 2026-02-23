"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { LectureEnrollmentDetail } from "@/types/students.type";
import { formatYMDFromISO } from "@/utils/date";

type ExamListTableProps = {
  exams: LectureEnrollmentDetail["grades"];
  selectedExamIds: string[];
  onSelectExam: (examId: string) => void;
  onOpenDetail: (examItem: LectureEnrollmentDetail["grades"][number]) => void;
};

export default function ExamListTable({
  exams,
  selectedExamIds,
  onSelectExam,
  onOpenDetail,
}: ExamListTableProps) {
  const [visibleCount, setVisibleCount] = useState(5);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 5);
  };

  return (
    <div className="space-y-4 text-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>시험명</TableHead>
            <TableHead>시험일</TableHead>
            <TableHead className="text-center">과목</TableHead>
            <TableHead className="text-center">점수</TableHead>
            <TableHead className="text-center">학급 평균</TableHead>
            <TableHead className="text-center">학급 석차</TableHead>
            <TableHead className="text-right">상세</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {exams.slice(0, visibleCount).map((data) => {
            const { exam, grade } = data;
            const examKey = `${exam.title}-${exam.examDate}`;
            const isSelected = selectedExamIds.includes(examKey);

            return (
              <TableRow
                key={examKey}
                className={`cursor-pointer hover:bg-muted/50 ${
                  isSelected ? "bg-primary/10" : ""
                }`}
                onClick={() => onSelectExam(examKey)}
              >
                <TableCell className="font-medium">{exam.title}</TableCell>
                <TableCell>{formatYMDFromISO(exam.examDate)}</TableCell>
                <TableCell className="text-center">{exam.subject}</TableCell>
                <TableCell className="text-center font-semibold">
                  {grade.score}점
                </TableCell>
                <TableCell className="text-center">{exam.average}점</TableCell>
                <TableCell className="text-center">
                  {grade.rank}등 / {exam.totalExaminees}명
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="outline"
                    className="h-8 px-3 text-xs"
                    onClick={(event) => {
                      event.stopPropagation();
                      onOpenDetail(data);
                    }}
                    aria-label={`${exam.title} 상세보기`}
                  >
                    상세보기
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      {visibleCount < exams.length && (
        <div className="flex justify-center">
          <Button variant="outline" onClick={handleLoadMore}>
            더보기 ({exams.length - visibleCount})
          </Button>
        </div>
      )}
    </div>
  );
}
