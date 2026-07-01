"""Prompt construction helpers for AI-assisted code review workflows."""

from __future__ import annotations


class PromptBuilder:
    """Build structured prompts for AI code review."""

    def build_code_review_prompt(self, filename: str, patch: str) -> str:
        patch = patch[:2000]

        return f"""
# Code Review

## File
{filename}

## Patch

{patch}

## Instructions

Review only the code shown above.

Focus on:

- Bugs
- Logic issues
- Code readability
- Maintainability
- Best practices
- Python improvements

Return your answer in Markdown.
"""

    def build_security_review_prompt(self, filename: str, patch: str) -> str:
        return self.build_code_review_prompt(filename, patch)

    def build_performance_review_prompt(self, filename: str, patch: str) -> str:
        return self.build_code_review_prompt(filename, patch)