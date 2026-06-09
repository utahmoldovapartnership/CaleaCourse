"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { useApp } from "@/components/providers/AppProvider";
import { Button } from "@/components/ui/Button";
import {
  AppPage,
  BackLink,
  EditorSection,
  EditorShell,
  FormField,
  FormFields,
  PageHeader,
} from "@/components/ui/Page";

export default function ProfilePage() {
  const { session, ready, updateProfile } = useApp();
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!ready) return;
    if (!session) {
      router.replace("/login");
      return;
    }
    setName(session.name);
    setEmail(session.email);
  }, [ready, session, router]);

  if (!ready || !session) return null;

  const homeHref = session.role === "teacher" ? "/teacher" : "/student";

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    updateProfile({ name: name.trim(), email: email.trim() });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div data-theme={session.role === "teacher" ? "orange" : "blue"}>
      <AppPage narrow>
        <BackLink href={homeHref}>← Back</BackLink>

        <PageHeader
          eyebrow="Account"
          title="Edit profile"
          description="Update your name and email. Changes apply across Calea."
        />

        <EditorShell>
          <EditorSection title="Your details">
            <form onSubmit={handleSubmit}>
              <FormFields>
                <FormField label="Full name" htmlFor="profile-name">
                  <input
                    id="profile-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="field-input"
                  />
                </FormField>
                <FormField label="Email" htmlFor="profile-email">
                  <input
                    id="profile-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="field-input"
                  />
                </FormField>
              </FormFields>
              <div className="mt-8 flex items-center gap-3">
                <Button type="submit" size="sm">
                  Save changes
                </Button>
                {saved && (
                  <span className="text-sm font-semibold accent-text">Saved</span>
                )}
              </div>
            </form>
          </EditorSection>
        </EditorShell>
      </AppPage>
    </div>
  );
}
