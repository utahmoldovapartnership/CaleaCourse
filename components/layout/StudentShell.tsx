"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { type ReactNode } from "react";
import { AuthGuard } from "@/components/auth/AuthGuard";
import { ProfileMenu } from "@/components/auth/ProfileMenu";
import { TEACHER_DASHBOARD_THEME, TEACHER_PROFILE_ACCENT } from "@/lib/theme";

export function StudentShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isCourseView = /^\/student\/courses\/[^/]+/.test(pathname);

  if (isCourseView) {
    return (
      <div
        className="flex min-h-dvh flex-col bg-calea-off-white"
        data-theme={TEACHER_DASHBOARD_THEME}
      >
        <AuthGuard role="student">{children}</AuthGuard>
      </div>
    );
  }

  return (
    <div
      className="flex min-h-screen flex-col bg-calea-off-white"
      data-theme={TEACHER_DASHBOARD_THEME}
    >
      <header className="flex h-[var(--topbar-height)] shrink-0 items-center justify-between border-b border-calea-border-light bg-calea-white px-[var(--page-px)]">
        <Link href="/student" className="flex items-center gap-2.5 no-underline">
          <Image src="/assets/logos/logo-color.svg" alt="" width={28} height={28} />
          <span className="font-display text-base font-extrabold text-calea-text">Calea</span>
        </Link>
        <ProfileMenu accentClass={TEACHER_PROFILE_ACCENT} />
      </header>
      <main className="flex flex-1 flex-col">
        <AuthGuard role="student">{children}</AuthGuard>
      </main>
    </div>
  );
}
