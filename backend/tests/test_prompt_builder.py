import unittest

from app.services.prompt_builder import PromptBuilder


class TestPromptBuilder(unittest.TestCase):
    """Verify the prompt builder produces structured Markdown prompts."""

    def setUp(self) -> None:
        self.builder = PromptBuilder()
        self.filename = "src/example.py"
        self.patch = "@@ -1,3 +1,4 @@\n-old\n+new code\n"

    def test_code_review_prompt_contains_expected_sections(self) -> None:
        prompt = self.builder.build_code_review_prompt(self.filename, self.patch)

        self.assertIn("# Code Review", prompt)
        self.assertIn("## File", prompt)
        self.assertIn("## Patch", prompt)
        self.assertIn("## Review Focus", prompt)
        self.assertIn("Bugs", prompt)
        self.assertIn("Pythonic improvements", prompt)

    def test_security_review_prompt_contains_expected_sections(self) -> None:
        prompt = self.builder.build_security_review_prompt(self.filename, self.patch)

        self.assertIn("# Security Review", prompt)
        self.assertIn("Secrets", prompt)
        self.assertIn("SQL Injection", prompt)
        self.assertIn("Authentication issues", prompt)

    def test_performance_review_prompt_contains_expected_sections(self) -> None:
        prompt = self.builder.build_performance_review_prompt(self.filename, self.patch)

        self.assertIn("# Performance Review", prompt)
        self.assertIn("Time complexity", prompt)
        self.assertIn("Space complexity", prompt)
        self.assertIn("Database optimization", prompt)


if __name__ == "__main__":
    unittest.main()
