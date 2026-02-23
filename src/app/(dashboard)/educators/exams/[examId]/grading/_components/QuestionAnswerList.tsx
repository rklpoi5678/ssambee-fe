"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { GradingQuestion } from "@/types/grading";

type QuestionAnswerListProps = {
  questions: GradingQuestion[];
  examSubtitle: string;
  disabled?: boolean;
  onSelectObjectiveAnswer?: (questionNumber: number, answer: number) => void;
  onEssayAnswerChange?: (questionNumber: number, value: string) => void;
  onEssayCorrectChange?: (questionNumber: number, isCorrect: boolean) => void;
  onSaveAndNextAction?: () => void;
  canSaveAndNext?: boolean;
  onSelectPrevStudent?: () => void;
  onSelectNextStudent?: () => void;
};

const OBJECTIVE_CHOICES = [1, 2, 3, 4, 5] as const;

const resolveObjectiveDigit = (event: KeyboardEvent): number | null => {
  if (event.ctrlKey || event.metaKey || event.altKey) {
    return null;
  }

  if (/^[1-5]$/.test(event.key)) {
    return Number(event.key);
  }

  const numpadMatch = event.code.match(/^Numpad([1-5])$/);
  return numpadMatch ? Number(numpadMatch[1]) : null;
};

const isTextInputElement = (target: EventTarget | null) => {
  if (!(target instanceof HTMLElement)) return false;

  const tag = target.tagName;
  return (
    tag === "INPUT" ||
    tag === "TEXTAREA" ||
    tag === "SELECT" ||
    target.isContentEditable
  );
};

