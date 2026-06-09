"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { AuthShell } from "@/components/auth/AuthShell";
import { useApp } from "@/components/providers/AppProvider";
import { Button } from "@/components/ui/Button";

export default function RegisterPage() {
  const router = useRouter();
  const { registerAccount } = useApp();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    registerAccount({ name: name.trim(), email: email.trim() });
    router.push("/role");
  }

  return (
    <AuthShell
      activeTab="register"
      theme="yellow"
      title="Create your account"
      lead="Add your details, then choose teacher or student."
      headingId="register-heading"
      illustration="/assets/illustrations/teacher-1.svg"
      illustrationCopy="Build courses, manage classes, and track student progress."
      footer={
        <p className="auth-page-footer">
          Already have an account?{" "}
          <Link href="/login" className="auth-page-footer-link">
            Sign in
          </Link>
        </p>
      }
    >
      <form onSubmit={handleSubmit} className="auth-form">
        <div className="auth-field">
          <label htmlFor="register-name" className="field-label">
            Full name
          </label>
          <input
            id="register-name"
            type="text"
            required
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Alex Kim"
            className="field-input"
          />
        </div>

        <div className="auth-field">
          <label htmlFor="register-email" className="field-label">
            School email
          </label>
          <input
            id="register-email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@school.edu"
            className="field-input"
          />
        </div>

        <div className="auth-field">
          <label htmlFor="register-password" className="field-label">
            Password
          </label>
          <input
            id="register-password"
            type="password"
            required
            autoComplete="new-password"
            placeholder="At least 8 characters"
            className="field-input"
          />
        </div>

        <Button type="submit" size="lg" fullWidth>
          Continue
        </Button>
      </form>
    </AuthShell>
  );
}
