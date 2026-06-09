"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { AuthShell } from "@/components/auth/AuthShell";
import { useApp } from "@/components/providers/AppProvider";
import { Button } from "@/components/ui/Button";

export default function JoinPage() {
  const router = useRouter();
  const { joinWithCode } = useApp();
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    const result = joinWithCode({
      code: code.trim(),
      name: name.trim(),
      email: email.trim(),
    });
    if (!result.ok) {
      setError(result.error);
      return;
    }
    router.push("/student");
  }

  return (
    <AuthShell
      activeTab="join"
      theme="green"
      title="Join your class"
      lead="Enter the code from your teacher to get started."
      headingId="join-heading"
      illustration="/assets/illustrations/student.svg"
      illustrationCopy="Practice assigned courses and track your progress."
      footer={
        <p className="auth-page-footer">
          Are you a teacher?{" "}
          <Link href="/register" className="auth-page-footer-link">
            Create an account
          </Link>
        </p>
      }
    >
      <form onSubmit={handleSubmit} className="auth-form">
        <div className="auth-field">
          <label htmlFor="join-code" className="field-label">
            Class code
          </label>
          <input
            id="join-code"
            type="text"
            required
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            placeholder="CALE-A2026"
            className="field-input auth-code-input"
            autoComplete="off"
            spellCheck={false}
          />
        </div>

        <div className="auth-field">
          <label htmlFor="join-name" className="field-label">
            Full name
          </label>
          <input
            id="join-name"
            type="text"
            required
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Maya Chen"
            className="field-input"
          />
        </div>

        <div className="auth-field">
          <label htmlFor="join-email" className="field-label">
            School email
          </label>
          <input
            id="join-email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@school.edu"
            className="field-input"
          />
        </div>

        {error && <p className="auth-page-error">{error}</p>}

        <Button type="submit" size="lg" fullWidth>
          Join class
        </Button>
      </form>
    </AuthShell>
  );
}
