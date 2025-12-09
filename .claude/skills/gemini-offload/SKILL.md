---
name: gemini-offload
description: Offload large codebase analysis to Gemini CLI for its 1M token context window. Use when analyzing entire codebases, comparing multiple large files, reviewing project-wide patterns, performing security audits across many files, or when user requests Gemini or a second AI opinion.
allowed-tools: Bash, ReadFile, Glob, Grep
---

# Gemini Offload

Delegate large-scale analysis tasks to Gemini CLI to leverage its 1M+ token context window.

## When to Use

- Full codebase or architecture analysis
- Comparing multiple large files (>100KB total)
- Project-wide pattern detection
- Security or dependency audits across many files
- User explicitly requests Gemini or "second opinion"

## When NOT to Use

- Single file analysis (Claude can handle directly)
- Tasks requiring code modification (use Claude's Edit tool instead)
- Real-time/interactive debugging
- When Gemini CLI is not installed

## Quick Reference

```bash
# Recommended: Use Gemini 3 Pro for best quality (1M token context)
gemini -m gemini-3-pro-preview "your prompt here"

# Pipe files using git ls-files (respects .gitignore)
git ls-files '*.ts' | while read -r f; do echo "=== $f ==="; cat "$f"; done | \
  gemini -m gemini-3-pro-preview "analyze this code"

# Project structure analysis
(tree -L 3 -I 'node_modules|dist|.git' && cat package.json) | \
  gemini -m gemini-3-pro-preview "analyze project structure"
```

## Model Selection

| Model | Context | Recommendation |
|-------|---------|----------------|
| `gemini-3-pro-preview` | 1M tokens | Best quality, most token-efficient |
| `gemini-2.5-pro` | 1M tokens | Stable fallback |

Set default model via environment variable:
```bash
export GEMINI_MODEL="gemini-3-pro-preview"
```

## Output for Claude Code

Request output formats that Claude can immediately act on:

| Claude's Next Action | Request This Format |
|---------------------|---------------------|
| Edit specific files | `filepath:lineNumber: issue` |
| Understand architecture | 5 bullet summary max |
| Fix multiple issues | Numbered list with file:line |
| Make a decision | Pros/cons in 2-3 bullets each |

> **Key**: Always request line numbers when Claude may need to edit files. The format `filepath:lineNumber` allows Claude to directly Read and Edit those locations.

## Prompting Tips

- **Be explicit about format**: "Return ONLY..." or "No explanations, just..."
- **Specify limits**: "5 bullets max", "one sentence", "list only"
- **Request file:line format**: When Claude needs to act on locations
- **Ask for recommendations**: "RECOMMENDED:" format helps Claude decide quickly

## Instructions

1. **Verify Availability**:
   ```bash
   command -v gemini &>/dev/null || echo "Error: gemini CLI not installed"
   ```
2. **Select Prompt**: Read `.claude/skills/gemini-offload/prompts.md` to find or adapt a high-quality prompt for the specific task.
3. **Gather Context**:
   - Prefer `git ls-files` over `find` (respects .gitignore)
   - **CRITICAL**: Always include filename/path before content using `echo "=== $f ==="` pattern
4. **Execute**: Pipe context to `gemini -m gemini-3-pro-preview "prompt"`
5. **Present Results**: Output the response directly or summarize, attributing analysis to Gemini.

For detailed examples, see [examples.md](examples.md).
For pre-built prompts, see [prompts.md](prompts.md).