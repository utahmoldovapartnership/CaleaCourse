import Link from "next/link";
import Image from "next/image";
import { type ReactNode } from "react";
import { LinkButton } from "@/components/ui/Button";

function SiteBrandLink({ onAccent = false }: { onAccent?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2.5 no-underline">
      <Image
        src={onAccent ? "/assets/logos/logo-white.svg" : "/assets/logos/logo-color.svg"}
        alt=""
        width={32}
        height={32}
      />
      <span
        className={`font-display text-lg font-extrabold ${onAccent ? "" : "text-calea-text"}`}
      >
        Calea Courses
      </span>
    </Link>
  );
}

export function SiteHeader({
  ctaHref = "/login",
  ctaLabel = "Get started",
}: {
  ctaHref?: string;
  ctaLabel?: string;
}) {
  return (
    <header className="landing-site-header on-accent">
      <div className="page-wrap page-wrap--wide">
        <div className="flex h-[var(--topbar-height)] items-center justify-between gap-4">
          <SiteBrandLink onAccent />

          <div className="ml-auto flex items-center gap-3">
            <LinkButton href="/login" variant="onAccentOutline" size="sm">
              Sign in
            </LinkButton>
            <LinkButton href={ctaHref} variant="onBrand" size="sm">
              {ctaLabel}
            </LinkButton>
          </div>
        </div>
      </div>
    </header>
  );
}

export function Tag({
  children,
  solid,
}: {
  children: ReactNode;
  solid?: boolean;
}) {
  return (
    <span className={`tag-pill ${solid ? "tag-pill--solid" : ""}`}>
      {children}
    </span>
  );
}

export function SiteFooter() {
  return (
    <div className="landing-footer-stack mt-auto">
      <section className="landing-cta">
        <div className="page-wrap page-wrap--wide">
          <div className="landing-cta-panel on-accent" data-theme="yellow">
            <div className="landing-cta-inner">
              <div className="landing-cta-copy">
                <h2 className="font-display text-3xl font-extrabold tracking-tight lg:text-[2.5rem]">
                  Ready to get started?
                </h2>
                <p className="on-accent-muted mt-4 max-w-md text-base leading-relaxed lg:text-lg">
                  Create your first course in minutes and see exactly what students will
                  experience.
                </p>
                <div className="landing-cta-actions mt-8 flex flex-wrap items-center gap-3">
                  <LinkButton href="/login" size="lg" className="landing-cta-btn-dark">
                    Get started
                  </LinkButton>
                  <LinkButton href="/register" size="lg" variant="onAccentOutline">
                    Create account
                  </LinkButton>
                </div>
              </div>

              <div className="landing-cta-art" aria-hidden="true">
                <Image
                  src="/assets/illustrations/student.svg"
                  alt=""
                  width={320}
                  height={320}
                  className="landing-cta-art-image landing-cta-art-image--student"
                />
                <Image
                  src="/assets/illustrations/teacher%201.svg"
                  alt=""
                  width={400}
                  height={400}
                  className="landing-cta-art-image landing-cta-art-image--teacher"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="landing-band landing-site-footer on-accent" data-theme="orange">
        <div className="page-wrap page-wrap--wide">
          <div className="landing-site-footer-inner">
            <div className="landing-site-footer-brand">
              <SiteBrandLink onAccent />
              <p className="on-accent-muted max-w-xs text-sm leading-relaxed">
                Learning tools that stay out of your way.
              </p>
            </div>

            <nav className="landing-site-footer-nav" aria-label="Footer">
              <div className="landing-site-footer-col">
                <p className="landing-site-footer-label">Product</p>
                <Link href="/login">Sign in</Link>
                <Link href="/register">Create account</Link>
                <Link href="/join">Join a class</Link>
              </div>
              <div className="landing-site-footer-col">
                <p className="landing-site-footer-label">Teachers</p>
                <Link href="/teacher">Dashboard</Link>
                <Link href="/teacher/courses">Courses</Link>
                <Link href="/teacher/students">Students</Link>
              </div>
            </nav>
          </div>

          <div className="landing-site-footer-bar on-accent-muted">
            © 2026 Calea Courses
          </div>
        </div>
      </footer>
    </div>
  );
}
