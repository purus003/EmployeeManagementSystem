package com.project.ems.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.project.ems.dto.EmployeeDTO;
import com.project.ems.models.Employee;
import com.project.ems.models.User;
import com.project.ems.repos.UserRepository;
import com.project.ems.service.EmailService;
import com.project.ems.service.EmployeeService;

@RestController
@RequestMapping("/admin")
public class EmployeeController {

	@Autowired
	private EmployeeService employeeService;

	@Autowired
	private EmailService emailService;

	@Autowired
	private UserRepository userrepo;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@PostMapping("/employee")
	@Transactional
	public ResponseEntity<Employee> createEmployee(@RequestBody Employee emp) {
		// Save employee to database
		Employee employee = new Employee();
		employee.setPersonalDetails(emp.getPersonalDetails());
		employee.setProfessionalDetails(emp.getProfessionalDetails());
		employee.setFinanceDetails(emp.getFinanceDetails());

		Employee newEmployee = employeeService.createEmployee(employee);

		String generatedPassword = emailService.generateRandomPassword();

		User loginRequest = new User();
		loginRequest.setEmpcode(newEmployee.getProfessionalDetails().getEmploymentCode());
		loginRequest.setPassword(passwordEncoder.encode(generatedPassword));
		loginRequest.setRole("EMPLOYEE");

		userrepo.save(loginRequest);

		// Send login credentials
		emailService.sendLoginCredentials(newEmployee, generatedPassword);

		return new ResponseEntity<>(newEmployee, HttpStatus.CREATED);
	}

	@GetMapping("/employee/{empcode}")
	public ResponseEntity<EmployeeDTO> getEmployeeById(@PathVariable String empcode) {
		EmployeeDTO employee = employeeService.getEmployeeById(empcode);
		return ResponseEntity.ok(employee);
	}

	@GetMapping("/employee")
	public ResponseEntity<List<EmployeeDTO>> getAllEmployees() {
		return ResponseEntity.ok(employeeService.getAllEmployees());
	}

	@PutMapping("/employee/{id}")
	@Transactional
	public ResponseEntity<Employee> updateEmployee(@PathVariable Long id, @RequestBody Employee employeeDetails) {
		Employee updatedEmployee = employeeService.updateEmployee(id, employeeDetails);
		return ResponseEntity.ok(updatedEmployee);
	}
    
	@DeleteMapping("/employee/{empcode}")
	@Transactional
	public ResponseEntity<Void> deleteEmployee(@PathVariable String empcode) {
		System.out.println(empcode);
		employeeService.deleteEmployee(empcode);
		return ResponseEntity.noContent().build();
	}
	
	@PutMapping("/employee/dp")
	@Transactional
	 public ResponseEntity<String> deleteProjectFromEmployee(@RequestParam Long ProjectId, @RequestParam Long EmployeeId) {
        try {
        	System.out.println(ProjectId+" "+EmployeeId);       
        	employeeService.removeProjectFromEmployee(ProjectId, EmployeeId);
            return ResponseEntity.ok("Project Deleted successfully.");
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error assigning project: " + ex.getMessage());
        }
    }
	
}
