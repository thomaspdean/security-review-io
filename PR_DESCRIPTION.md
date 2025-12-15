# Frontend Skeleton Implementation

## Overview
This PR adds the initial frontend skeleton for the Security Review Practice Platform using Next.js 14 with App Router, TypeScript, and Tailwind CSS.

## Features Added

### Core Setup
- ✅ Next.js 14 with App Router and TypeScript
- ✅ Tailwind CSS + shadcn/ui component library
- ✅ CodeMirror 6 integration for code viewing
- ✅ ESLint + Prettier configuration
- ✅ Playwright E2E testing setup

### Pages
- ✅ **Home Page** (`/`) - Hero section with featured problems grid
- ✅ **Problems Index** (`/problems`) - Searchable, filterable list of all problems
- ✅ **Problem Detail** (`/problems/[slug]`) - Individual problem view with file tabs and code viewer
- ✅ **404 Handling** - Custom not-found page for invalid problem slugs

### Components
- `Header` - Navigation with logo and links
- `Footer` - Site footer
- `ProblemCard` - Problem preview card with difficulty indicators
- `ProblemList` - Filterable, sortable list component
- `FileTabs` - Tab navigation for code files
- `CodeViewer` - CodeMirror 6 wrapper with syntax highlighting

### Data & API
- ✅ Mock data system with 5 example security problems
- ✅ File-based data loading (no database yet)
- ✅ Health check API endpoint (`/api/health`)

### Mock Problems Included
1. SQLi in login handler (Python)
2. XSS in template output (HTML)
3. Weak encryption implementation (JavaScript)
4. Session fixation vulnerability (JavaScript)
5. Unsafe deserialization (Python)

## Testing
- ✅ Playwright E2E test covering: Home → Problems → Problem Detail flow
- ✅ All linting passes
- ✅ Build succeeds

## Developer Experience
- ✅ Comprehensive README with setup instructions
- ✅ All npm scripts configured (dev, build, start, lint, test:e2e)
- ✅ TypeScript types throughout
- ✅ Responsive design (mobile-first)

## Next Steps (Out of Scope)
- Line selection in code viewer
- Submission/scoring system
- User authentication
- Database integration
- Problem hints and solutions

## How to Test Locally

```bash
cd frontend
npm install
npm run dev
```

Visit `http://localhost:3000` and verify:
- Home page displays hero and featured problems
- Problems page shows all problems with working search/filters
- Clicking a problem navigates to detail page
- Code viewer displays with syntax highlighting and line numbers

## Screenshots
_Add screenshots of the main pages here_

---

**PR Link**: Create at https://github.com/thomaspdean/security-review-io/pull/new/feat/frontend-skeleton


