"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useApp } from "@/components/providers/AppProvider";
import { Button } from "@/components/ui/Button";
import type { UserRole } from "@/lib/session";

export default function RolePage() {
  const router = useRouter();
  const { session, ready, setRole } = useApp();
  const [role, setRoleChoice] = useState<UserRole | null>(null);

  useEffect(() => {
    if (!ready) return;
    if (!session) {
      router.replace("/login");
      return;
    }
    setRoleChoice(session.role);
  }, [ready, session, router]);

  function continueAs() {
    if (!role) return;
    setRole(role);
    router.push(role === "teacher" ? "/teacher" : "/student");
  }

  if (!ready || !session) return null;

  return (
    <div className="role-page" data-theme="orange">
      <div className="role-page-inner">
        <header className="role-page-header">
          <p className="eyebrow">Get started</p>
          <h1 className="auth-page-title">Choose your role</h1>
          <p className="auth-page-lead">
            Pick how you&apos;ll use Calea. You can change this later from your profile.
          </p>
        </header>

        <div className="auth-card role-card">
          <div className="role-options">
            <RoleOption
              selected={role === "teacher"}
              onSelect={() => setRoleChoice("teacher")}
              icon="/assets/illustrations/teacher%201.svg"
              label="Teacher"
              hint="Create courses and manage classes"
            />
            <RoleOption
              selected={role === "student"}
              onSelect={() => setRoleChoice("student")}
              icon="/assets/illustrations/student.svg"
              label="Student"
              hint="Practice assigned courses"
            />
          </div>

          <Button size="lg" disabled={!role} onClick={continueAs} fullWidth>
            Continue
          </Button>
        </div>

        <p className="auth-page-footer role-page-footer">
          <Link href="/login" className="auth-page-footer-link">
            Back to sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

function RoleOption({
  selected,
  onSelect,
  icon,
  label,
  hint,
}: {
  selected: boolean;
  onSelect: () => void;
  icon: string;
  label: string;
  hint: string;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`role-option ${selected ? "role-option--active" : ""}`}
      aria-pressed={selected}
    >
      <Image src={icon} alt="" width={52} height={52} className="role-option-icon" />
      <span className="role-option-label">{label}</span>
      <span className="role-option-hint">{hint}</span>
    </button>
  );
}
