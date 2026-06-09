"use client";

import {
  AppPage,
  List,
  ListItem,
  PageHeader,
} from "@/components/ui/Page";
import { LinkButton } from "@/components/ui/Button";
import { useApp } from "@/components/providers/AppProvider";

export default function CoursesPage() {
  const { ready, courses, getCourseSummary } = useApp();

  if (!ready) return null;

  return (
    <AppPage>
      <PageHeader
        eyebrow="Courses"
        title="Your courses"
        description="Create and edit your interactive course content."
        action={
          <LinkButton href="/teacher/courses/new" size="sm">
            New course
          </LinkButton>
        }
      />

      {courses.length === 0 ? (
        <p className="text-calea-text-muted">No courses yet. Create your first one.</p>
      ) : (
        <List>
          {courses.map((course, i) => {
            const summary = getCourseSummary(course);
            return (
              <ListItem
                key={course.id}
                href={`/teacher/courses/${course.id}`}
                title={summary.title}
                meta={`${summary.chapters} chapters · ${summary.questions} questions · ${summary.accuracy}% accuracy`}
                alt={i % 2 === 1}
              />
            );
          })}
        </List>
      )}
    </AppPage>
  );
}
