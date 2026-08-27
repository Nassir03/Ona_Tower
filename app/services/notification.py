import logging
import smtplib
from email.message import EmailMessage

from app.core.config import Settings
from app.schemas.enquiry import EnquiryRecord

logger = logging.getLogger(__name__)


class NotificationService:
    def __init__(self, settings: Settings):
        self.settings = settings

    def send_enquiry_notifications(self, enquiry: EnquiryRecord) -> None:
        if not self.settings.smtp_enabled:
            logger.info("SMTP disabled; enquiry notification skipped")
            return

        required = [
            self.settings.smtp_host,
            self.settings.smtp_from_email,
            self.settings.sales_notification_email,
        ]
        if not all(required):
            logger.warning("SMTP enabled but required SMTP settings are incomplete")
            return

        self._send_sales_notification(enquiry)
        if enquiry.email:
            self._send_customer_acknowledgement(enquiry)

    def _smtp_send(self, message: EmailMessage) -> None:
        with smtplib.SMTP(self.settings.smtp_host, self.settings.smtp_port, timeout=10) as server:
            if self.settings.smtp_use_tls:
                server.starttls()
            if self.settings.smtp_username and self.settings.smtp_password:
                server.login(self.settings.smtp_username, self.settings.smtp_password)
            server.send_message(message)

    def _send_sales_notification(self, enquiry: EnquiryRecord) -> None:
        msg = EmailMessage()
        msg["Subject"] = f"New ONA Towers enquiry - {enquiry.reference_number}"
        msg["From"] = f"{self.settings.smtp_from_name} <{self.settings.smtp_from_email}>"
        msg["To"] = self.settings.sales_notification_email
        msg.set_content(
            "\n".join(
                [
                    f"Reference: {enquiry.reference_number}",
                    f"Name: {enquiry.name}",
                    f"Phone: {enquiry.phone}",
                    f"Email: {enquiry.email or '-'}",
                    f"Residence interest: {enquiry.residence_interest or '-'}",
                    f"Enquiry type: {enquiry.enquiry_type.value}",
                    f"Message: {enquiry.message or '-'}",
                    f"Source: {enquiry.source}",
                ]
            )
        )
        self._smtp_send(msg)

    def _send_customer_acknowledgement(self, enquiry: EnquiryRecord) -> None:
        msg = EmailMessage()
        msg["Subject"] = f"We received your ONA Towers enquiry - {enquiry.reference_number}"
        msg["From"] = f"{self.settings.smtp_from_name} <{self.settings.smtp_from_email}>"
        msg["To"] = str(enquiry.email)
        msg.set_content(
            f"Hello {enquiry.name},\n\n"
            f"Thank you for your interest in ONA Towers. "
            f"We received your enquiry with reference {enquiry.reference_number}.\n\n"
            "Our team will follow up using the contact details you provided.\n"
        )
        self._smtp_send(msg)
