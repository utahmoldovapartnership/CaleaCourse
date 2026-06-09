"use client";

import { notFound, useSearchParams } from "next/navigation";
import { useApp } from "@/components/providers/AppProvider";
import {
  QuizCompleteState,
  QuizEmptyState,
  QuizLayoutClassic,
  QuizLayoutStudio,
  PreviewBanner,
} from "./QuizLayouts";
import { type QuizLayoutVariant } from "./quiz-shared";
import { useQuizSession } from "./useQuizSession";

type CoursePracticeViewProps = {
  courseId: string;
  exitHref: string;
  exitLabel: string;
  preview?: boolean;
  layout?: QuizLayoutVariant;
};

export function CoursePracticeView({
  courseId,
  exitHref,
  exitLabel,
  preview = false,
  layout: layoutProp,
}: CoursePracticeViewProps) {
  const { ready, getCourse } = useApp();
  const course = getCourse(courseId);
  const quiz = useQuizSession(course);
  const searchParams = useSearchParams();

  const layout: QuizLayoutVariant =
    layoutProp ??
    (searchParams.get("layout") === "classic" ? "classic" : "studio");

  if (!ready) return null;
  if (!course || !quiz) notFound();

  const chapter = course.chapters[0];
  const questionTotal = chapter?.questions.length ?? 0;

  if (!chapter || questionTotal === 0) {
    return (
      <QuizEmptyState
        exitHref={exitHref}
        exitLabel={exitLabel}
        preview={preview}
        previewBanner={preview ? <PreviewBanner exitHref={exitHref} /> : undefined}
      />
    );
  }

  if (quiz.phase === "complete") {
    return (
      <QuizCompleteState
        exitHref={exitHref}
        exitLabel={exitLabel}
        preview={preview}
        quiz={quiz}
        previewBanner={preview ? <PreviewBanner exitHref={exitHref} /> : undefined}
      />
    );
  }

  if (layout === "classic") {
    return (
      <QuizLayoutClassic
        exitHref={exitHref}
        exitLabel={exitLabel}
        preview={preview}
        quiz={quiz}
      />
    );
  }

  return (
    <QuizLayoutStudio exitHref={exitHref} preview={preview} quiz={quiz} />
  );
}
