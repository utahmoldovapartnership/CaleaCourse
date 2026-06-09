"use client";

import Link from "next/link";
import { useApp } from "@/components/providers/AppProvider";
import {
  AppPage,
  List,
  ListItem,
  PageHeader,
  Section,
  StatInline,
} from "@/components/ui/Page";
import { LinkButton } from "@/components/ui/Button";
import { ProgressBar } from "@/components/ui/ProgressBar";

export default function TeacherHomePage() {
  const { ready, courses, students, getCourseSummary } = useApp();

  if (!ready) return null;

  const avgAccuracy =
    students.length > 0
      ? Math.round(students.reduce((sum, s) => sum + s.accuracy, 0) / students.length)
      : 0;

  return (
    <AppPage>
      <PageHeader
        eyebrow="Dashboard"
        title="Good morning"
        description="Here's a quick look at your workspace."
      />

      <Section>
        <StatInline
          items={[
            { label: "Courses", value: String(courses.length) },
            { label: "Classes", value: String(new Set(students.map((s) => s.className)).size) },
            { label: "Students", value: String(students.length) },
          ]}
        />
      </Section>

      <Section
        title="Your courses"
        action={
          <LinkButton href="/teacher/courses/new" size="sm">
            New course
          </LinkButton>
        }
      >
        <List>
          {courses.slice(0, 5).map((course) => {
            const summary = getCourseSummary(course);
            return (
              <ListItem
                key={course.id}
                href={`/teacher/courses/${course.id}`}
                title={summary.title}
                meta={`${summary.chapters} chapters · ${summary.accuracy}% avg accuracy`}
                trailing={
                  <div className="w-24 lg:w-32">
                    <ProgressBar value={summary.accuracy} />
                  </div>
                }
              />
            );
          })}
        </List>
        <Link href="/teacher/courses" className="text-link mt-8 inline-block text-sm">
          View all courses →
        </Link>
      </Section>

      <Section title="Roster snapshot">
        <StatInline
          items={[
            { label: "Total students", value: String(students.length) },
            { label: "Avg accuracy", value: `${avgAccuracy}%` },
          ]}
        />
      </Section>
    </AppPage>
  );
}
