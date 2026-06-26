"""Logging configuration for the application."""

import logging


def configure_logging() -> None:
    """Initialize application logging with a simple, readable format."""
    logging.basicConfig(
        level=logging.INFO,
        format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
    )
