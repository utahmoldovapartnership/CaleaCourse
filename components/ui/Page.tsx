import Link from "next/link";
import { type ReactNode } from "react";
import type { PageTheme } from "@/lib/theme";

export function AppPage({
  children,
  wide,
  narrow,
  fill,
  theme,
  className = "",
}: {
  children: ReactNode;
  wide?: boolean;
  narrow?: boolean;
  fill?: boolean;
  theme?: PageTheme;
  className?: string;
}) {
  const width = narrow
    ? "page-wrap page-wrap--narrow"
    : wide
      ? "page-wrap page-wrap--wide"
      : "page-wrap";

  return (
    <div
      {...(theme ? { "data-theme": theme } : {})}
      className={`${width} page-body ${fill ? "flex min-h-[calc(100dvh-var(--topbar-height))] flex-col" : ""} ${className}`}
    >
      {children}
    </div>
  );
}

export function PageHeader({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <header className="mb-10 flex flex-col gap-5 sm:mb-16 sm:flex-row sm:items-end sm:justify-between sm:gap-6 lg:mb-20">
      <div className="min-w-0 max-w-3xl">
        {eyebrow && <p className="eyebrow mb-3 sm:mb-4">{eyebrow}</p>}
        <h1 className="font-display text-2xl font-extrabold tracking-tight sm:text-3xl lg:text-[2.75rem]">
          {title}
        </h1>
        {description && (
          <p className="mt-4 text-base leading-relaxed text-calea-text-muted lg:text-lg">
            {description}
          </p>
        )}
      </div>
      {action && <div className="w-full shrink-0 sm:w-auto">{action}</div>}
    </header>
  );
}

export function Section({
  title,
  description,
  action,
  children,
  className = "",
}: {
  title?: string;
  description?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`mb-[var(--section-gap)] last:mb-0 ${className}`}>
      {(title || action) && (
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between lg:mb-10">
          <div>
            {title && (
              <h2 className="font-display text-xl font-extrabold tracking-tight lg:text-2xl">
                {title}
              </h2>
            )}
            {description && (
              <p className="mt-1.5 text-sm text-calea-text-muted">{description}</p>
            )}
          </div>
          {action}
        </div>
      )}
      {children}
    </section>
  );
}

export function Panel({
  children,
  accent,
  className = "",
}: {
  children: ReactNode;
  accent?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`p-6 sm:p-8 lg:p-10 ${accent ? "on-accent" : "surface-card"} ${className}`}
    >
      {children}
    </div>
  );
}

export function EditorShell({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`editor-shell ${className}`}>
      {children}
    </div>
  );
}

export function EditorSection({
  title,
  description,
  action,
  children,
}: {
  title?: string;
  description?: string;
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="editor-section">
      {(title || action) && (
        <div className="editor-section-header">
          <div>
            {title && <h2 className="editor-section-title">{title}</h2>}
            {description && (
              <p className="mt-1.5 text-sm text-calea-text-muted">{description}</p>
            )}
          </div>
          {action}
        </div>
      )}
      {children}
    </section>
  );
}

export function FormFields({ children }: { children: ReactNode }) {
  return <div className="form-fields">{children}</div>;
}

export function FormField({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor?: string;
  children: ReactNode;
}) {
  return (
    <div className="form-field">
      <label htmlFor={htmlFor} className="field-label">
        {label}
      </label>
      {children}
    </div>
  );
}

export function List({ children }: { children: ReactNode }) {
  return <ul className="list-shell divide-lines">{children}</ul>;
}

export function ListItem({
  href,
  onClick,
  title,
  meta,
  trailing,
  alt,
}: {
  href?: string;
  onClick?: () => void;
  title: string;
  meta?: string;
  trailing?: ReactNode;
  alt?: boolean;
}) {
  const inner = (
    <>
      <div className="min-w-0 flex-1">
        <div className="truncate font-display text-base font-extrabold">{title}</div>
        {meta && (
          <div className="accent-text-muted mt-1 truncate text-sm font-medium">{meta}</div>
        )}
      </div>
      {trailing && <div className="shrink-0">{trailing}</div>}
    </>
  );

  const className = `list-row text-calea-text no-underline hover:text-calea-text ${alt ? "list-row--alt" : ""}`;

  if (href) {
    return (
      <li>
        <Link href={href} className={className}>
          {inner}
        </Link>
      </li>
    );
  }

  return (
    <li>
      <button type="button" onClick={onClick} className={className}>
        {inner}
      </button>
    </li>
  );
}

export function StatInline({ items }: { items: { label: string; value: string }[] }) {
  return (
    <dl className="stat-inline surface-card">
      {items.map((item) => (
        <div key={item.label} className="stat-inline-item">
          <dt className="stat-inline-label">{item.label}</dt>
          <dd className="stat-inline-value">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}

export function FilterPills({
  options,
  value,
  onChange,
}: {
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="mb-8 flex flex-wrap gap-3">
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          onClick={() => onChange(opt)}
          className={`filter-pill ${value === opt ? "filter-pill--active" : ""}`}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

export function BackLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className="back-link mb-10 inline-block text-sm no-underline lg:mb-12">
      {children}
    </Link>
  );
}
