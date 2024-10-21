package com.project.ems.service;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.project.ems.models.Employee;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender emailSender;

    
    public String generateRandomPassword() {
        return UUID.randomUUID().toString().replace("-", "").substring(0, 8); // Random 8 characters password
    }

    public void sendLoginCredentials(Employee employee, String generatedPassword) {

        String toEmail = employee.getPersonalDetails().getPersonalEmail(); // Adjust according to your relationship
        String subject = "Your Login Credentials";
        String message = "Username: " + employee.getProfessionalDetails().getEmploymentCode() + 
                         "\nPassword: " + generatedPassword; // Send hashed password or plain text based on your choice

        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setTo(toEmail);
        mailMessage.setSubject(subject);
        mailMessage.setText(message);
        
        emailSender.send(mailMessage);
    }
}
