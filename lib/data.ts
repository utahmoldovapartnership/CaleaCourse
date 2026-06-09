export type Course = {
  id: string;
  title: string;
  chapters: number;
  questions: number;
  accuracy: number;
  description?: string;
};

export type Student = {
  id: string;
  name: string;
  initials: string;
  className: string;
  lastActive: string;
  accuracy: number;
  avatarColor: string;
};

export type Chapter = {
  id: string;
  title: string;
  questionCount: number;
  questions: string[];
};

export const courses: Course[] = [
  {
    id: "algebra",
    title: "Introduction to Algebra",
    chapters: 5,
    questions: 42,
    accuracy: 78,
    description:
      "Build a strong foundation in algebraic thinking — variables, equations, and problem solving for middle school learners.",
  },
  {
    id: "history",
    title: "World History: Ancient Civilizations",
    chapters: 8,
    questions: 64,
    accuracy: 65,
    description:
      "Explore Mesopotamia, Egypt, Greece, and Rome through guided practice and primary-source prompts.",
  },
  {
    id: "writing",
    title: "Creative Writing Basics",
    chapters: 3,
    questions: 24,
    accuracy: 92,
    description:
      "Develop voice, structure, and revision habits with short writing exercises and feedback loops.",
  },
];

export const students: Student[] = [
  {
    id: "1",
    name: "Maya Chen",
    initials: "MC",
    className: "Period 2 Algebra",
    lastActive: "Today",
    accuracy: 92,
    avatarColor: "var(--color-pink-soft)",
  },
  {
    id: "2",
    name: "Jordan Lee",
    initials: "JL",
    className: "Period 2 Algebra",
    lastActive: "Today",
    accuracy: 78,
    avatarColor: "var(--color-green-soft)",
  },
  {
    id: "3",
    name: "Sam Rivera",
    initials: "SR",
    className: "World History",
    lastActive: "Yesterday",
    accuracy: 65,
    avatarColor: "var(--color-blue-soft)",
  },
  {
    id: "4",
    name: "Alex Kim",
    initials: "AK",
    className: "World History",
    lastActive: "Today",
    accuracy: 88,
    avatarColor: "var(--color-yellow-soft)",
  },
  {
    id: "5",
    name: "Riley Brooks",
    initials: "RB",
    className: "Creative Writing",
    lastActive: "Today",
    accuracy: 95,
    avatarColor: "var(--color-orange-soft)",
  },
  {
    id: "6",
    name: "Taylor Nguyen",
    initials: "TN",
    className: "Period 2 Algebra",
    lastActive: "3 days ago",
    accuracy: 71,
    avatarColor: "var(--color-pink-soft)",
  },
  {
    id: "7",
    name: "Emma Patel",
    initials: "EP",
    className: "Creative Writing",
    lastActive: "Today",
    accuracy: 84,
    avatarColor: "var(--color-green-soft)",
  },
  {
    id: "8",
    name: "Devon Williams",
    initials: "DW",
    className: "World History",
    lastActive: "Yesterday",
    accuracy: 59,
    avatarColor: "var(--color-blue-soft)",
  },
];

export const algebraChapters: Chapter[] = [
  {
    id: "ch1",
    title: "Chapter 1: Variables and Expressions",
    questionCount: 8,
    questions: [
      "What is a variable?",
      "Evaluate 3x + 2 when x = 4",
      'Write an expression for "5 more than a number"',
    ],
  },
  {
    id: "ch2",
    title: "Chapter 2: Solving Equations",
    questionCount: 12,
    questions: [
      "Solve for x: x + 7 = 15",
      "Solve for y: 2y - 3 = 11",
    ],
  },
  {
    id: "ch3",
    title: "Chapter 3: Word Problems",
    questionCount: 6,
    questions: ["A store sells apples for $2 each..."],
  },
];

export const classFilters = [
  "All classes",
  "Period 2 Algebra",
  "World History",
  "Creative Writing",
];

export function getCourse(id: string) {
  return courses.find((c) => c.id === id);
}
