"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  algebraChapters,
  courses as seedCourses,
  students as seedStudents,
  type Chapter,
  type Course,
  type Student,
} from "@/lib/data";
import {
  clearSession,
  deriveInitials,
  deriveNameFromEmail,
  getSession,
  setSession,
  updateSession,
  type Session,
} from "@/lib/session";
import { generateId, slugify, uniqueSlug } from "@/lib/utils";
import { isValidInviteCode } from "@/lib/invite";

export type CourseRecord = {
  id: string;
  title: string;
  description: string;
  accuracy: number;
  chapters: Chapter[];
};

type AppData = {
  courses: CourseRecord[];
  students: Student[];
};

type AppContextValue = {
  ready: boolean;
  session: Session | null;
  courses: CourseRecord[];
  students: Student[];
  signIn: (email: string) => void;
  registerAccount: (input: { name: string; email: string }) => void;
  joinWithCode: (input: {
    code: string;
    name: string;
    email: string;
  }) => { ok: true } | { ok: false; error: string };
  setRole: (role: Session["role"]) => void;
  updateProfile: (partial: Pick<Session, "name" | "email">) => void;
  signOut: () => void;
  getCourse: (id: string) => CourseRecord | undefined;
  getCourseSummary: (course: CourseRecord) => Course;
  createCourse: (input: { title: string; description: string }) => CourseRecord;
  updateCourse: (
    id: string,
    input: Partial<Pick<CourseRecord, "title" | "description" | "accuracy">>,
  ) => void;
  deleteCourse: (id: string) => void;
  addChapter: (courseId: string, title: string) => string;
  updateChapter: (courseId: string, chapterId: string, title: string) => void;
  deleteChapter: (courseId: string, chapterId: string) => void;
  addQuestion: (courseId: string, chapterId: string, text: string) => void;
  updateQuestion: (
    courseId: string,
    chapterId: string,
    questionIndex: number,
    text: string,
  ) => void;
  deleteQuestion: (courseId: string, chapterId: string, questionIndex: number) => void;
  getStudent: (id: string) => Student | undefined;
  createStudent: (input: {
    name: string;
    className: string;
    accuracy?: number;
  }) => Student;
  updateStudent: (
    id: string,
    input: Partial<Pick<Student, "name" | "className" | "accuracy" | "lastActive">>,
  ) => void;
  deleteStudent: (id: string) => void;
  classFilters: string[];
};

const STORAGE_KEY = "calea-app-data";

const AppContext = createContext<AppContextValue | null>(null);

function defaultChapterForCourse(courseId: string): Chapter[] {
  if (courseId === "algebra") {
    return algebraChapters.map((chapter) => ({
      ...chapter,
      questionCount: chapter.questions.length,
    }));
  }
  return [
    {
      id: "ch1",
      title: "Chapter 1: Getting started",
      questionCount: 2,
      questions: ["Sample question 1", "Sample question 2"],
    },
  ];
}

function seedData(): AppData {
  return {
    courses: seedCourses.map((course) => ({
      id: course.id,
      title: course.title,
      description: course.description ?? "",
      accuracy: course.accuracy,
      chapters: defaultChapterForCourse(course.id),
    })),
    students: seedStudents.map((student) => ({ ...student })),
  };
}

function loadData(): AppData {
  if (typeof window === "undefined") return seedData();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return seedData();
    const parsed = JSON.parse(raw) as AppData;
    if (!parsed.courses?.length || !parsed.students?.length) return seedData();
    return parsed;
  } catch {
    return seedData();
  }
}

function persistData(data: AppData) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function syncChapterCounts(chapters: Chapter[]): Chapter[] {
  return chapters.map((chapter) => ({
    ...chapter,
    questionCount: chapter.questions.length,
  }));
}

