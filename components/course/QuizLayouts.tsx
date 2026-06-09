"use client";

import Image from "next/image";
import Link from "next/link";
import { type ReactNode } from "react";
import {
  HiOutlineArrowLeft,
  HiOutlineCheckCircle,
  HiOutlineXCircle,
} from "react-icons/hi";
import { Tag } from "@/components/marketing/Marketing";
import { Button, LinkButton } from "@/components/ui/Button";
import { ProgressBar } from "@/components/ui/ProgressBar";
import {
  choiceLetters,
  demoAnswers,
  type QuizSession,
} from "./quiz-shared";

type QuizShellProps = {
  exitHref: string;
  exitLabel: string;
  preview?: boolean;
  quiz: QuizSession;
};

export function QuizEmptyState({
  exitHref,
  exitLabel,
  preview,
  previewBanner,
}: {
  exitHref: string;
  exitLabel: string;
  preview?: boolean;
  previewBanner?: ReactNode;
}) {
  return (
    <div className="quiz-view">
      {previewBanner}
      <div className="quiz-page">
        {!preview && <QuizExitLink href={exitHref}>{exitLabel}</QuizExitLink>}
        <div className="editor-empty mt-6">
          <p className="editor-empty-title">Nothing to preview yet</p>
          <p className="editor-empty-text">
            Add at least one chapter with a question in the editor, then return here.
          </p>
          <LinkButton href={exitHref} size="sm" className="mt-6">
            {preview ? "Back to editor" : exitLabel.replace(/^←\s*/, "")}
          </LinkButton>
        </div>
      </div>
    </div>
  );
}

