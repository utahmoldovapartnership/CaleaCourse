import {
  AppPage,
  List,
  ListItem,
  PageHeader,
} from "@/components/ui/Page";
import { LinkButton } from "@/components/ui/Button";

const classes = [
  { name: "Period 2 Algebra", course: "Introduction to Algebra", students: 12, code: "ALG-2P" },
  { name: "World History — Block B", course: "World History", students: 10, code: "WH-B" },
  { name: "Creative Writing Club", course: "Creative Writing Basics", students: 6, code: "CW-CLUB" },
];

export default function ClassesPage() {
  return (
    <AppPage>
      <PageHeader
        eyebrow="Classes"
        title="Your classes"
        description="Rosters and invite codes for each group."
        action={
          <LinkButton href="/teacher/students" variant="muted" size="sm">
            All students
          </LinkButton>
        }
      />

      <List>
        {classes.map((cls, i) => (
          <ListItem
            key={cls.code}
            href="/teacher/students"
            title={cls.name}
            meta={`${cls.course} · ${cls.students} students · Code ${cls.code}`}
            alt={i % 2 === 1}
          />
        ))}
      </List>
    </AppPage>
  );
}
