# Pre-built Prompts for Gemini

## Claude Code Optimized Prompts

These prompts return minimal, actionable output that Claude can directly use.

### Actionable File List

```
Find [ISSUE TYPE]. Return ONLY a list, one per line:
filepath:lineNumber: brief description

No explanations. No summaries. Just the list.
```

### Concise Summary

```
Summarize in exactly 5 bullet points. Each bullet max 15 words.
Focus on: [specific aspects Claude needs to know]
```

### Decision Support

```
Compare approaches for [X]. Return:
RECOMMENDED: [one approach]
REASON: [one sentence]
ALTERNATIVES: [brief list if relevant]
```

### Quick Answer

```
Answer in 3 sentences max. Include relevant file paths.
```

---

## Standard Prompts

### Architecture Review

```
Analyze this codebase architecture:
1. Identify the tech stack and frameworks
2. Describe the overall architecture pattern
3. List key modules and their responsibilities
4. Evaluate separation of concerns
5. Suggest architectural improvements
```

## Security Audit

```
Perform a security audit:
1. Check for hardcoded secrets or credentials
2. Identify injection vulnerabilities (SQL, command, XSS)
3. Review authentication/authorization patterns
4. Check input validation and sanitization
5. Flag unsafe dependencies or patterns
```

## Performance Analysis

```
Analyze for performance issues:
1. Identify algorithmic inefficiencies
2. Check for unnecessary computations or loops
3. Review memory usage patterns
4. Identify blocking operations
5. Suggest optimizations
```

## Refactoring Opportunities

```
Identify refactoring opportunities:
1. Find code duplication
2. Identify overly complex functions (high cyclomatic complexity)
3. Check for proper abstraction levels
4. Find dead or unreachable code
5. Suggest design pattern applications
```

## Dependency Review

```
Review project dependencies:
1. Identify outdated packages
2. Flag known security vulnerabilities
3. Find unused dependencies
4. Check for duplicate functionality
5. Suggest lighter alternatives
```

## Test Quality

```
Evaluate test quality:
1. Estimate coverage of critical paths
2. Identify missing edge case tests
3. Check test isolation and independence
4. Review assertion quality
5. Suggest additional test scenarios
```
