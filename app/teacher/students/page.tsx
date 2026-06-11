"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useApp } from "@/components/providers/AppProvider";
import {
  AppPage,
  FilterPills,
  List,
  PageHeader,
  StatInline,
} from "@/components/ui/Page";
import { Button, LinkButton } from "@/components/ui/Button";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { INVITE_CODE } from "@/lib/invite";

export default function StudentsPage() {
  const { ready, students, classFilters } = useApp();
  const [filter, setFilter] = useState("All classes");
  const [copied, setCopied] = useState(false);

  const filtered = useMemo(
    () =>
      filter === "All classes"
        ? students
        : students.filter((s) => s.className === filter),
    [students, filter],
  );

  const stats = useMemo(() => {
    const active = students.filter((s) => s.lastActive === "Today").length;
    const avg =
      students.length > 0
        ? Math.round(students.reduce((sum, s) => sum + s.accuracy, 0) / students.length)
        : 0;
    return { total: students.length, active, avg };
  }, [students]);

  if (!ready) return null;

  function copyInviteCode() {
    const code = INVITE_CODE;
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <AppPage>
      <PageHeader
        eyebrow="Students"
        title="Your roster"
        description="Everyone enrolled across your classes."
        action={
          <div className="flex flex-wrap gap-2">
            <Button variant="secondary" size="sm" onClick={copyInviteCode}>
              {copied ? "Copied!" : "Invite code"}
            </Button>
            <LinkButton href="/teacher/students/new" size="sm">
              Add student
            </LinkButton>
          </div>
        }
      />

      <StatInline
        items={[
          { label: "Total", value: String(stats.total) },
          { label: "Active today", value: String(stats.active) },
          { label: "Avg accuracy", value: `${stats.avg}%` },
        ]}
      />

      <div className="mb-[var(--section-gap)] mt-12">
        <FilterPills options={classFilters} value={filter} onChange={setFilter} />
        {filtered.length === 0 ? (
          <p className="text-calea-text-muted">No students match this filter.</p>
        ) : (
          <List>
            {filtered.map((student, i) => (
              <li key={student.id}>
                <Link
                  href={`/teacher/students/${student.id}`}
                  className={`list-row list-row--with-stats text-calea-text no-underline hover:text-calea-text ${i % 2 === 1 ? "list-row--alt" : ""}`}
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--page-accent-subtle)] font-display text-sm font-extrabold accent-text">
                    {student.initials}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate font-display text-base font-extrabold">
                      {student.name}
                    </div>
                    <div className="accent-text-muted truncate text-sm font-medium">
                      {student.className} · {student.lastActive}
                    </div>
                  </div>
                  <div className="list-row-stats">
                    <div className="font-display text-xl font-extrabold">
                      {student.accuracy}%
                    </div>
                    <div className="mt-1.5 w-24">
                      <ProgressBar value={student.accuracy} />
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </List>
        )}
      </div>
    </AppPage>
  );
}
