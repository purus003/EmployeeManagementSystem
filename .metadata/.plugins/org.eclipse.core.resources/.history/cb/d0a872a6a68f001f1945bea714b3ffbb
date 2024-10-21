package com.project.ems.service;

import java.awt.Color;
import java.io.ByteArrayOutputStream;
import java.io.IOException;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.common.PDRectangle;
import org.apache.pdfbox.pdmodel.font.PDType1Font;
import org.springframework.stereotype.Service;

import com.project.ems.models.Employee;

@Service
public class PdfService {

	public byte[] generatePayslip(Employee employee, double monthlySalary) {
		try (ByteArrayOutputStream outputStream = new ByteArrayOutputStream(); PDDocument document = new PDDocument()) {

			PDPage page = new PDPage();
			document.addPage(page);

			try (PDPageContentStream contentStream = new PDPageContentStream(document, page)) {
				
				contentStream.setNonStrokingColor(new Color(230,230,250));
				contentStream.addRect(0, 0, PDRectangle.A4.getWidth(), PDRectangle.A4.getHeight());
				contentStream.fill();
				contentStream.setNonStrokingColor(Color.BLUE);
				contentStream.addRect(0,700,PDRectangle.A4.getWidth(),60);
				contentStream.fill();
				// Start writing content
				
				contentStream.beginText();
				contentStream.setFont(PDType1Font.HELVETICA_BOLD, 24);
				contentStream.setNonStrokingColor(Color.WHITE);
				contentStream.newLineAtOffset(20, 720);
				contentStream.showText("Employee Payslip");
				contentStream.endText();
				
				
				contentStream.setNonStrokingColor(Color.BLACK);
				contentStream.setFont(PDType1Font.HELVETICA, 12);
				contentStream.beginText();
				contentStream.newLineAtOffset(20, 650);
				contentStream.showText("Employee Name: " + employee.getPersonalDetails().getFullName());
				contentStream.newLineAtOffset(0, -15);
				contentStream.showText("Employee Code: " + employee.getProfessionalDetails().getEmploymentCode());
				contentStream.newLineAtOffset(0, -15);
				contentStream.showText("Joining Date: " + employee.getProfessionalDetails().getDateOfJoining().toString());
				contentStream.newLineAtOffset(0, -15);
				contentStream.showText("CTC: " + employee.getFinanceDetails().getCtc());
				contentStream.newLineAtOffset(0, -15);
				contentStream.showText("Monthly Salary: " + monthlySalary);
				contentStream.newLineAtOffset(0, -15);
				contentStream.showText("Salary for the Last 6 Months: " + (monthlySalary * 6));
				contentStream.endText();
				
				contentStream.setNonStrokingColor(Color.BLUE);
				contentStream.addRect(0, 0, PDRectangle.A4.getWidth(), 50);
				contentStream.fill();
				
				contentStream.beginText();
				contentStream.setFont(PDType1Font.HELVETICA, 10);
				contentStream.setNonStrokingColor(Color.WHITE);
				contentStream.newLineAtOffset(20, 15);
				contentStream.showText("GUHA CORPORATION | HOSUR | 99965336533");
				contentStream.endText();
								
			}

			document.save(outputStream);
			System.out.println(outputStream.toByteArray());
			return outputStream.toByteArray();

		} catch (IOException e) {
			e.printStackTrace();
			// Handle the exception
			return null;
		}
	}
}
