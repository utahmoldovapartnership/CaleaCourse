"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { type ComponentType, type ReactNode, useEffect, useState } from "react";
import {
  HiOutlineBookOpen,
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
  HiOutlineHome,
  HiOutlineUserGroup,
  HiOutlineViewGrid,
} from "react-icons/hi";
import { AuthGuard } from "@/components/auth/AuthGuard";
import { ProfileMenu } from "@/components/auth/ProfileMenu";
import { TEACHER_DASHBOARD_THEME, TEACHER_PROFILE_ACCENT } from "@/lib/theme";

const STORAGE_KEY = "calea-teacher-sidebar-collapsed";

type NavIcon = ComponentType<{ className?: string }>;

const navItems: {
  href: string;
  label: string;
  icon: NavIcon;
  match: (p: string) => boolean;
}[] = [
  { href: "/teacher", label: "Home", icon: HiOutlineHome, match: (p) => p === "/teacher" },
  {
    href: "/teacher/courses",
    label: "Courses",
    icon: HiOutlineBookOpen,
    match: (p) => p.startsWith("/teacher/courses"),
  },
  {
    href: "/teacher/students",
    label: "Students",
    icon: HiOutlineUserGroup,
    match: (p) => p.startsWith("/teacher/students"),
  },
  {
    href: "/teacher/classes",
    label: "Classes",
    icon: HiOutlineViewGrid,
    match: (p) => p.startsWith("/teacher/classes"),
  },
];

export function TeacherShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setCollapsed(localStorage.getItem(STORAGE_KEY) === "true");
    setReady(true);
  }, []);

  function toggleCollapsed() {
    setCollapsed((prev) => {
      const next = !prev;
      localStorage.setItem(STORAGE_KEY, String(next));
      return next;
    });
  }

  const CollapseIcon = collapsed ? HiOutlineChevronRight : HiOutlineChevronLeft;
  const isCoursePreview = /^\/teacher\/courses\/[^/]+\/preview/.test(pathname);

  if (isCoursePreview) {
    return (
      <div
        className="teacher-shell teacher-shell--immersive min-h-screen bg-calea-off-white"
        data-theme={TEACHER_DASHBOARD_THEME}
      >
        <AuthGuard role="teacher">{children}</AuthGuard>
      </div>
    );
  }

  return (
    <div
      className="teacher-shell"
      data-theme={TEACHER_DASHBOARD_THEME}
      data-collapsed={ready && collapsed ? "true" : "false"}
    >
      <aside className="sidebar-shell sidebar-aside fixed inset-y-0 left-0 z-40 flex-col">
        <div className="sidebar-header">
          <Link href="/teacher" className="sidebar-brand no-underline" title="Calea">
            <Image
              src="/assets/logos/logo-white.svg"
              alt=""
              width={32}
              height={32}
              className="sidebar-brand-logo h-8 w-8"
            />
            <span className="sidebar-brand-text font-display text-lg font-extrabold">
              Calea
            </span>
          </Link>
          <button
            type="button"
            onClick={toggleCollapsed}
            className="sidebar-collapse-btn"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            aria-expanded={!collapsed}
          >
            <CollapseIcon className="sidebar-collapse-icon" aria-hidden="true" />
          </button>
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => {
            const active = item.match(pathname);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                title={item.label}
                className={`sidebar-link ${active ? "sidebar-link--active" : ""}`}
              >
                <span className="sidebar-link-icon" aria-hidden="true">
                  <Icon />
                </span>
                <span className="sidebar-link-label">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <ProfileMenu
            accentClass={TEACHER_PROFILE_ACCENT}
            variant="sidebar"
            placement="above"
            className="profile-menu--in-sidebar"
          />
        </div>
      </aside>

      <div className="flex min-h-screen flex-col bg-calea-off-white">
        <header className="flex h-[var(--topbar-height)] items-center justify-end gap-4 border-b border-calea-border-light bg-calea-white px-[var(--page-px)] lg:hidden">
          <Link href="/teacher" className="mr-auto flex items-center gap-2">
            <Image src="/assets/logos/logo-color.svg" alt="" width={28} height={28} />
            <span className="font-display text-base font-extrabold text-calea-text no-underline">Calea</span>
          </Link>
          <ProfileMenu accentClass={TEACHER_PROFILE_ACCENT} />
        </header>

        <main className="flex-1 pb-[calc(5.5rem+env(safe-area-inset-bottom,0px))] lg:pb-[var(--page-py)]">
          <AuthGuard role="teacher">{children}</AuthGuard>
        </main>

        <nav className="sidebar-shell mobile-nav fixed bottom-0 left-0 right-0 flex justify-around px-2 py-2 lg:hidden">
          {navItems.map((item) => {
            const active = item.match(pathname);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`mobile-nav-link ${active ? "mobile-nav-link--active" : ""}`}
              >
                <Icon className="mobile-nav-icon" aria-hidden="true" />
                <span className="mobile-nav-label">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
