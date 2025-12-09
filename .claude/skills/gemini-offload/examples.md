# Gemini Offload Examples

## Claude Code Optimized Examples

These examples return actionable output for Claude's workflow.

### Find Files to Edit

```bash
# Get list of files with issues in filepath:line format
git ls-files '*.ts' | while read -r f; do echo "=== $f ==="; cat "$f"; done | \
  gemini -m gemini-3-pro-preview "Find unused imports. Return ONLY: filepath:lineNumber: import statement"
```

### Quick Architecture Summary

```bash
# Get concise summary Claude can scan quickly
(tree -L 2 -I 'node_modules|dist' && cat package.json) | \
  gemini -m gemini-3-pro-preview "Summarize in 5 bullets max. Focus on: entry points, key dependencies, folder purpose"
```

### Get Specific Answers

```bash
# Answer a specific question concisely
git ls-files '*.ts' | while read -r f; do echo "=== $f ==="; cat "$f"; done | \
  gemini -m gemini-3-pro-preview "How is error handling done? Answer in 3 sentences max. Include key file paths."
```

### Decision Support

```bash
# Get a recommendation Claude can act on
git ls-files '*.ts' | while read -r f; do echo "=== $f ==="; cat "$f"; done | \
  gemini -m gemini-3-pro-preview "Should we use class or functional components? Return: RECOMMENDED: [choice] REASON: [one sentence]"
```

---

## Standard Examples

### Architecture Analysis

```bash
# Full project structure review
(tree -L 3 -I 'node_modules|dist|.git|coverage' && \
 cat package.json tsconfig.json 2>/dev/null) | \
  gemini -m gemini-3-pro-preview "Analyze this TypeScript project architecture"
```

### Security Audit

```bash
# Scan for security issues (using git ls-files to respect .gitignore)
git ls-files '*.ts' | while read -r f; do echo "=== $f ==="; cat "$f"; done | \
  gemini -m gemini-3-pro-preview "Perform security audit. Check for: hardcoded secrets, injection vulnerabilities, unsafe patterns"
```

### Dependency Analysis

```bash
# Review dependencies
cat package.json package-lock.json 2>/dev/null | \
  gemini -m gemini-3-pro-preview "Analyze dependencies for: outdated packages, security vulnerabilities, unused deps"
```

### Code Comparison

```bash
# Compare implementations
(echo "=== src/old.ts ===" && cat src/old.ts && \
 echo "=== src/new.ts ===" && cat src/new.ts) | \
  gemini -m gemini-3-pro-preview "Compare these implementations. Highlight differences, improvements, regressions"
```

### Pattern Detection

```bash
# Find patterns across codebase
git ls-files '*.ts' | while read -r f; do echo "=== $f ==="; cat "$f"; done | \
  gemini -m gemini-3-pro-preview "Identify recurring patterns, anti-patterns, and refactoring opportunities"
```

### Test Coverage Analysis

```bash
# Analyze test coverage gaps
(git ls-files '*.ts' ':!:*.test.ts' | while read -r f; do echo "=== Source: $f ==="; cat "$f"; done && \
 echo "=== EXISTING TESTS ===" && \
 git ls-files '*.test.ts' | while read -r f; do echo "=== Test: $f ==="; cat "$f"; done) | \
  gemini -m gemini-3-pro-preview "Analyze test coverage. Identify untested code paths and suggest test cases"
```
