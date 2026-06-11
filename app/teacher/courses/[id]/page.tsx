"use client";

import { notFound, useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import {
  HiOutlineChevronDown,
  HiOutlinePencil,
  HiOutlineTrash,
} from "react-icons/hi";
import { useApp } from "@/components/providers/AppProvider";
import {
  AppPage,
  BackLink,
  EditorSection,
  EditorShell,
  FormField,
  FormFields,
  PageHeader,
} from "@/components/ui/Page";
import { Button, LinkButton } from "@/components/ui/Button";

export default function CourseEditorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const {
    ready,
    getCourse,
    updateCourse,
    deleteCourse,
    addChapter,
    updateChapter,
    deleteChapter,
    addQuestion,
    updateQuestion,
    deleteQuestion,
  } = useApp();

  const [openChapter, setOpenChapter] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [saved, setSaved] = useState(false);
  const [newChapterTitle, setNewChapterTitle] = useState("");
  const [newQuestion, setNewQuestion] = useState<Record<string, string>>({});
  const [editingChapter, setEditingChapter] = useState<string | null>(null);
  const [editingChapterTitle, setEditingChapterTitle] = useState("");
  const [editingQuestion, setEditingQuestion] = useState<{
    chapterId: string;
    index: number;
    text: string;
  } | null>(null);

  const course = ready ? getCourse(id) : undefined;

  useEffect(() => {
    if (!course) return;
    setTitle(course.title);
    setDescription(course.description);
    setOpenChapter((prev) => prev ?? course.chapters[0]?.id ?? null);
  }, [course]);

  if (!ready) return null;
  if (!course) notFound();

  const totalQuestions = course.chapters.reduce(
    (sum, ch) => sum + ch.questions.length,
    0,
  );

  function handleSave() {
    updateCourse(id, { title, description });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  function handleDelete() {
    if (!confirm(`Delete "${course!.title}"? This cannot be undone.`)) return;
    deleteCourse(id);
    router.push("/teacher/courses");
  }

  function handleAddChapter() {
    const trimmed = newChapterTitle.trim();
    if (!trimmed) return;
    const chapterId = addChapter(id, trimmed);
    setNewChapterTitle("");
    setOpenChapter(chapterId);
  }

  function handleAddQuestion(chapterId: string) {
    const text = (newQuestion[chapterId] ?? "").trim();
    if (!text) return;
    addQuestion(id, chapterId, text);
    setNewQuestion((prev) => ({ ...prev, [chapterId]: "" }));
  }

  function startChapterRename(chapterId: string, currentTitle: string) {
    setEditingChapter(chapterId);
    setEditingChapterTitle(currentTitle);
    setOpenChapter(chapterId);
  }

  function saveChapterRename(chapterId: string) {
    const trimmed = editingChapterTitle.trim();
    if (trimmed) updateChapter(id, chapterId, trimmed);
    setEditingChapter(null);
    setEditingChapterTitle("");
  }

  return (
    <AppPage>
      <BackLink href="/teacher/courses">← Courses</BackLink>

      <PageHeader
        eyebrow="Course editor"
        title={title || course.title}
        description="Update course info and manage chapters below."
        action={
          <div className="flex flex-wrap gap-2">
            <Button variant="muted" size="sm" onClick={handleSave}>
              {saved ? "Saved" : "Save"}
            </Button>
            <LinkButton href={`/teacher/courses/${id}/preview`} variant="secondary" size="sm">
              Preview
            </LinkButton>
            <Button variant="ghost" size="sm" onClick={handleDelete}>
              Delete
            </Button>
          </div>
        }
      />

      <EditorShell>
        <EditorSection
          title="Details"
          description="Name and description shown to students."
        >
          <FormFields>
            <FormField label="Title" htmlFor="course-title">
              <input
                id="course-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Course title"
                className="field-input"
              />
            </FormField>
            <FormField label="Description" htmlFor="course-description">
              <textarea
                id="course-description"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="What will students learn?"
                className="field-input resize-y"
              />
            </FormField>
          </FormFields>
        </EditorSection>

        <EditorSection
          title="Chapters"
          description={`${course.chapters.length} chapters · ${totalQuestions} questions`}
        >
          <div className="chapter-list">
            {course.chapters.length === 0 ? (
              <div className="editor-empty">
                <p className="editor-empty-title">No chapters yet</p>
                <p className="editor-empty-text">
                  Add your first chapter below, then fill it with questions.
                </p>
              </div>
            ) : (
              course.chapters.map((chapter) => {
                const isOpen = openChapter === chapter.id;
                const isRenaming = editingChapter === chapter.id;

                return (
                  <div
                    key={chapter.id}
                    className={`chapter-card ${isOpen ? "chapter-card--open" : ""}`}
                  >
                    <div className="chapter-card-header">
                      {isRenaming ? (
                        <div className="chapter-rename-row">
                          <input
                            value={editingChapterTitle}
                            onChange={(e) => setEditingChapterTitle(e.target.value)}
                            className="field-input field-input--compact chapter-card-title-input flex-1"
                            autoFocus
                            onKeyDown={(e) => {
                              if (e.key === "Enter") saveChapterRename(chapter.id);
                              if (e.key === "Escape") setEditingChapter(null);
                            }}
                          />
                          <Button
                            size="sm"
                            onClick={() => saveChapterRename(chapter.id)}
                            disabled={!editingChapterTitle.trim()}
                          >
                            Save
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setEditingChapter(null)}
                          >
                            Cancel
                          </Button>
                        </div>
                      ) : (
                        <>
                          <button
                            type="button"
                            onClick={() => setOpenChapter(isOpen ? null : chapter.id)}
                            className="chapter-card-toggle"
                            aria-expanded={isOpen}
                          >
                            <HiOutlineChevronDown
                              className="chapter-card-chevron"
                              aria-hidden="true"
                            />
                            <span className="chapter-card-info">
                              <span className="chapter-card-title">{chapter.title}</span>
                              <span className="chapter-card-meta">
                                {chapter.questions.length}{" "}
                                {chapter.questions.length === 1 ? "question" : "questions"}
                              </span>
                            </span>
                          </button>
                          <div className="chapter-card-actions">
                            <button
                              type="button"
                              className="icon-btn"
                              aria-label={`Rename ${chapter.title}`}
                              onClick={() => startChapterRename(chapter.id, chapter.title)}
                            >
                              <HiOutlinePencil className="h-4 w-4" aria-hidden="true" />
                            </button>
                            <button
                              type="button"
                              className="icon-btn icon-btn--danger"
                              aria-label={`Delete ${chapter.title}`}
                              onClick={() => {
                                if (confirm(`Delete "${chapter.title}"?`)) {
                                  deleteChapter(id, chapter.id);
                                }
                              }}
                            >
                              <HiOutlineTrash className="h-4 w-4" aria-hidden="true" />
                            </button>
                          </div>
                        </>
                      )}
                    </div>

                    {isOpen && !isRenaming && (
                      <div className="chapter-card-body">
                        {chapter.questions.length === 0 ? (
                          <p className="chapter-card-empty">
                            No questions in this chapter yet. Add one below.
                          </p>
                        ) : (
                          <ol className="question-list">
                            {chapter.questions.map((q, index) => {
                              const isEditing =
                                editingQuestion?.chapterId === chapter.id &&
                                editingQuestion.index === index;

                              return (
                                <li key={`${chapter.id}-${index}`} className="question-row">
                                  <span className="question-num">{index + 1}</span>
                                  <div className="question-body">
                                    {isEditing ? (
                                      <input
                                        value={editingQuestion.text}
                                        onChange={(e) =>
                                          setEditingQuestion({
                                            ...editingQuestion,
                                            text: e.target.value,
                                          })
                                        }
                                        className="field-input field-input--compact"
                                        autoFocus
                                        onKeyDown={(e) => {
                                          if (
                                            e.key === "Enter" &&
                                            editingQuestion.text.trim()
                                          ) {
                                            updateQuestion(
                                              id,
                                              chapter.id,
                                              index,
                                              editingQuestion.text,
                                            );
                                            setEditingQuestion(null);
                                          }
                                          if (e.key === "Escape") {
                                            setEditingQuestion(null);
                                          }
                                        }}
                                      />
                                    ) : (
                                      q
                                    )}
                                  </div>
                                  <div className="question-actions">
                                    {isEditing ? (
                                      <>
                                        <Button
                                          size="sm"
                                          onClick={() => {
                                            if (editingQuestion.text.trim()) {
                                              updateQuestion(
                                                id,
                                                chapter.id,
                                                index,
                                                editingQuestion.text,
                                              );
                                            }
                                            setEditingQuestion(null);
                                          }}
                                        >
                                          Save
                                        </Button>
                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          onClick={() => setEditingQuestion(null)}
                                        >
                                          Cancel
                                        </Button>
                                      </>
                                    ) : (
                                      <>
                                        <button
                                          type="button"
                                          className="icon-btn"
                                          aria-label="Edit question"
                                          onClick={() =>
                                            setEditingQuestion({
                                              chapterId: chapter.id,
                                              index,
                                              text: q,
                                            })
                                          }
                                        >
                                          <HiOutlinePencil
                                            className="h-4 w-4"
                                            aria-hidden="true"
                                          />
                                        </button>
                                        <button
                                          type="button"
                                          className="icon-btn icon-btn--danger"
                                          aria-label="Remove question"
                                          onClick={() =>
                                            deleteQuestion(id, chapter.id, index)
                                          }
                                        >
                                          <HiOutlineTrash
                                            className="h-4 w-4"
                                            aria-hidden="true"
                                          />
                                        </button>
                                      </>
                                    )}
                                  </div>
                                </li>
                              );
                            })}
                          </ol>
                        )}

                        <div className="editor-add-row">
                          <span className="editor-add-row-label">Add question</span>
                          <input
                            value={newQuestion[chapter.id] ?? ""}
                            onChange={(e) =>
                              setNewQuestion((prev) => ({
                                ...prev,
                                [chapter.id]: e.target.value,
                              }))
                            }
                            placeholder="Type a question…"
                            className="field-input field-input--compact min-w-0 flex-1"
                            onKeyDown={(e) =>
                              e.key === "Enter" && handleAddQuestion(chapter.id)
                            }
                          />
                          <Button
                            size="sm"
                            onClick={() => handleAddQuestion(chapter.id)}
                            disabled={!(newQuestion[chapter.id] ?? "").trim()}
                          >
                            Add
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            )}

            <div className="editor-add-row">
              <span className="editor-add-row-label">Add chapter</span>
              <input
                value={newChapterTitle}
                onChange={(e) => setNewChapterTitle(e.target.value)}
                placeholder="Chapter title…"
                className="field-input field-input--compact min-w-0 flex-1"
                onKeyDown={(e) => e.key === "Enter" && handleAddChapter()}
              />
              <Button size="sm" onClick={handleAddChapter} disabled={!newChapterTitle.trim()}>
                Add chapter
              </Button>
            </div>
          </div>
        </EditorSection>
      </EditorShell>
    </AppPage>
  );
}
