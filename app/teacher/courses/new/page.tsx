"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { useApp } from "@/components/providers/AppProvider";
import { Button, LinkButton } from "@/components/ui/Button";
import {
  AppPage,
  BackLink,
  EditorSection,
  EditorShell,
  FormField,
  FormFields,
  PageHeader,
} from "@/components/ui/Page";

export default function NewCoursePage() {
  const router = useRouter();
  const { createCourse } = useApp();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  function handleSave(e?: FormEvent) {
    e?.preventDefault();
    if (!title.trim()) return;
    const course = createCourse({ title, description });
    router.push(`/teacher/courses/${course.id}`);
  }

  return (
    <AppPage>
      <BackLink href="/teacher/courses">← Courses</BackLink>

      <PageHeader
        eyebrow="New"
        title="Create a course"
        description="Start with a name and description. Add chapters next."
        action={
          <div className="flex flex-wrap gap-2">
            <Button
              variant="primary"
              size="sm"
              disabled={!title.trim()}
              onClick={() => handleSave()}
            >
              Save
            </Button>
            <LinkButton href="/teacher/courses" variant="muted" size="sm">
              Cancel
            </LinkButton>
          </div>
        }
      />

      <EditorShell>
        <EditorSection
          title="Details"
          description="Most teachers finish setup in under five minutes."
        >
          <form onSubmit={handleSave}>
            <FormFields>
              <FormField label="Course title" htmlFor="title">
                <input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Introduction to Algebra"
                  required
                  className="field-input"
                />
              </FormField>
              <FormField label="Description" htmlFor="desc">
                <textarea
                  id="desc"
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="What will students learn?"
                  className="field-input resize-y"
                />
              </FormField>
            </FormFields>
          </form>
        </EditorSection>
      </EditorShell>
    </AppPage>
  );
}
