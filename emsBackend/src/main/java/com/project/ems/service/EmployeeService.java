package com.project.ems.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.ems.dto.EmployeeDTO;
import com.project.ems.dto.ProjectDetailsDTO;
import com.project.ems.error.ResourceNotFoundException;
import com.project.ems.models.Employee;
import com.project.ems.models.ProjectDetails;
import com.project.ems.repos.EmployeeRepository;
import com.project.ems.repos.ProjectDetailsRepository;
import com.project.ems.repos.UserRepository;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;
    
    @Autowired
    private UserRepository userRepo;
    @Autowired
    private ProjectDetailsRepository proRepo;    

    public Employee createEmployee(Employee employee) {
        return employeeRepository.save(employee);
    }

    public EmployeeDTO getEmployeeById(String empcode) {
    	Employee emp =  employeeRepository.findByProfessionalDetailsEmploymentCode(empcode)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found with id: " + empcode));
    	EmployeeDTO employeeDetailsDTO = new EmployeeDTO();
    	employeeDetailsDTO.setId(emp.getId());
    	employeeDetailsDTO.setProfessionalDetails(emp.getProfessionalDetails());
    	employeeDetailsDTO.setPersonalDetails(emp.getPersonalDetails());
    	employeeDetailsDTO.setFinanceDetails(emp.getFinanceDetails());
    	
    	List<ProjectDetailsDTO> projectDTOs = emp.getProjectDetails().stream().map(project->{
    		ProjectDetailsDTO projectDTO = new ProjectDetailsDTO();
    		projectDTO.setId(project.getId());
    		projectDTO.setProjectCode(project.getProjectCode());
    		projectDTO.setClientProjectName(project.getClientProjectName());
    		projectDTO.setStartDate(project.getStartDate());
    		projectDTO.setEndDate(project.getEndDate());
    		projectDTO.setReportingManager(project.getReportingManager());
    		projectDTO.setProjectStatus(project.getProjectStatus());
    		return projectDTO;
    	}).collect(Collectors.toList());
    	
    	employeeDetailsDTO.setProjectDetails(projectDTOs);
    	return employeeDetailsDTO;
    }

    public List<EmployeeDTO> getAllEmployees() {
        List<Employee> employees = employeeRepository.findAll();
        return employees.stream().map(employee -> {
        	EmployeeDTO employeeDetailsDTO = new EmployeeDTO();
        	employeeDetailsDTO.setId(employee.getId());
        	employeeDetailsDTO.setProfessionalDetails(employee.getProfessionalDetails());
        	employeeDetailsDTO.setPersonalDetails(employee.getPersonalDetails());
        	employeeDetailsDTO.setFinanceDetails(employee.getFinanceDetails());
        	
        	List<ProjectDetailsDTO> projectDTOs = employee.getProjectDetails().stream().map(project->{
        		ProjectDetailsDTO projectDTO = new ProjectDetailsDTO();
        		projectDTO.setId(project.getId());
        		projectDTO.setProjectCode(project.getProjectCode());
        		projectDTO.setClientProjectName(project.getClientProjectName());
        		projectDTO.setStartDate(project.getStartDate());
        		projectDTO.setEndDate(project.getEndDate());
        		projectDTO.setReportingManager(project.getReportingManager());
        		projectDTO.setProjectStatus(project.getProjectStatus());
        		return projectDTO;
        	}).collect(Collectors.toList());
        	
        	employeeDetailsDTO.setProjectDetails(projectDTOs);
        	return employeeDetailsDTO;
        }).collect(Collectors.toList());    }

    public Employee updateEmployee(Long empId, Employee emp) {
        // Find the existing project by ID
        Optional<Employee> existingEmployeeOpt = employeeRepository.findById(empId);
        
        // If project not found, throw an exception
        if (existingEmployeeOpt.isEmpty()) {
            throw new RuntimeException("Employee not found with empcode: " + empId);
        }
        
  
        Employee exEmp = existingEmployeeOpt.get();
        
        exEmp.setPersonalDetails(emp.getPersonalDetails());
        exEmp.setProfessionalDetails(emp.getProfessionalDetails());
        exEmp.setFinanceDetails(emp.getFinanceDetails());
        
        return employeeRepository.save(exEmp);
    }

    public void deleteEmployee(String empcode) {
       Employee emp =  employeeRepository.findByProfessionalDetailsEmploymentCode(empcode)
            .orElseThrow(() -> new ResourceNotFoundException("Employee not found with id: " + empcode));
        System.out.println(emp.getId());
        employeeRepository.deleteById(emp.getId());
        userRepo.deleteByEmpcode(empcode);
     
     
    }
    
    public void removeProjectFromEmployee(Long proId,Long empId) {
    	Optional<Employee> employeeOpt = employeeRepository.findById(empId);
    	if(employeeOpt.isPresent()) {
    		Employee employee = employeeOpt.get();
    		Optional<ProjectDetails> projectOpt = proRepo.findById(proId);
    		if(projectOpt.isPresent()) {
    			ProjectDetails project = projectOpt.get();
    			employee.getProjectDetails().remove(project);
    			employeeRepository.save(employee);
    		}else {
    			throw new RuntimeException("Project Not FOund");
    		}
    	}else {
    		throw new RuntimeException("Employee Not FOund");
    	}
    }
    
}