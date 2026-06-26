"""Application-specific exceptions for consistent error handling."""


class GitHubIntegrationError(Exception):
    """Raised when a GitHub API request fails unexpectedly."""

    def __init__(self, message: str, status_code: int | None = None) -> None:
        super().__init__(message)
        self.status_code = status_code
