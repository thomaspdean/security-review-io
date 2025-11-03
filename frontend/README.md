# Security Review Practice Platform

A Next.js-based web application for practicing security code review skills. Identify vulnerabilities in real-world code examples and improve your security expertise.

## Features

- **Problem Catalog**: Browse security vulnerabilities across multiple categories (SQLi, XSS, Crypto, Auth, Deserialization)
- **Code Viewer**: Read-only code viewer with syntax highlighting and line numbers using CodeMirror 6
- **Search & Filter**: Find problems by title, topic, tags, or difficulty level
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Dark Mode Ready**: UI supports system preference for light/dark mode

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui components
- **Code Viewer**: CodeMirror 6
- **Icons**: Lucide React
- **Testing**: Playwright (E2E)
- **Linting**: ESLint + Prettier

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Installation

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run test:e2e` - Run Playwright E2E tests

## Project Structure

```
frontend/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   ├── problems/          # Problems pages
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── ProblemCard.tsx
│   ├── ProblemList.tsx
│   ├── CodeViewer.tsx
│   └── FileTabs.tsx
├── lib/                   # Utilities and helpers
│   ├── types.ts          # TypeScript types
│   ├── problems.ts       # Data loading functions
│   └── utils.ts          # Utility functions
├── data/                  # Mock data
│   ├── problems.json     # Problem catalog
│   └── problems/         # Code files for each problem
└── e2e/                   # Playwright tests
```

## Adding New Problems

1. **Edit the catalog**: Add a new entry to `/data/problems.json`:
   ```json
   {
     "slug": "new-vulnerability",
     "title": "New Vulnerability Type",
     "topic": "sqli",
     "difficulty": 3,
     "summary": "Description of the vulnerability",
     "files": [
       {
         "path": "main.py",
         "language": "python",
         "src": "main.py"
       }
     ],
     "tags": ["CWE-XXX"]
   }
   ```

2. **Add code files**: Create a directory `/data/problems/new-vulnerability/` and add the code file(s) referenced in the catalog entry.

3. **Verify**: The problem should appear automatically in the problems list.

## Conventions

### TypeScript Types

All types are defined in `/lib/types.ts`. Main types:
- `Problem`: Problem metadata from JSON
- `ProblemWithContent`: Problem with file contents loaded
- `Topic`: Security vulnerability topic
- `Language`: Supported programming language

### Components

- Server components are used for data fetching (pages)
- Client components (marked with `"use client"`) handle interactivity
- Reusable UI components live in `/components/ui/`
- Feature components in `/components/`

### Styling

- Tailwind CSS utility classes
- shadcn/ui components for consistent UI
- CSS variables for theme support (light/dark)
- Responsive design with mobile-first approach

## Roadmap

### Coming Next

- [ ] Line selection in code viewer
- [ ] Vulnerability annotation and highlighting
- [ ] Scoring system and submission tracking
- [ ] User authentication
- [ ] Database integration for persistence
- [ ] Leaderboards
- [ ] Problem hints and solutions

## Development Notes

- Data is currently loaded from local JSON files (no database)
- All code files are read from the filesystem at build/runtime
- The health check endpoint is available at `/api/health`
- E2E tests verify critical user flows

## License

This project is for educational purposes.

