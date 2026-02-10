"use client";

import { useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { LectureEnrollmentDetail } from "@/types/students.type";
import { formatYMDFromISO } from "@/utils/date";

type ExamListTableProps = {
  exams: LectureEnrollmentDetail["grades"];
  selectedExamIds: string[];
  onSelectExam: (examId: string) => void;
};

export default function ExamListTable({
  exams,
  selectedExamIds,
  onSelectExam,
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
          </TableRow>
        </TableHeader>
        <TableBody>
          {exams.slice(0, visibleCount).map((data) => {
            const { exam, grade } = data;
            const examKey = `${exam.title}-${exam.examDate}-${exam.subject}`;
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
