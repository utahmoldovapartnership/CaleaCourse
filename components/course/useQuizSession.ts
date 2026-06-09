"use client";

import { useState } from "react";
import type { CourseRecord } from "@/components/providers/AppProvider";
import { type QuizPhase, type QuizSession } from "./quiz-shared";

export function useQuizSession(course: CourseRecord | undefined): QuizSession | null {
  const [phase, setPhase] = useState<QuizPhase>("question");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);

  if (!course) return null;

  const chapter = course.chapters[0];
  const questionTotal = chapter?.questions.length ?? 0;
  const question = chapter?.questions[questionIndex] ?? null;
  const isCorrect = selected === "correct";
  const progress =
    questionTotal > 0
      ? Math.round(((questionIndex + (submitted ? 1 : 0)) / questionTotal) * 100)
      : 0;
  const accuracy =
    questionTotal > 0 ? Math.round((correctCount / questionTotal) * 100) : 0;

  function handleCheckAnswer() {
    if (!selected || submitted) return;
    setSubmitted(true);
    if (selected === "correct") {
      setCorrectCount((count) => count + 1);
    }
  }

  function handleContinue() {
    if (questionIndex + 1 >= questionTotal) {
      setPhase("complete");
      return;
    }
    setQuestionIndex((index) => index + 1);
    setSelected(null);
    setSubmitted(false);
  }

  function handleTryAgain() {
    setSelected(null);
    setSubmitted(false);
  }

  function handleRestart() {
    setPhase("question");
    setQuestionIndex(0);
    setSelected(null);
    setSubmitted(false);
    setCorrectCount(0);
  }

  function choiceClass(answerId: string) {
    if (!submitted) {
      return selected === answerId ? "quiz-choice--selected" : "";
    }
    if (answerId === "correct") return "quiz-choice--correct";
    if (answerId === selected && answerId !== "correct") return "quiz-choice--wrong";
    return "quiz-choice--dimmed";
  }

  return {
    courseTitle: course.title,
    chapterTitle: chapter?.title ?? "",
    questionTotal,
    question,
    questionIndex,
    phase,
    selected,
    submitted,
    isCorrect,
    progress,
    correctCount,
    accuracy,
    choiceClass,
    handleCheckAnswer,
    handleContinue,
    handleTryAgain,
    handleRestart,
    setSelected,
  };
}
