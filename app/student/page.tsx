"use client";

import {
  AppPage,
  List,
  ListItem,
  PageHeader,
} from "@/components/ui/Page";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { useApp } from "@/components/providers/AppProvider";

export default function StudentHomePage() {
  const { ready, courses, getCourseSummary } = useApp();

  if (!ready) return null;

  return (
    <AppPage wide fill>
      <PageHeader
        eyebrow="Practice"
        title="My courses"
        description="Continue where you left off."
      />

      {courses.length === 0 ? (
        <p className="text-calea-text-muted">No courses assigned yet.</p>
      ) : (
        <List>
          {courses.map((course) => {
            const summary = getCourseSummary(course);
            const firstChapter = course.chapters[0];
            const questionTotal = firstChapter?.questions.length ?? 0;
            return (
              <ListItem
                key={course.id}
                href={`/student/courses/${course.id}`}
                title={summary.title}
                meta={
                  firstChapter
                    ? `${firstChapter.title} · ${questionTotal} questions`
                    : summary.description || "No chapters yet"
                }
                trailing={
                  <div className="w-24 lg:w-32">
                    <ProgressBar value={summary.accuracy} />
                  </div>
                }
              />
            );
          })}
        </List>
      )}
    </AppPage>
  );
}
