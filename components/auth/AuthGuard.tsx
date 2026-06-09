"use client";

import { useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import { useApp } from "@/components/providers/AppProvider";
import type { UserRole } from "@/lib/session";

export function AuthGuard({
  role,
  children,
}: {
  role: UserRole;
  children: ReactNode;
}) {
  const { session, ready } = useApp();
  const router = useRouter();

  useEffect(() => {
    if (!ready) return;
    if (!session) {
      router.replace("/login");
      return;
    }
    if (session.role !== role) {
      router.replace(session.role === "teacher" ? "/teacher" : "/student");
    }
  }, [ready, session, role, router]);

  if (!ready || !session || session.role !== role) {
    return null;
  }

  return children;
}
