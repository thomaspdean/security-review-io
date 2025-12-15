# Plan for Writing Problems and Their Functionality

## Overview
This document outlines a structured approach to creating security problems and implementing the interactive features that make code review practice effective.

---

## Phase 1: Problem Structure Enhancement (Current → Next)

### 1.1 Expand Problem Metadata Schema

**Current State**: Basic problem info (slug, title, topic, difficulty, summary, files, tags)

**Enhancements Needed**:
```typescript
// In lib/types.ts - extend Problem type
export type Problem = {
  // ... existing fields ...
  
  // New fields for interactive features
  hints?: string[];              // Progressive hints
  solution?: {
    explanation: string;          // Detailed explanation
    vulnerableLines: number[];    // Line numbers with issues
    fixes?: Array<{
      file: string;
      line: number;
      before: string;
      after: string;
    }>;
  };
  testCases?: Array<{
    input: string;
    expectedOutput?: string;
    isVulnerable: boolean;
  }>;
  learningObjectives?: string[];  // What students should learn
  references?: Array<{
    title: string;
    url: string;
  }>;
};
```

### 1.2 Problem Difficulty Tiers

Establish clear criteria:
- **Level 1**: Single vulnerability, obvious pattern, basic fix
- **Level 2**: Single vulnerability, requires understanding of context
- **Level 3**: Multiple related vulnerabilities, or subtle issue
- **Level 4**: Complex vulnerability, requires deep security knowledge
- **Level 5**: Advanced, multi-step exploitation, or novel patterns

---

## Phase 2: Interactive Code Review Features

### 2.1 Line Selection & Annotation

**Goal**: Allow users to select vulnerable lines and add annotations

**Implementation Plan**:

1. **Enhance CodeViewer Component**
   ```typescript
   // Add selection tracking
   interface CodeViewerProps {
     // ... existing props ...
     selectedLines?: number[];
     onLineSelect?: (lines: number[]) => void;
     annotations?: Array<{
       line: number;
       type: 'vulnerability' | 'note' | 'fix';
       message: string;
     }>;
   }
   ```

2. **CodeMirror Extensions**
   - Use `@codemirror/view` selection handling
   - Add line highlight decorations
   - Implement click-to-select functionality
   - Show annotation markers on hover/click

3. **UI Components Needed**
   - Line selection controls (single line, range)
   - Annotation panel/sidebar
   - Submit selection button

**Files to Create/Modify**:
- `components/CodeViewer.tsx` - Add selection support
- `components/AnnotationPanel.tsx` - New component
- `components/LineSelector.tsx` - Selection controls

### 2.2 Submission & Scoring System

**Goal**: Allow users to submit their findings and receive feedback

**Data Model**:
```typescript
export type Submission = {
  problemSlug: string;
  userId: string;  // For future auth
  selectedLines: number[];
  annotations: Array<{
    line: number;
    type: string;
    comment: string;
  }>;
  score?: number;
  feedback?: string;
  submittedAt: Date;
};
```

**Scoring Algorithm**:
- **Perfect Match**: All vulnerable lines identified correctly (100%)
- **Partial Credit**: Identified primary vulnerabilities but missed secondary (75%)
- **False Positives**: Correct lines + incorrect lines (penalize)
- **Missed Vulnerabilities**: Missing critical lines (penalize heavily)

**Implementation Steps**:
1. Create submission API route (`/app/api/submissions/route.ts`)
2. Add submission form component
3. Implement scoring logic
4. Display feedback to user

---

## Phase 3: Problem Writing Workflow

### 3.1 Problem Template Structure

Create a standardized template for new problems:

```
/data/problems/[slug]/
  ├── README.md          # Problem description, learning objectives
  ├── code/
  │   ├── vulnerable/    # Original vulnerable code
  │   │   └── [files]
  │   └── fixed/         # Secure version (optional for now)
  │       └── [files]
  ├── solution.md        # Detailed explanation
  ├── hints.md           # Progressive hints
  └── metadata.json      # Extended problem metadata
```

### 3.2 Problem Writing Checklist

For each new problem, ensure:

- [ ] **Clear Vulnerability**: The issue is obvious enough to teach, but not trivial
- [ ] **Realistic Context**: Code looks like real-world examples
- [ ] **Educational Value**: Teaches a specific security concept
- [ ] **Proper Metadata**: All fields filled in (topic, difficulty, tags)
- [ ] **Code Quality**: Vulnerable code is syntactically correct and runnable
- [ ] **Documentation**: README explains the vulnerability type
- [ ] **Solution**: Detailed explanation with fix examples
- [ ] **Test Cases**: Example inputs that trigger the vulnerability

### 3.3 Problem Categories Roadmap

**SQL Injection (SQLi)**
- ✅ Basic SQLi in login (done)
- [ ] SQLi in search/filter
- [ ] SQLi in UPDATE statements
- [ ] Second-order SQLi
- [ ] NoSQL injection

**Cross-Site Scripting (XSS)**
- ✅ Basic reflected XSS (done)
- [ ] Stored XSS
- [ ] DOM-based XSS
- [ ] XSS in template engines
- [ ] Content Security Policy bypass

**Authentication & Authorization**
- ✅ Session fixation (done)
- [ ] Weak password policies
- [ ] JWT vulnerabilities
- [ ] OAuth misconfigurations
- [ ] Privilege escalation

**Cryptography**
- ✅ Weak encryption (done)
- [ ] Hardcoded encryption keys
- [ ] Weak random number generation
- [ ] Certificate validation bypass

