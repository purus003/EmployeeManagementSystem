package com.project.ems.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.ems.dto.ProjectDetailsDTO;
import com.project.ems.models.Employee;
import com.project.ems.models.ProjectDetails;
import com.project.ems.repos.EmployeeRepository;
import com.project.ems.repos.ProjectDetailsRepository;

@Service
public class ProjectDetailsService {

    @Autowired
    private ProjectDetailsRepository projectDetailsRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    public ProjectDetails createProject(ProjectDetails projectDetails) {
        return projectDetailsRepository.save(projectDetails);
    }

    public List<ProjectDetailsDTO> getAllProjects() {
        List<ProjectDetails> projects = projectDetailsRepository.findAll();
        return projects.stream().map(project -> {
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
    }
    
    public void deleteProject(Long projectId) {
        if (projectDetailsRepository.existsById(projectId)) {
            projectDetailsRepository.deleteById(projectId);
        } else {
            throw new RuntimeException("Project not found with id: " + projectId);
        }
    }
    
    public ProjectDetails updateProject(Long projectId, ProjectDetails updatedProjectDetails) {
        // Find the existing project by ID
        Optional<ProjectDetails> existingProjectOpt = projectDetailsRepository.findById(projectId);
        
        // If project not found, throw an exception
        if (existingProjectOpt.isEmpty()) {
            throw new RuntimeException("Project not found with id: " + projectId);
        }
        
        // Get the existing project
        ProjectDetails existingProject = existingProjectOpt.get();
        
        // Update fields from the updated project details
        existingProject.setProjectCode(updatedProjectDetails.getProjectCode());
        existingProject.setClientProjectName(updatedProjectDetails.getClientProjectName()); 
        existingProject.setStartDate(updatedProjectDetails.getStartDate());
        existingProject.setEndDate(updatedProjectDetails.getEndDate());
        existingProject.setReportingManager(updatedProjectDetails.getReportingManager());
        existingProject.setProjectStatus(updatedProjectDetails.getProjectStatus());
       

        // Save the updated project back to the database
        return projectDetailsRepository.save(existingProject);
    }

    // New method to assign project to employee
    public void assignProjectToEmployee(List<Long> projectId, String empCode) {
        // Find employee by empCode
    	System.out.println(projectId);
    	System.out.println(empCode);
        Employee employee = employeeRepository.findByProfessionalDetailsEmploymentCode(empCode)
            .orElseThrow(() -> new RuntimeException("Employee not found with code: " + empCode));
        System.out.println(employee.getPersonalDetails().getFullName());
        // Find project by projectId
        List< ProjectDetails> project = projectDetailsRepository.findAllById(projectId);
        // Add project to employee's project list
            
        
        List <ProjectDetails> currentProjects = employee.getProjectDetails();
        if(currentProjects == null) {
     	   currentProjects = new ArrayList<>();
        }
        currentProjects.addAll(project);
        employee.setProjectDetails(currentProjects);
        employeeRepository.save(employee);


    }
}
