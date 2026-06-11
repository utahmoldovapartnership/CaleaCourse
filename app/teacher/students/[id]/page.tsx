"use client";

import { notFound, useRouter } from "next/navigation";
import { use, useEffect, useMemo, useState } from "react";
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
import { ProgressBar } from "@/components/ui/ProgressBar";

export default function StudentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const { ready, getStudent, students, updateStudent, deleteStudent } = useApp();
  const student = getStudent(id);

  const [name, setName] = useState("");
  const [className, setClassName] = useState("");
  const [accuracy, setAccuracy] = useState("0");
  const [lastActive, setLastActive] = useState("Today");
  const [saved, setSaved] = useState(false);

  const classOptions = useMemo(() => {
    const classes = [...new Set(students.map((s) => s.className))].sort();
    return classes;
  }, [students]);

  useEffect(() => {
    if (!student) return;
    setName(student.name);
    setClassName(student.className);
    setAccuracy(String(student.accuracy));
    setLastActive(student.lastActive);
  }, [student]);

  if (!ready) return null;
  if (!student) notFound();

  function handleSave() {
    updateStudent(id, {
      name,
      className,
      accuracy: Number.parseInt(accuracy, 10) || 0,
      lastActive,
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  function handleDelete() {
    if (!confirm(`Remove ${student!.name} from your roster?`)) return;
    deleteStudent(id);
    router.push("/teacher/students");
  }

  return (
    <AppPage>
      <BackLink href="/teacher/students">← Students</BackLink>

      <PageHeader
        eyebrow="Student"
        title={name || student.name}
        description="View and update roster details."
        action={
          <div className="flex flex-wrap gap-2">
            <Button size="sm" onClick={handleSave}>
              {saved ? "Saved" : "Save"}
            </Button>
            <Button variant="ghost" size="sm" onClick={handleDelete}>
              Remove
            </Button>
          </div>
        }
      />

      <div className="mb-10 flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--page-accent-subtle)] font-display text-lg font-extrabold accent-text">
          {student.initials}
        </div>
        <div className="w-40">
          <ProgressBar value={Number.parseInt(accuracy, 10) || 0} />
        </div>
      </div>

      <EditorShell>
        <EditorSection title="Details">
          <FormFields>
            <FormField label="Full name" htmlFor="edit-name">
              <input
                id="edit-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="field-input"
              />
            </FormField>
            <FormField label="Class" htmlFor="edit-class">
              <input
                id="edit-class"
                list="edit-class-options"
                value={className}
                onChange={(e) => setClassName(e.target.value)}
                className="field-input"
              />
              <datalist id="edit-class-options">
                {classOptions.map((option) => (
                  <option key={option} value={option} />
                ))}
              </datalist>
            </FormField>
            <FormField label="Accuracy (%)" htmlFor="edit-accuracy">
              <input
                id="edit-accuracy"
                type="number"
                min={0}
                max={100}
                value={accuracy}
                onChange={(e) => setAccuracy(e.target.value)}
                className="field-input"
              />
            </FormField>
            <FormField label="Last active" htmlFor="edit-active">
              <select
                id="edit-active"
                value={lastActive}
                onChange={(e) => setLastActive(e.target.value)}
                className="field-input"
              >
                <option value="Today">Today</option>
                <option value="Yesterday">Yesterday</option>
                <option value="3 days ago">3 days ago</option>
                <option value="1 week ago">1 week ago</option>
              </select>
            </FormField>
          </FormFields>
        </EditorSection>
      </EditorShell>
    </AppPage>
  );
}