**Deserialization**
- ✅ Unsafe deserialization (done)
- [ ] JSON deserialization attacks
- [ ] XML external entity (XXE)

**Other OWASP Top 10**
- [ ] Server-Side Request Forgery (SSRF)
- [ ] XML External Entity (XXE)
- [ ] Security Misconfiguration
- [ ] Sensitive Data Exposure
- [ ] Insecure Components

---

## Phase 4: Enhanced Problem Experience

### 4.1 Hints System

**Progressive Hints**:
- First hint: General category (e.g., "Look at user input handling")
- Second hint: Specific area (e.g., "Check the SQL query construction")
- Third hint: Vulnerability type (e.g., "This is a SQL injection")
- Fourth hint: Exact location (e.g., "Line 23 is vulnerable")

**Implementation**:
```typescript
// Component: ProblemHints.tsx
- "Reveal Hint" button with counter
- Hint display area
- Track which hints were viewed (for analytics)
```

### 4.2 Solution View

**After Submission**:
- Show correct vulnerable lines
- Display detailed explanation
- Compare user's selection with correct answer
- Show secure code version (if available)
- Provide links to learning resources

### 4.3 Learning Resources Integration

For each problem:
- OWASP Top 10 references
- CWE database links
- Relevant security blogs/articles
- Video tutorials (optional)

---

## Phase 5: Problem Management Tools

### 5.1 Problem Validation Script

Create a script to validate problems:
```bash
npm run validate:problems
```

Checks:
- All required files exist
- JSON schema is valid
- Code files are readable
- Solution metadata matches code
- Vulnerable lines are correctly specified

### 5.2 Problem Generator Template

CLI tool to scaffold new problems:
```bash
npm run create:problem [slug]
```

Generates:
- Directory structure
- Metadata template
- README template
- Placeholder code files

---

## Phase 6: Advanced Features (Future)

### 6.1 Code Execution Sandbox
- Run vulnerable code in isolated environment
- Demonstrate exploitation
- Show fixes in action

### 6.2 Interactive Fixes
- Code editor for fixing vulnerabilities
- Diff viewer to compare changes
- Automated fix validation

### 6.3 Progress Tracking
- User profile with completed problems
- Difficulty progression tracking
- Badges/achievements

### 6.4 Community Features
- Discussion threads per problem
- User-submitted problems (moderated)
- Leaderboards

---

## Immediate Next Steps (Recommended Order)

### Week 1: Core Interactivity
1. ✅ **Line Selection** - Make CodeViewer interactive
2. ✅ **Annotation System** - Allow users to mark lines with notes
3. ✅ **Submission Form** - Basic form to submit findings

### Week 2: Scoring & Feedback
4. ✅ **Scoring Algorithm** - Implement basic scoring logic
5. ✅ **Feedback Display** - Show results after submission
6. ✅ **Solution View** - Display correct answer and explanation

### Week 3: Problem Enhancement
7. ✅ **Extended Metadata** - Add hints, solutions to schema
8. ✅ **Hints System UI** - Progressive hint reveal
9. ✅ **Write 3-5 More Problems** - Using the enhanced structure

### Week 4: Polish & Testing
10. ✅ **Problem Validation** - Scripts to ensure quality
11. ✅ **Documentation** - Guide for writing new problems
12. ✅ **Testing** - E2E tests for submission flow

---

## Problem Writing Examples

### Example: SQLi in Search

**Problem Structure**:
```json
{
  "slug": "sqli-search",
  "title": "SQL Injection in Search Function",
  "topic": "sqli",
  "difficulty": 2,
  "summary": "The search functionality concatenates user input directly into SQL queries without sanitization.",
  "files": [
    {
      "path": "search.py",
      "language": "python",
      "src": "search.py"
    }
  ],
  "solution": {
    "explanation": "The search function uses string formatting to build SQL queries, allowing attackers to inject arbitrary SQL. Use parameterized queries instead.",
    "vulnerableLines": [15, 16],
    "fixes": [
      {
        "file": "search.py",
        "line": 15,
        "before": "query = f\"SELECT * FROM products WHERE name LIKE '%{search_term}%'\"",
        "after": "query = \"SELECT * FROM products WHERE name LIKE ?\"\ncursor.execute(query, (f'%{search_term}%',))"
      }
    ]
  },
  "hints": [
    "Look at how the search term is used in the SQL query",
    "The search function builds the query using string formatting",
    "User input should never be directly concatenated into SQL",
    "Use parameterized queries or prepared statements"
  ],
  "references": [
    {
      "title": "OWASP SQL Injection",
      "url": "https://owasp.org/www-community/attacks/SQL_Injection"
    }
  ]
}
```

---

## Metrics for Success

Track these to measure problem quality:
- **Completion Rate**: % of users who submit (vs. just viewing)
- **Accuracy Rate**: Average score per problem
- **Hint Usage**: How many hints users need
- **Time to Complete**: Average time per problem
- **False Positive Rate**: Lines incorrectly marked as vulnerable

---

## Resources for Problem Writers

### Security Standards
- OWASP Top 10: https://owasp.org/www-project-top-ten/
- CWE Top 25: https://cwe.mitre.org/top25/
- CVE Database: https://cve.mitre.org/

### Code Examples
- OWASP Code Review Guide
- Real-world vulnerability reports (HackerOne, Bugcrowd)
- Security CTF challenges

### Tools
- Static analysis tools (to find real vulnerabilities)
- Code review checklists
- Secure coding guidelines per language

---

This plan provides a structured path from the current skeleton to a fully functional, educational security code review platform.


