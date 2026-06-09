import Link from "next/link";

const tabs = [
  { href: "/login", label: "Sign in", id: "login" as const },
  { href: "/register", label: "Create account", id: "register" as const },
  { href: "/join", label: "Join with code", id: "join" as const },
];

export function AuthTabs({ active }: { active: (typeof tabs)[number]["id"] }) {
  return (
    <nav className="auth-tabs" aria-label="Authentication">
      {tabs.map((tab) => (
        <Link
          key={tab.id}
          href={tab.href}
          className={`auth-tab ${active === tab.id ? "auth-tab--active" : ""}`}
          aria-current={active === tab.id ? "page" : undefined}
        >
          {tab.label}
        </Link>
      ))}
    </nav>
  );
}
