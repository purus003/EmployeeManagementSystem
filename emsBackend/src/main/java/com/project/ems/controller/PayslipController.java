package com.project.ems.controller;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.ems.error.ResourceNotFoundException;
import com.project.ems.models.Employee;
import com.project.ems.models.FinanceDetails;
import com.project.ems.repos.EmployeeRepository;
import com.project.ems.service.PdfService;

@RestController
@RequestMapping("/payslip")
public class PayslipController {

    @Autowired
    private EmployeeRepository employeeRepository;

 

    @Autowired
    private PdfService pdfService;

    @GetMapping("/download/{employeeId}")
    public ResponseEntity<byte[]> downloadPayslip(@PathVariable Long employeeId) {
        Employee employee = employeeRepository.findById(employeeId)
            .orElseThrow(() -> new ResourceNotFoundException("Employee not found"));

        LocalDate joiningDate = employee.getProfessionalDetails().getDateOfJoining();
        LocalDate currentDate = LocalDate.now();

        // Check if the employee has worked for more than six months
        if (ChronoUnit.MONTHS.between(joiningDate, currentDate) < 6) {
            return ResponseEntity.badRequest().body("You need to work for at least six months to download the payslip.".getBytes());
        }

        // Get CTC and calculate last 6 months salary
        FinanceDetails financeDetails = employee.getFinanceDetails();
        double ctc = financeDetails.getCtc();
        double monthlySalary = ctc / 12;

        // Generate the PDF payslip
        byte[] pdfData = pdfService.generatePayslip(employee, monthlySalary);
        
        if(pdfData != null) {
        	HttpHeaders headers = new HttpHeaders();
        	headers.setContentType(MediaType.APPLICATION_PDF);
        	headers.setContentDispositionFormData("attachment", "payslip.pdf");
        	
        	return new ResponseEntity<>(pdfData,headers,HttpStatus.OK);
        }else
        {
        	return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

        
    }
}