export function QuestionAnswerList({
  questions,
  examSubtitle,
  disabled = false,
  onSelectObjectiveAnswer,
  onEssayAnswerChange,
  onEssayCorrectChange,
  onSaveAndNextAction,
  canSaveAndNext = false,
  onSelectPrevStudent,
  onSelectNextStudent,
}: QuestionAnswerListProps) {
  const totalCount = questions.length;
  const [visibleCount, setVisibleCount] = useState(10);
  const displayedCount = Math.min(visibleCount, totalCount);
  const visibleQuestions = questions.slice(0, displayedCount);
  const objectiveQuestions = useMemo(
    () => questions.filter((question) => question.type === "객관식"),
    [questions]
  );
  const objectiveIndexByNumber = useMemo(
    () =>
      new Map(
        objectiveQuestions.map((question, index) => [question.number, index])
      ),
    [objectiveQuestions]
  );
  const [activeObjectiveIndex, setActiveObjectiveIndex] = useState(0);
  const resolvedActiveObjectiveIndex =
    objectiveQuestions.length === 0
      ? 0
      : Math.min(activeObjectiveIndex, objectiveQuestions.length - 1);
  const hasPendingObjectiveAnswers = useMemo(
    () => objectiveQuestions.some((question) => question.status === "미입력"),
    [objectiveQuestions]
  );
  const activeObjectiveQuestion =
    objectiveQuestions[resolvedActiveObjectiveIndex];

  const ensureQuestionVisible = useCallback(
    (questionNumber: number) => {
      const targetIndex = questions.findIndex(
        (question) => question.number === questionNumber
      );

      if (targetIndex < 0 || targetIndex < displayedCount) {
        return;
      }

      setVisibleCount((prev) =>
        Math.min(totalCount, Math.max(prev + 10, targetIndex + 1))
      );
    },
    [displayedCount, questions, totalCount]
  );

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (isTextInputElement(event.target)) {
        return;
      }

      if (event.key === "[" || event.key === "PageUp") {
        event.preventDefault();
        onSelectPrevStudent?.();
        return;
      }

      if (event.key === "]" || event.key === "PageDown") {
        event.preventDefault();
        onSelectNextStudent?.();
        return;
      }

      if (disabled || objectiveQuestions.length === 0) {
        return;
      }

      if (event.key === "ArrowUp") {
        event.preventDefault();
        const nextIndex = Math.max(resolvedActiveObjectiveIndex - 1, 0);
        setActiveObjectiveIndex(nextIndex);
        const targetQuestion = objectiveQuestions[nextIndex];
        if (targetQuestion) {
          ensureQuestionVisible(targetQuestion.number);
        }
        return;
      }

      if (event.key === "ArrowDown") {
        event.preventDefault();
        const nextIndex = Math.min(
          resolvedActiveObjectiveIndex + 1,
          objectiveQuestions.length - 1
        );
        setActiveObjectiveIndex(nextIndex);
        const targetQuestion = objectiveQuestions[nextIndex];
        if (targetQuestion) {
          ensureQuestionVisible(targetQuestion.number);
        }
        return;
      }

      const selectedNumber = resolveObjectiveDigit(event);
      if (selectedNumber !== null) {
        const questionNumber =
          objectiveQuestions[resolvedActiveObjectiveIndex]?.number;
        if (!questionNumber) return;

        event.preventDefault();
        onSelectObjectiveAnswer?.(questionNumber, selectedNumber);
        const nextIndex = Math.min(
          resolvedActiveObjectiveIndex + 1,
          objectiveQuestions.length - 1
        );
        setActiveObjectiveIndex(nextIndex);
        const targetQuestion = objectiveQuestions[nextIndex];
        if (targetQuestion) {
          ensureQuestionVisible(targetQuestion.number);
        }
        return;
      }

      if (
        event.key === "Enter" &&
        canSaveAndNext &&
        !hasPendingObjectiveAnswers
      ) {
        event.preventDefault();
        onSaveAndNextAction?.();
        return;
      }

      if (event.key === "Enter") {
        event.preventDefault();
        const nextIndex = Math.min(
          resolvedActiveObjectiveIndex + 1,
          objectiveQuestions.length - 1
        );
        setActiveObjectiveIndex(nextIndex);
        const targetQuestion = objectiveQuestions[nextIndex];
        if (targetQuestion) {
          ensureQuestionVisible(targetQuestion.number);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    disabled,
    canSaveAndNext,
    hasPendingObjectiveAnswers,
    objectiveQuestions,
    resolvedActiveObjectiveIndex,
    ensureQuestionVisible,
    onSaveAndNextAction,
    onSelectNextStudent,
    onSelectObjectiveAnswer,
    onSelectPrevStudent,
  ]);

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 10, totalCount));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-lg font-semibold">문항별 답안 입력</h2>
          <p className="text-xs text-muted-foreground">
            단축키: 1~5 입력 · ↑/↓ 문항 이동 · [ / ] 학생 이동 · Enter 저장+다음
            학생
          </p>
        </div>
        <p className="text-sm text-muted-foreground">{examSubtitle}</p>
      </div>

      <div className="space-y-3">
        {visibleQuestions.map((question) => {
          const statusText =
            question.status === "미입력"
              ? question.type === "객관식"
                ? `미입력 정답 ${question.correctAnswer}`
                : "미입력"
              : question.status === "오답"
                ? "오답"
                : "정답";
          const isEssayCorrect = question.status === "정답";
          const isEssayIncorrect = question.status === "오답";
          const essayAnswer =
            typeof question.studentAnswer === "string"
              ? question.studentAnswer
              : "";
          const hasEssayAnswer = essayAnswer.trim().length > 0;

          return (
            <Card
              key={question.id}
              className={
                question.type === "객관식" &&
                activeObjectiveQuestion?.number === question.number
                  ? "ring-2 ring-indigo-300 border-indigo-300"
                  : undefined
              }
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  {/* 문항 번호 */}
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-medium">
                    {question.number}
                  </div>

                  {/* 문항 정보 */}
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{question.title}</p>
                      <span className="text-sm text-muted-foreground">
                        {question.type} · {question.score}점
                      </span>
                    </div>

                    {/* 답안 선택 버튼 (객관식) */}
                    {question.type === "객관식" && (
                      <div className="flex gap-2">
                        {OBJECTIVE_CHOICES.map((num) => (
                          <button
                            key={num}
                            type="button"
                            className={`w-10 h-10 rounded border-2 font-medium transition-colors ${
                              question.studentAnswer === num
                                ? "bg-primary border-primary text-primary-foreground"
                                : "bg-background border-input hover:bg-accent"
                            } disabled:opacity-50 disabled:cursor-not-allowed`}
                            onClick={() => {
                              const nextIndex = objectiveIndexByNumber.get(
                                question.number
                              );
                              if (nextIndex !== undefined) {
                                setActiveObjectiveIndex(nextIndex);
                              }
                              onSelectObjectiveAnswer?.(question.number, num);
                            }}
                            disabled={disabled}
                          >
                            {num}
                          </button>
                        ))}
                      </div>
                    )}

                    {question.type === "주관식" && (
                      <div className="space-y-2">
                        <Input
                          value={essayAnswer}
                          onChange={(event) =>
                            onEssayAnswerChange?.(
                              question.number,
                              event.target.value
                            )
                          }
                          placeholder="학생 답안을 입력하세요"
                          disabled={disabled}
                        />
                        <div className="flex gap-2">
                          <Button
                            type="button"
                            variant={isEssayCorrect ? "default" : "outline"}
                            onClick={() =>
                              onEssayCorrectChange?.(question.number, true)
                            }
                            disabled={disabled || !hasEssayAnswer}
                          >
                            정답
                          </Button>
                          <Button
                            type="button"
                            variant={isEssayIncorrect ? "default" : "outline"}
                            onClick={() =>
                              onEssayCorrectChange?.(question.number, false)
                            }
                            disabled={disabled || !hasEssayAnswer}
                          >
                            오답
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* 상태 표시 */}
                  <div className="flex-shrink-0 text-right">
                    {question.status === "오답" ? (
                      <div className="space-y-1">
                        <span className="inline-block px-2 py-1 rounded bg-red-500/20 text-red-600 text-xs font-medium">
                          오답
                        </span>
                        <p className="text-xs text-muted-foreground">
                          정답 {question.correctAnswer}
                        </p>
                      </div>
                    ) : (
                      <p className="text-xs text-muted-foreground">
                        {statusText}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* 더보기 버튼 */}
      <div className="flex justify-center pt-2">
        <Button
          variant="outline"
          className="gap-2"
          onClick={handleLoadMore}
          disabled={displayedCount >= totalCount}
        >
          더보기 ({displayedCount}/{totalCount})
          <ChevronDown className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
