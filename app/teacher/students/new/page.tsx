"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useMemo, useState } from "react";
import { useApp } from "@/components/providers/AppProvider";
import { Button } from "@/components/ui/Button";
import {
  AppPage,
  BackLink,
  EditorSection,
  EditorShell,
  FormField,
  FormFields,
  PageHeader,
} from "@/components/ui/Page";

export default function NewStudentPage() {
  const router = useRouter();
  const { students, createStudent } = useApp();
  const [name, setName] = useState("");
  const [className, setClassName] = useState("");
  const [accuracy, setAccuracy] = useState("0");

  const classOptions = useMemo(() => {
    const classes = [...new Set(students.map((s) => s.className))].sort();
    return classes;
  }, [students]);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!name.trim() || !className.trim()) return;
    const student = createStudent({
      name,
      className,
      accuracy: Number.parseInt(accuracy, 10) || 0,
    });
    router.push(`/teacher/students/${student.id}`);
  }

  return (
    <AppPage>
      <BackLink href="/teacher/students">← Students</BackLink>

      <PageHeader
        eyebrow="Students"
        title="Add a student"
        description="Add someone to your roster manually."
      />

      <EditorShell>
        <EditorSection title="Student details">
          <form onSubmit={handleSubmit}>
            <FormFields>
              <FormField label="Full name" htmlFor="student-name">
                <input
                  id="student-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Maya Chen"
                  className="field-input"
                />
              </FormField>
              <FormField label="Class" htmlFor="student-class">
                <input
                  id="student-class"
                  list="class-options"
                  value={className}
                  onChange={(e) => setClassName(e.target.value)}
                  required
                  placeholder="Period 2 Algebra"
                  className="field-input"
                />
                <datalist id="class-options">
                  {classOptions.map((option) => (
                    <option key={option} value={option} />
                  ))}
                </datalist>
              </FormField>
              <FormField label="Starting accuracy (%)" htmlFor="student-accuracy">
                <input
                  id="student-accuracy"
                  type="number"
                  min={0}
                  max={100}
                  value={accuracy}
                  onChange={(e) => setAccuracy(e.target.value)}
                  className="field-input"
                />
              </FormField>
            </FormFields>
            <div className="mt-8 flex gap-3">
              <Button type="submit" size="sm" disabled={!name.trim() || !className.trim()}>
                Add student
              </Button>
              <Button
                type="button"
                variant="muted"
                size="sm"
                onClick={() => router.push("/teacher/students")}
              >
                Cancel
              </Button>
            </div>
          </form>
        </EditorSection>
      </EditorShell>
    </AppPage>
  );
}