function toCourseSummary(course: CourseRecord): Course {
  const questions = course.chapters.reduce((sum, ch) => sum + ch.questions.length, 0);
  return {
    id: course.id,
    title: course.title,
    description: course.description,
    chapters: course.chapters.length,
    questions,
    accuracy: course.accuracy,
  };
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [session, setSessionState] = useState<Session | null>(null);
  const [data, setData] = useState<AppData>(seedData);

  useEffect(() => {
    setData(loadData());
    setSessionState(getSession());
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) persistData(data);
  }, [data, ready]);

  const mutateCourses = useCallback(
    (updater: (courses: CourseRecord[]) => CourseRecord[]) => {
      setData((prev) => ({ ...prev, courses: updater(prev.courses) }));
    },
    [],
  );

  const mutateStudents = useCallback(
    (updater: (students: Student[]) => Student[]) => {
      setData((prev) => ({ ...prev, students: updater(prev.students) }));
    },
    [],
  );

  const signIn = useCallback((email: string) => {
    const name = deriveNameFromEmail(email);
    const next: Session = {
      email,
      name,
      initials: deriveInitials(name),
      role: "teacher",
    };
    setSession(next);
    setSessionState(next);
  }, []);

  const registerAccount = useCallback((input: { name: string; email: string }) => {
    const next: Session = {
      email: input.email,
      name: input.name,
      initials: deriveInitials(input.name),
      role: "teacher",
    };
    setSession(next);
    setSessionState(next);
  }, []);

  const joinWithCode = useCallback(
    (input: { code: string; name: string; email: string }) => {
      if (!isValidInviteCode(input.code)) {
        return {
          ok: false as const,
          error: "That code doesn't match. Check with your teacher and try again.",
        };
      }

      const next: Session = {
        email: input.email,
        name: input.name,
        initials: deriveInitials(input.name),
        role: "student",
      };
      setSession(next);
      setSessionState(next);

      const alreadyEnrolled = data.students.some(
        (student) => student.name.toLowerCase() === input.name.toLowerCase(),
      );
      if (!alreadyEnrolled) {
        mutateStudents((students) => [
          ...students,
          {
            id: generateId("student"),
            name: input.name,
            initials: deriveInitials(input.name),
            className: "Period 2 Algebra",
            lastActive: "Today",
            accuracy: 0,
            avatarColor: "var(--calea-blue-soft)",
          },
        ]);
      }

      return { ok: true as const };
    },
    [data.students, mutateStudents],
  );

  const setRole = useCallback((role: Session["role"]) => {
    const next = updateSession({ role });
    if (next) setSessionState(next);
  }, []);

  const updateProfile = useCallback((partial: Pick<Session, "name" | "email">) => {
    const next = updateSession(partial);
    if (next) setSessionState(next);
  }, []);

  const signOut = useCallback(() => {
    clearSession();
    setSessionState(null);
  }, []);

  const getCourse = useCallback(
    (id: string) => data.courses.find((course) => course.id === id),
    [data.courses],
  );

  const getCourseSummary = useCallback((course: CourseRecord) => toCourseSummary(course), []);

  const createCourse = useCallback(
    (input: { title: string; description: string }) => {
      const base = slugify(input.title);
      const id = uniqueSlug(
        base,
        data.courses.map((course) => course.id),
      );
      const course: CourseRecord = {
        id,
        title: input.title.trim(),
        description: input.description.trim(),
        accuracy: 0,
        chapters: [
          {
            id: generateId("ch"),
            title: "Chapter 1: Getting started",
            questionCount: 0,
            questions: [],
          },
        ],
      };
      mutateCourses((courses) => [...courses, course]);
      return course;
    },
    [data.courses, mutateCourses],
  );

  const updateCourse = useCallback(
    (
      id: string,
      input: Partial<Pick<CourseRecord, "title" | "description" | "accuracy">>,
    ) => {
      mutateCourses((courses) =>
        courses.map((course) =>
          course.id === id
            ? {
                ...course,
                ...input,
                title: input.title?.trim() ?? course.title,
                description: input.description?.trim() ?? course.description,
              }
            : course,
        ),
      );
    },
    [mutateCourses],
  );

  const deleteCourse = useCallback(
    (id: string) => {
      mutateCourses((courses) => courses.filter((course) => course.id !== id));
    },
    [mutateCourses],
  );

  const addChapter = useCallback(
    (courseId: string, title: string) => {
      const chapter: Chapter = {
        id: generateId("ch"),
        title: title.trim(),
        questionCount: 0,
        questions: [],
      };
      mutateCourses((courses) =>
        courses.map((course) => {
          if (course.id !== courseId) return course;
          return {
            ...course,
            chapters: syncChapterCounts([...course.chapters, chapter]),
          };
        }),
      );
      return chapter.id;
    },
    [mutateCourses],
  );

  const updateChapter = useCallback(
    (courseId: string, chapterId: string, title: string) => {
      mutateCourses((courses) =>
        courses.map((course) => {
          if (course.id !== courseId) return course;
          return {
            ...course,
            chapters: course.chapters.map((chapter) =>
              chapter.id === chapterId ? { ...chapter, title: title.trim() } : chapter,
            ),
          };
        }),
      );
    },
    [mutateCourses],
  );

  const deleteChapter = useCallback(
    (courseId: string, chapterId: string) => {
      mutateCourses((courses) =>
        courses.map((course) => {
          if (course.id !== courseId) return course;
          return {
            ...course,
            chapters: syncChapterCounts(
              course.chapters.filter((chapter) => chapter.id !== chapterId),
            ),
          };
        }),
      );
    },
    [mutateCourses],
  );

  const addQuestion = useCallback(
    (courseId: string, chapterId: string, text: string) => {
      mutateCourses((courses) =>
        courses.map((course) => {
          if (course.id !== courseId) return course;
          return {
            ...course,
            chapters: syncChapterCounts(
              course.chapters.map((chapter) =>
                chapter.id === chapterId
                  ? { ...chapter, questions: [...chapter.questions, text.trim()] }
                  : chapter,
              ),
            ),
          };
        }),
      );
    },
    [mutateCourses],
  );

  const updateQuestion = useCallback(
    (courseId: string, chapterId: string, questionIndex: number, text: string) => {
      mutateCourses((courses) =>
        courses.map((course) => {
          if (course.id !== courseId) return course;
          return {
            ...course,
            chapters: syncChapterCounts(
              course.chapters.map((chapter) => {
                if (chapter.id !== chapterId) return chapter;
                const questions = [...chapter.questions];
                questions[questionIndex] = text.trim();
                return { ...chapter, questions };
              }),
            ),
          };
        }),
      );
    },
    [mutateCourses],
  );

  const deleteQuestion = useCallback(
    (courseId: string, chapterId: string, questionIndex: number) => {
      mutateCourses((courses) =>
        courses.map((course) => {
          if (course.id !== courseId) return course;
          return {
            ...course,
            chapters: syncChapterCounts(
              course.chapters.map((chapter) => {
                if (chapter.id !== chapterId) return chapter;
                return {
                  ...chapter,
                  questions: chapter.questions.filter((_, i) => i !== questionIndex),
                };
              }),
            ),
          };
        }),
      );
    },
    [mutateCourses],
  );

  const getStudent = useCallback(
    (id: string) => data.students.find((student) => student.id === id),
    [data.students],
  );

  const createStudent = useCallback(
    (input: { name: string; className: string; accuracy?: number }) => {
      const student: Student = {
        id: generateId("student"),
        name: input.name.trim(),
        initials: deriveInitials(input.name.trim()),
        className: input.className.trim(),
        lastActive: "Today",
        accuracy: input.accuracy ?? 0,
        avatarColor: "var(--calea-blue-soft)",
      };
      mutateStudents((students) => [...students, student]);
      return student;
    },
    [mutateStudents],
  );

  const updateStudent = useCallback(
    (
      id: string,
      input: Partial<Pick<Student, "name" | "className" | "accuracy" | "lastActive">>,
    ) => {
      mutateStudents((students) =>
        students.map((student) => {
          if (student.id !== id) return student;
          const name = input.name?.trim() ?? student.name;
          return {
            ...student,
            ...input,
            name,
            initials: input.name ? deriveInitials(name) : student.initials,
          };
        }),
      );
    },
    [mutateStudents],
  );

  const deleteStudent = useCallback(
    (id: string) => {
      mutateStudents((students) => students.filter((student) => student.id !== id));
    },
    [mutateStudents],
  );

  const classFilters = useMemo(() => {
    const classes = [...new Set(data.students.map((student) => student.className))].sort();
    return ["All classes", ...classes];
  }, [data.students]);

  const value = useMemo<AppContextValue>(
    () => ({
      ready,
      session,
      courses: data.courses,
      students: data.students,
      signIn,
      registerAccount,
      joinWithCode,
      setRole,
      updateProfile,
      signOut,
      getCourse,
      getCourseSummary,
      createCourse,
      updateCourse,
      deleteCourse,
      addChapter,
      updateChapter,
      deleteChapter,
      addQuestion,
      updateQuestion,
      deleteQuestion,
      getStudent,
      createStudent,
      updateStudent,
      deleteStudent,
      classFilters,
    }),
    [
      ready,
      session,
      data,
      signIn,
      registerAccount,
      joinWithCode,
      setRole,
      updateProfile,
      signOut,
      getCourse,
      getCourseSummary,
      createCourse,
      updateCourse,
      deleteCourse,
      addChapter,
      updateChapter,
      deleteChapter,
      addQuestion,
      updateQuestion,
      deleteQuestion,
      getStudent,
      createStudent,
      updateStudent,
      deleteStudent,
      classFilters,
    ],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
