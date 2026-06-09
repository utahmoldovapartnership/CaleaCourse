"use client";

import { Suspense, use } from "react";
import { CoursePracticeView } from "@/components/course/CoursePracticeView";

function StudentCourseContent({ id }: { id: string }) {
  return (
    <CoursePracticeView
      courseId={id}
      exitHref="/student"
      exitLabel="My courses"
    />
  );
}

export default function StudentCoursePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  return (
    <Suspense fallback={null}>
      <StudentCourseContent id={id} />
    </Suspense>
  );
}
