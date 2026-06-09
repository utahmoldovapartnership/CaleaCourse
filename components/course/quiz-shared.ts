export type QuizPhase = "question" | "complete";

export type QuizLayoutVariant = "studio" | "classic";

export const demoAnswers = [
  { id: "a", label: "n + 5" },
  { id: "correct", label: "5 + n" },
  { id: "c", label: "5n" },
  { id: "d", label: "n - 5" },
];

export const choiceLetters = ["A", "B", "C", "D"];

export type QuizSession = {
  courseTitle: string;
  chapterTitle: string;
  questionTotal: number;
  question: string | null;
  questionIndex: number;
  phase: QuizPhase;
  selected: string | null;
  submitted: boolean;
  isCorrect: boolean;
  progress: number;
  correctCount: number;
  accuracy: number;
  choiceClass: (answerId: string) => string;
  handleCheckAnswer: () => void;
  handleContinue: () => void;
  handleTryAgain: () => void;
  handleRestart: () => void;
  setSelected: (id: string) => void;
};
