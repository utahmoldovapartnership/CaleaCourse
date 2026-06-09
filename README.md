# Calea Courses — Next.js

React + Next.js rebuild of the Calea Courses mockup, structured like high-performing product flows (Google Workspace / Google Classroom patterns):

- **Auth**: centered sign-in, minimal chrome, split hero
- **App shell**: left rail nav, sticky top bar with search, profile avatar
- **Content**: white main area, off-white chrome, color-block cards (no borders)

## Run locally

```bash
cd web
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Flow

| Route | Screen |
|---|---|
| `/login` | Sign in |
| `/role` | Teacher / Student picker |
| `/teacher` | Teacher dashboard |
| `/teacher/courses` | Course list |
| `/teacher/courses/new` | New course |
| `/teacher/courses/[id]` | Course editor |
| `/teacher/students` | Student roster |
| `/teacher/classes` | Class list + invite codes |
| `/student` | Student course list |
| `/student/courses/[id]` | Practice runner |

Static HTML mockups remain in `../mockups/` for reference.
