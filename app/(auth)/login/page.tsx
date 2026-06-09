"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { AuthShell } from "@/components/auth/AuthShell";
import { useApp } from "@/components/providers/AppProvider";
import { Button } from "@/components/ui/Button";

export default function LoginPage() {
  const router = useRouter();
  const { signIn } = useApp();
  const [email, setEmail] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed) return;
    signIn(trimmed);
    router.push("/role");
  }

  return (
    <AuthShell
      activeTab="login"
      title="Welcome back"
      lead="Sign in to pick up where you left off."
      headingId="login-heading"
      illustration="/assets/illustrations/books.svg"
      illustrationCopy="Calea gets out of your way so learning can happen."
    >
      <form onSubmit={handleSubmit} className="auth-form">
        <div className="auth-field">
          <label htmlFor="email" className="field-label">
            School email
          </label>
          <input
            id="email"
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
          <div className="auth-field-row">
            <label htmlFor="password" className="field-label">
              Password
            </label>
            <Link href="/login" className="auth-inline-link">
              Forgot?
            </Link>
          </div>
          <input
            id="password"
            type="password"
            required
            autoComplete="current-password"
            placeholder="Enter your password"
            className="field-input"
          />
        </div>

        <Button type="submit" size="lg" fullWidth>
          Sign in
        </Button>
      </form>
    </AuthShell>
  );
}