export function QuizCompleteState({
  exitHref,
  exitLabel,
  preview,
  quiz,
  previewBanner,
}: QuizShellProps & { previewBanner?: ReactNode }) {
  return (
    <div className="quiz-view">
      {previewBanner}
      <div className="quiz-page quiz-page--centered">
        {!preview && <QuizExitLink href={exitHref}>{exitLabel}</QuizExitLink>}
        <div className="quiz-result-card surface-card">
          <Tag solid>Chapter complete</Tag>
          <Image
            src="/assets/illustrations/stacked-books-cap.svg"
            alt=""
            width={200}
            height={160}
            className="quiz-result-image"
          />
          <h2 className="quiz-result-title">You finished {quiz.chapterTitle}</h2>
          <p className="quiz-result-stat accent-text">{quiz.accuracy}% accuracy</p>
          <p className="quiz-result-text">
            You got {quiz.correctCount} of {quiz.questionTotal} questions correct.
          </p>
          <div className="quiz-result-actions">
            <Button size="lg" onClick={quiz.handleRestart}>
              Practice again
            </Button>
            <LinkButton href={exitHref} variant="secondary" size="lg">
              {preview ? "Back to editor" : "My courses"}
            </LinkButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export function QuizLayoutClassic({
  exitHref,
  exitLabel,
  preview,
  quiz,
}: QuizShellProps) {
  const {
    chapterTitle,
    question,
    questionIndex,
    questionTotal,
    submitted,
    isCorrect,
    progress,
    choiceClass,
    handleCheckAnswer,
    handleContinue,
    handleTryAgain,
    setSelected,
  } = quiz;

  return (
    <div className="quiz-view">
      {preview && <PreviewBanner exitHref={exitHref} />}

      <header className="quiz-header">
        <div className={`quiz-header-inner ${preview ? "quiz-header-inner--preview" : ""}`}>
          {!preview && (
            <QuizExitLink href={exitHref} compact>
              Exit
            </QuizExitLink>
          )}
          <span className="quiz-step">
            {questionIndex + 1} / {questionTotal}
          </span>
        </div>
        <div className="quiz-header-inner">
          <ProgressBar value={progress} large className="quiz-header-progress" />
        </div>
      </header>

      <main className={`quiz-main ${submitted ? "quiz-main--answered" : ""}`}>
        <div className="quiz-card surface-card">
          <p className="quiz-chapter-ref">{chapterTitle}</p>
          <h1 className="quiz-question">{question}</h1>

          <QuizChoices
            submitted={submitted}
            selected={quiz.selected}
            choiceClass={choiceClass}
            onSelect={setSelected}
          />
        </div>
      </main>

      <QuizActionBar quiz={quiz} onCheck={handleCheckAnswer} onContinue={handleContinue} onTryAgain={handleTryAgain} />
    </div>
  );
}

export function QuizLayoutStudio({
  exitHref,
  preview,
  quiz,
}: Omit<QuizShellProps, "exitLabel">) {
  const {
    chapterTitle,
    question,
    questionIndex,
    questionTotal,
    submitted,
    choiceClass,
    handleCheckAnswer,
    handleContinue,
    handleTryAgain,
    setSelected,
  } = quiz;

  return (
    <div className="quiz-studio-view">
      {preview && <PreviewBanner exitHref={exitHref} />}

      <header className="quiz-studio-top">
        <div className="quiz-studio-top-inner">
          {!preview && (
            <div className="quiz-studio-top-row">
              <QuizExitLink href={exitHref} compact>
                Exit
              </QuizExitLink>
            </div>
          )}
          <div className="quiz-studio-meta-row">
            <p className="quiz-studio-chapter">{chapterTitle}</p>
            <span className="quiz-studio-step">
              {questionIndex + 1} / {questionTotal}
            </span>
          </div>
          <QuizSegmentBar
            total={questionTotal}
            current={questionIndex}
            submitted={submitted}
          />
        </div>
      </header>

      <main className={`quiz-studio-main ${submitted ? "quiz-studio-main--answered" : ""}`}>
        <div className="quiz-studio-content">
          <h1 className="quiz-studio-question">{question}</h1>

          <div className="quiz-studio-choices surface-card">
            <QuizChoices
              submitted={submitted}
              selected={quiz.selected}
              choiceClass={choiceClass}
              onSelect={setSelected}
              stacked
            />
          </div>
        </div>
      </main>

      <QuizActionBar
        quiz={quiz}
        onCheck={handleCheckAnswer}
        onContinue={handleContinue}
        onTryAgain={handleTryAgain}
        variant="studio"
      />
    </div>
  );
}

function QuizSegmentBar({
  total,
  current,
  submitted,
}: {
  total: number;
  current: number;
  submitted: boolean;
}) {
  return (
    <div
      className="quiz-studio-segments"
      role="progressbar"
      aria-valuenow={current + (submitted ? 1 : 0)}
      aria-valuemin={0}
      aria-valuemax={total}
      aria-label={`Question ${current + 1} of ${total}`}
    >
      {Array.from({ length: total }, (_, index) => {
        const isPast = index < current || (index === current && submitted);
        const isCurrent = index === current && !submitted;
        return (
          <span
            key={index}
            className={`quiz-studio-segment ${isPast ? "quiz-studio-segment--done" : ""} ${isCurrent ? "quiz-studio-segment--current" : ""}`}
          />
        );
      })}
    </div>
  );
}

function QuizChoices({
  submitted,
  selected,
  choiceClass,
  onSelect,
  stacked = false,
}: {
  submitted: boolean;
  selected: string | null;
  choiceClass: (id: string) => string;
  onSelect: (id: string) => void;
  stacked?: boolean;
}) {
  return (
    <div
      className={stacked ? "quiz-studio-choice-list" : "quiz-choices"}
      role="group"
      aria-label="Answer choices"
    >
      {demoAnswers.map((answer, index) => (
        <button
          key={answer.id}
          type="button"
          disabled={submitted}
          onClick={() => onSelect(answer.id)}
          className={`quiz-choice ${choiceClass(answer.id)}`}
          aria-pressed={selected === answer.id}
        >
          <span className="quiz-choice-letter">{choiceLetters[index]}</span>
          <span className="quiz-choice-text">{answer.label}</span>
          {submitted && answer.id === "correct" && (
            <HiOutlineCheckCircle className="quiz-choice-icon" aria-hidden="true" />
          )}
          {submitted && answer.id === selected && answer.id !== "correct" && (
            <HiOutlineXCircle className="quiz-choice-icon" aria-hidden="true" />
          )}
        </button>
      ))}
    </div>
  );
}

function QuizFeedbackPanel({
  isCorrect,
  className = "",
}: {
  isCorrect: boolean;
  className?: string;
}) {
  return (
    <div
      className={`quiz-action-feedback ${isCorrect ? "quiz-action-feedback--success" : "quiz-action-feedback--error"} ${className}`}
      role="status"
    >
      {isCorrect ? (
        <>
          <HiOutlineCheckCircle className="quiz-action-feedback-icon" aria-hidden="true" />
          <div>
            <p className="quiz-action-feedback-title">Correct — nice work!</p>
            <p className="quiz-action-feedback-text">
              Both n + 5 and 5 + n are equivalent expressions.
            </p>
          </div>
        </>
      ) : (
        <>
          <HiOutlineXCircle className="quiz-action-feedback-icon" aria-hidden="true" />
          <div>
            <p className="quiz-action-feedback-title">Not quite</p>
            <p className="quiz-action-feedback-text">
              The correct answer is <strong>5 + n</strong>. Addition is commutative, so
              order does not change the value.
            </p>
          </div>
        </>
      )}
    </div>
  );
}

function QuizActionBar({
  quiz,
  onCheck,
  onContinue,
  onTryAgain,
  variant = "default",
}: {
  quiz: QuizSession;
  onCheck: () => void;
  onContinue: () => void;
  onTryAgain: () => void;
  variant?: "default" | "studio";
}) {
  const { submitted, isCorrect, selected, questionIndex, questionTotal } = quiz;
  const barClass =
    variant === "studio"
      ? `quiz-studio-dock ${submitted ? "quiz-studio-dock--feedback" : ""}`
      : `quiz-action-bar ${submitted ? "quiz-action-bar--feedback" : ""}`;

  const checkHint =
    questionIndex === 0
      ? !selected
        ? "Select an answer to continue."
        : "Tap check answer when you are ready."
      : null;

  const content = (
    <>
      {submitted && <QuizFeedbackPanel isCorrect={isCorrect} />}

      {!submitted ? (
        <>
          <Button size="lg" fullWidth disabled={!selected} onClick={onCheck}>
            Check answer
          </Button>
          {checkHint && <p className="quiz-action-hint">{checkHint}</p>}
        </>
      ) : isCorrect ? (
        <Button size="lg" fullWidth onClick={onContinue}>
          {questionIndex + 1 >= questionTotal ? "Finish chapter" : "Next question →"}
        </Button>
      ) : (
        <div className="quiz-action-split">
          <Button variant="secondary" size="lg" fullWidth onClick={onTryAgain}>
            Try again
          </Button>
          <Button size="lg" fullWidth onClick={onContinue}>
            {questionIndex + 1 >= questionTotal ? "Finish chapter" : "Continue →"}
          </Button>
        </div>
      )}
    </>
  );

  return (
    <footer className={barClass}>
      {variant === "studio" ? (
        <div className="quiz-studio-dock-inner">{content}</div>
      ) : (
        content
      )}
    </footer>
  );
}

export function PreviewBanner({ exitHref }: { exitHref: string }) {
  return (
    <div className="preview-banner">
      <span className="preview-banner-text">
        Preview mode — this is how students will see your course
      </span>
      <Link href={exitHref} className="preview-banner-link">
        <HiOutlineArrowLeft className="preview-banner-icon" aria-hidden="true" />
        Back to editor
      </Link>
    </div>
  );
}

function stripExitArrow(label: ReactNode): ReactNode {
  return typeof label === "string" ? label.replace(/^←\s*/, "") : label;
}

function QuizExitLink({
  href,
  children,
  compact = false,
}: {
  href: string;
  children: ReactNode;
  compact?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`quiz-exit-link ${compact ? "quiz-exit-link--compact" : ""}`}
    >
      <HiOutlineArrowLeft className="quiz-exit-icon" aria-hidden="true" />
      {stripExitArrow(children)}
    </Link>
  );
}
