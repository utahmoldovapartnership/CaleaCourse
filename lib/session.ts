export type UserRole = "teacher" | "student";

export type Session = {
  email: string;
  name: string;
  initials: string;
  role: UserRole;
};

const SESSION_KEY = "calea-session";

export function deriveInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

export function deriveNameFromEmail(email: string): string {
  const local = email.split("@")[0] ?? "User";
  return local
    .split(/[._-]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function getSession(): Session | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as Session;
  } catch {
    return null;
  }
}

export function setSession(session: Session): void {
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function updateSession(partial: Partial<Session>): Session | null {
  const current = getSession();
  if (!current) return null;
  const next = { ...current, ...partial };
  if (partial.name) {
    next.initials = deriveInitials(partial.name);
  }
  setSession(next);
  return next;
}

export function clearSession(): void {
  localStorage.removeItem(SESSION_KEY);
}
