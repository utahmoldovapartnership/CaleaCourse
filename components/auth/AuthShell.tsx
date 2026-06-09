import Image from "next/image";
import Link from "next/link";
import { type ReactNode } from "react";
import { AuthTabs } from "@/components/auth/AuthTabs";
import type { PageTheme } from "@/lib/theme";

type AuthTab = "login" | "register" | "join";

type AuthShellProps = {
  activeTab: AuthTab;
  theme?: PageTheme;
  title: string;
  lead: string;
  headingId: string;
  illustration: string;
  illustrationCopy: string;
  footer?: ReactNode;
  children: ReactNode;
};

export function AuthShell({
  activeTab,
  theme = "orange",
  title,
  lead,
  headingId,
  illustration,
  illustrationCopy,
  footer,
  children,
}: AuthShellProps) {
  return (
    <div className="auth-page" data-theme={theme}>
      <section className="auth-page-panel" aria-labelledby={headingId}>
        <Link href="/" className="auth-page-brand">
          <Image src="/assets/logos/logo-color.svg" alt="" width={36} height={36} />
          <span className="auth-page-brand-name">Calea Courses</span>
        </Link>

        <AuthTabs active={activeTab} />

        <div className="auth-page-content">
          <header className="auth-page-header">
            <h1 id={headingId} className="auth-page-title">
              {title}
            </h1>
            <p className="auth-page-lead">{lead}</p>
          </header>

          <div className="auth-card">{children}</div>

          {footer && <div className="auth-page-footer-wrap">{footer}</div>}
        </div>
      </section>

      <aside className="auth-page-visual on-accent" aria-hidden="true">
        <Image
          src={illustration}
          alt=""
          width={480}
          height={480}
          priority
          className="auth-page-visual-image"
        />
        <p className="auth-page-visual-copy">{illustrationCopy}</p>
      </aside>
    </div>
  );
}
