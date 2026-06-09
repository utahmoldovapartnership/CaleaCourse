import Link from "next/link";
import { type ButtonHTMLAttributes, type ReactNode } from "react";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "onBrand"
  | "onAccentOutline"
  | "ghost"
  | "muted";

type Size = "sm" | "md" | "lg";

const variantClass: Record<ButtonVariant, string> = {
  primary: "btn-primary",
  secondary: "btn-secondary",
  onBrand: "btn-on-brand",
  onAccentOutline: "btn-on-accent-outline",
  ghost: "btn-ghost",
  muted: "btn-muted",
};

const sizeClass: Record<Size, string> = {
  sm: "btn-sm",
  md: "btn-md",
  lg: "btn-lg",
};

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: Size;
  fullWidth?: boolean;
  children: ReactNode;
};

export function Button({
  variant = "primary",
  size = "md",
  fullWidth,
  className = "",
  children,
  ...props
}: Props) {
  return (
    <button
      className={`btn ${variantClass[variant]} ${sizeClass[size]} ${fullWidth ? "btn-full" : ""} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

type LinkButtonProps = {
  href: string;
  variant?: ButtonVariant;
  size?: Size;
  fullWidth?: boolean;
  className?: string;
  children: ReactNode;
};

export function LinkButton({
  href,
  variant = "primary",
  size = "md",
  fullWidth,
  className = "",
  children,
}: LinkButtonProps) {
  return (
    <Link
      href={href}
      className={`btn ${variantClass[variant]} ${sizeClass[size]} ${fullWidth ? "btn-full" : ""} ${className}`}
    >
      {children}
    </Link>
  );
}
