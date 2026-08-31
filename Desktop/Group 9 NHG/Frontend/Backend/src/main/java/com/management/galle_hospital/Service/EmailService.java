package com.management.galle_hospital.Service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.ObjectProvider;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
    private static final Logger logger = LoggerFactory.getLogger(EmailService.class);

    private final ObjectProvider<JavaMailSender> mailSenderProvider;

    @Value("${spring.mail.username:}")
    private String fromEmail;

    public EmailService(ObjectProvider<JavaMailSender> mailSenderProvider) {
        this.mailSenderProvider = mailSenderProvider;
    }

    public void sendPasswordResetEmail(String toEmail, String resetLink, String token) {
        JavaMailSender mailSender = mailSenderProvider.getIfAvailable();
        if (mailSender == null) {
            logger.warn("Mail sender is not configured. Password reset token for {} is {}", toEmail, token);
            return;
        }

        SimpleMailMessage message = new SimpleMailMessage();
        if (!fromEmail.isBlank()) {
            message.setFrom(fromEmail);
        }
        message.setTo(toEmail);
        message.setSubject("Galle Hospital password reset");
        message.setText("""
                We received a request to reset your password.

                Use this token to reset your password:
                %s

                Or open this link:
                %s

                This token will expire soon. If you did not request this, ignore this email.
                """.formatted(token, resetLink));

        try {
            mailSender.send(message);
        } catch (MailException exception) {
            logger.error("Failed to send password reset email to {}", toEmail, exception);
        }
    }

    public void sendAppointmentAcceptedEmail(String toEmail, String patientName, String clinicName, String clinicDate,
                                             String startTime, String endTime, String location, String nurseName,
                                             Long appointmentId) {
        if (toEmail == null || toEmail.isBlank()) {
            logger.warn("Cannot send appointment accepted email for appointment {} because patient email is missing", appointmentId);
            return;
        }

        JavaMailSender mailSender = mailSenderProvider.getIfAvailable();
        if (mailSender == null) {
            logger.warn("Mail sender is not configured. Appointment {} accepted for {}", appointmentId, toEmail);
            return;
        }

        SimpleMailMessage message = new SimpleMailMessage();
        if (!fromEmail.isBlank()) {
            message.setFrom(fromEmail);
        }
        message.setTo(toEmail);
        message.setSubject("Galle Hospital clinic request approved");
        message.setText("""
                Dear %s,

                Your clinic request has been approved by the nurse.

                Request ID: %s
                Clinic: %s
                Nurse: %s
                Date: %s
                Time: %s - %s
                Location: %s

                Please arrive on time with any relevant medical documents.
                """.formatted(patientName, appointmentId, clinicName, nurseName, clinicDate, startTime, endTime, location));

        try {
            mailSender.send(message);
        } catch (MailException exception) {
            logger.error("Failed to send appointment accepted email to {}", toEmail, exception);
        }
    }
}
