export type PageTheme = "orange" | "pink" | "green" | "blue" | "yellow";

export const themeAttr = (theme: PageTheme) => ({ "data-theme": theme });

export const TEACHER_DASHBOARD_THEME = "orange" as const;

export const TEACHER_PROFILE_ACCENT = "bg-calea-orange text-calea-off-white";
