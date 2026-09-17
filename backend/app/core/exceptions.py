class AppError(Exception):
    def __init__(self, message: str, *, code: str = "application_error", status_code: int = 400):
        super().__init__(message)
        self.message = message
        self.code = code
        self.status_code = status_code


class NotFoundError(AppError):
    def __init__(self, message: str = "Resource not found"):
        super().__init__(message, code="not_found", status_code=404)


class DuplicateEnquiryError(AppError):
    def __init__(self):
        super().__init__(
            "A similar enquiry was submitted recently. Please wait before trying again.",
            code="duplicate_enquiry",
            status_code=409,
        )


class RateLimitError(AppError):
    def __init__(self):
        super().__init__(
            "Too many enquiry attempts. Please try again later.",
            code="rate_limit_exceeded",
            status_code=429,
        )
