"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { HiOutlineChevronDown } from "react-icons/hi";
import { useApp } from "@/components/providers/AppProvider";

type ProfileMenuProps = {
  accentClass?: string;
  variant?: "icon" | "sidebar";
  placement?: "below" | "above";
  className?: string;
};

export function ProfileMenu({
  accentClass = "bg-calea-green",
  variant = "icon",
  placement = "below",
  className = "",
}: ProfileMenuProps) {
  const { session, ready, signOut } = useApp();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const dropdownClass =
    placement === "above" ? "profile-menu-dropdown--above" : "";

  if (!ready || !session) {
    if (variant === "sidebar") {
      return (
        <div
          className={`profile-menu profile-menu--sidebar ${className}`}
          aria-hidden
        >
          <div className="profile-menu-trigger profile-menu-trigger--sidebar opacity-60">
            <span
              className={`profile-menu-avatar text-sm font-extrabold ${accentClass}`}
            >
              ·
            </span>
            <span className="profile-menu-name">Loading…</span>
          </div>
        </div>
      );
    }

    return (
      <div
        className={`profile-menu-trigger--icon opacity-60 ${accentClass}`}
        aria-hidden
      >
        ·
      </div>
    );
  }

  function handleSignOut() {
    signOut();
    setOpen(false);
    router.push("/login");
  }

  return (
    <div
      className={`profile-menu ${variant === "sidebar" ? "profile-menu--sidebar" : ""} ${className}`}
      ref={rootRef}
    >
      <button
        type="button"
        className={
          variant === "sidebar"
            ? "profile-menu-trigger profile-menu-trigger--sidebar"
            : `profile-menu-trigger profile-menu-trigger--icon ${accentClass}`
        }
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label={variant === "sidebar" ? "Account menu" : undefined}
        onClick={() => setOpen((prev) => !prev)}
      >
        {variant === "sidebar" ? (
          <>
            <span
              className={`profile-menu-avatar text-sm font-extrabold ${accentClass}`}
            >
              {session.initials}
            </span>
            <span className="profile-menu-name">{session.name}</span>
            <HiOutlineChevronDown className="profile-menu-chevron" aria-hidden="true" />
          </>
        ) : (
          session.initials
        )}
      </button>

      {open && (
        <div className={`profile-menu-dropdown ${dropdownClass}`} role="menu">
          <div className="profile-menu-header">
            <div className="font-display text-sm font-extrabold text-calea-text">{session.name}</div>
            <div className="mt-0.5 text-xs font-medium text-calea-text-muted">{session.email}</div>
            <div className="profile-menu-role">{session.role}</div>
          </div>
          <Link
            href="/profile"
            className="profile-menu-item"
            role="menuitem"
            onClick={() => setOpen(false)}
          >
            Edit profile
          </Link>
          <Link
            href="/role"
            className="profile-menu-item"
            role="menuitem"
            onClick={() => setOpen(false)}
          >
            Switch role
          </Link>
          <button
            type="button"
            className="profile-menu-item profile-menu-item--danger"
            role="menuitem"
            onClick={handleSignOut}
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}
