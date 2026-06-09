import Image from "next/image";
import { SiteFooter, SiteHeader } from "@/components/marketing/Marketing";
import { LinkButton } from "@/components/ui/Button";
import type { PageTheme } from "@/lib/theme";

const features: {
  title: string;
  desc: string;
  icon: string;
  theme: PageTheme;
}[] = [
  {
    title: "Build courses",
    desc: "Create chapters and questions with a clean editor — organized and easy to update.",
    icon: "/assets/illustrations/books.svg",
    theme: "orange",
  },
  {
    title: "Run classes",
    desc: "Invite codes, rosters, and assignments in one place.",
    icon: "/assets/illustrations/globe.svg",
    theme: "blue",
  },
  {
    title: "Track progress",
    desc: "See how every student is doing at a glance.",
    icon: "/assets/illustrations/student.svg",
    theme: "green",
  },
];

const audiences: {
  title: string;
  desc: string;
  points: string[];
  icon: string;
  theme: PageTheme;
}[] = [
  {
    title: "For teachers",
    desc: "Set up courses, manage rosters, and see who needs help — all from one dashboard.",
    points: [
      "Build chapters and questions in a focused editor",
      "Share invite codes to add students instantly",
      "Track progress across every class you run",
    ],
    icon: "/assets/illustrations/teacher%202.svg",
    theme: "orange",
  },
  {
    title: "For students",
    desc: "Join a class with a code and practice on your own time, with feedback that keeps you moving.",
    points: [
      "Join a class in seconds with an invite code",
      "Work through questions at your own pace",
      "Get clear feedback as you practice",
    ],
    icon: "/assets/illustrations/student%20materials.svg",
    theme: "blue",
  },
];

const steps = [
  {
    label: "01",
    title: "Create a course",
    desc: "Add chapters and practice questions in minutes.",
  },
  {
    label: "02",
    title: "Invite your class",
    desc: "Share a code so students can join instantly.",
  },
  {
    label: "03",
    title: "Students practice",
    desc: "They work through questions with clear, focused feedback.",
  },
];

export default function LandingPage() {
  return (
    <div className="landing-page flex min-h-screen flex-col bg-calea-off-white" data-theme="orange">
      <SiteHeader />

      <section className="landing-band on-accent">
        <div className="page-wrap page-wrap--wide landing-hero">
          <div className="landing-hero-copy">
            <p className="landing-eyebrow-on-accent">Calea Courses</p>
            <h1 className="font-display text-3xl font-extrabold tracking-tight lg:text-[2.875rem]">
              Learning tools that stay out of your way
            </h1>
            <p className="on-accent-muted mt-5 text-base leading-relaxed lg:text-lg">
              Build interactive courses, run your classes, and let students
              practice — without the clutter.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <LinkButton href="/login" size="lg" variant="onBrand">
                Get started
              </LinkButton>
              <LinkButton href="/login" size="lg" variant="onAccentOutline">
                Sign in
              </LinkButton>
            </div>
          </div>

          <div className="landing-hero-art" aria-hidden="true">
            <Image
              src="/assets/illustrations/stacked%20books%20+%20cap.svg"
              alt=""
              width={520}
              height={460}
              priority
              className="landing-hero-art-image"
            />
          </div>
        </div>
      </section>

      <section className="page-wrap page-wrap--wide landing-section">
        <header className="landing-section-header">
          <p className="eyebrow mb-4">Features</p>
          <h2 className="font-display text-2xl font-extrabold tracking-tight lg:text-3xl">
            Three things Calea handles for you
          </h2>
          <p className="mt-3 max-w-2xl text-base text-calea-text-muted">
            Everything you need to teach interactive material, in a workspace that
            feels calm and clear.
          </p>
        </header>

        <div className="landing-feature-grid">
          {features.map((feature) => (
            <article key={feature.title} className="landing-feature-card">
              <div data-theme={feature.theme} className="landing-feature-art on-accent">
                <Image
                  src={feature.icon}
                  alt=""
                  width={200}
                  height={200}
                  className="landing-feature-art-image"
                />
              </div>
              <div className="landing-feature-body">
                <h3 className="font-display text-xl font-extrabold">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-calea-text-muted">
                  {feature.desc}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="landing-band on-accent" data-theme="pink">
        <div className="page-wrap page-wrap--wide">
          <header className="landing-section-header">
            <p className="landing-eyebrow-on-accent mb-4">How it works</p>
            <h2 className="font-display text-2xl font-extrabold tracking-tight lg:text-3xl">
              From course to classroom in three steps
            </h2>
          </header>

          <ol className="landing-steps">
            {steps.map((step) => (
              <li key={step.label} className="landing-step">
                <span className="landing-step-index">{step.label}</span>
                <div>
                  <h3 className="font-display text-lg font-extrabold">{step.title}</h3>
                  <p className="on-accent-muted mt-1.5 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="page-wrap page-wrap--wide landing-section">
        <header className="landing-section-header">
          <p className="eyebrow mb-4">For everyone</p>
          <h2 className="font-display text-2xl font-extrabold tracking-tight lg:text-3xl">
            One platform, two sides of the classroom
          </h2>
          <p className="mt-3 max-w-2xl text-base text-calea-text-muted">
            Teachers stay organized. Students stay focused. Calea keeps both
            experiences simple.
          </p>
        </header>

        <div className="landing-audience-grid">
          {audiences.map((audience) => (
            <article key={audience.title} className="landing-audience-card">
              <div data-theme={audience.theme} className="landing-audience-art on-accent">
                <Image
                  src={audience.icon}
                  alt=""
                  width={320}
                  height={320}
                  className="landing-audience-art-image"
                />
              </div>
              <div className="landing-audience-body">
                <h3 className="font-display text-xl font-extrabold">{audience.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-calea-text-muted">
                  {audience.desc}
                </p>
                <ul className="landing-audience-list" data-theme={audience.theme}>
                  {audience.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
