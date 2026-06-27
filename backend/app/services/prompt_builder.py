"""Prompt construction helpers for AI-assisted code review workflows."""

from __future__ import annotations


class PromptBuilder:
    """Build structured Markdown prompts for different review categories.

    This service does not call any AI API. It only prepares the instructions and
    context that a future AI service can send to an LLM.
    """

    def build_code_review_prompt(self, filename: str, patch: str) -> str:
        """Create a structured prompt for general code review feedback.

        Args:
            filename: The file path affected by the change.
            patch: The diff snippet for the file.

        Returns:
            A Markdown prompt that asks the AI to analyze bugs, readability,
            maintainability, and Pythonic improvements.
        """
        return self._build_prompt(
            title="Code Review",
            filename=filename,
            patch=patch,
            focus_items=[
                "Bugs",
                "Logic issues",
                "Code readability",
                "Maintainability",
                "Best practices",
                "Pythonic improvements",
            ],
        )

    def build_security_review_prompt(self, filename: str, patch: str) -> str:
        """Create a structured prompt focused on security risks.

        Args:
            filename: The file path affected by the change.
            patch: The diff snippet for the file.

        Returns:
            A Markdown prompt that asks the AI to inspect secrets, injection
            flaws, authentication/authorization problems, and unsafe code.
        """
        return self._build_prompt(
            title="Security Review",
            filename=filename,
            patch=patch,
            focus_items=[
                "Secrets",
                "SQL Injection",
                "Command Injection",
                "Authentication issues",
                "Authorization issues",
                "Unsafe code",
                "Sensitive data exposure",
            ],
        )

    def build_performance_review_prompt(self, filename: str, patch: str) -> str:
        """Create a structured prompt focused on performance concerns.

        Args:
            filename: The file path affected by the change.
            patch: The diff snippet for the file.

        Returns:
            A Markdown prompt that asks the AI to look for complexity and
            inefficiency issues in loops, computations, and data access.
        """
        return self._build_prompt(
            title="Performance Review",
            filename=filename,
            patch=patch,
            focus_items=[
                "Time complexity",
                "Space complexity",
                "Inefficient loops",
                "Duplicate computations",
                "Database optimization",
                "Memory optimization",
            ],
        )

    def _build_prompt(self, *, title: str, filename: str, patch: str, focus_items: list[str]) -> str:
        """Build a reusable Markdown prompt for a specific review category."""
        focus_bullets = "\n".join(f"- {item}" for item in focus_items)
        return f"""# {title}

## File
- Path: {filename}

## Patch
```diff
{patch}
```

## Review Focus
{focus_bullets}

## Instructions
- Review the patch carefully.
- Identify any issues or risks relevant to the selected review category.
- Summarize findings clearly.
- Provide actionable recommendations.
- Return the response in structured Markdown.
"""
