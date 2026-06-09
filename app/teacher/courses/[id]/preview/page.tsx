"use client";

import { Suspense, use } from "react";
import { CoursePracticeView } from "@/components/course/CoursePracticeView";

function PreviewContent({ id }: { id: string }) {
  return (
    <CoursePracticeView
      courseId={id}
      exitHref={`/teacher/courses/${id}`}
      exitLabel="Back to editor"
      preview
    />
  );
}

export default function CoursePreviewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  return (
    <Suspense fallback={null}>
      <PreviewContent id={id} />
    </Suspense>
  );
}
