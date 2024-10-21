package com.project.ems.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.project.ems.dto.ProjectDetailsDTO;
import com.project.ems.models.ProjectDetails;
import com.project.ems.service.ProjectDetailsService;

@RestController
@RequestMapping("/admin")
public class ProjectDetailsController {

    @Autowired
    private ProjectDetailsService projectDetailsService;

    @PostMapping("/projects")
    public ResponseEntity<ProjectDetails> createProject(@RequestBody ProjectDetails projectDetails) {
        ProjectDetails newProject = projectDetailsService.createProject(projectDetails);
        return new ResponseEntity<>(newProject, HttpStatus.CREATED);
    }

    @GetMapping("/projects")
    public ResponseEntity<List<ProjectDetailsDTO>> getAllProjects() {
        List<ProjectDetailsDTO> projects = projectDetailsService.getAllProjects();
        return ResponseEntity.ok(projects);
    }
    
    @DeleteMapping("/projects/{projectId}")
    public ResponseEntity<String> deleteProject(@PathVariable Long projectId) {
        try {
            projectDetailsService.deleteProject(projectId);
            return ResponseEntity.ok("Project deleted successfully");
        } catch (RuntimeException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Error: " + ex.getMessage());
        }
    }
    
    
    @PutMapping("/projects/{projectId}")
    public ResponseEntity<ProjectDetails> updateProject(@PathVariable Long projectId, @RequestBody ProjectDetails updatedProjectDetails) {
        try {
            ProjectDetails updatedProject = projectDetailsService.updateProject(projectId, updatedProjectDetails);
            return ResponseEntity.ok(updatedProject);
        } catch (RuntimeException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }


    // New endpoint to assign project to employee
    @PutMapping("/projects/assign")
    public ResponseEntity<String> assignProjectToEmployee(@RequestParam List<Long> projectId, @RequestParam String empCode) {
        try {
        	System.out.println(projectId+" "+empCode);       
            projectDetailsService.assignProjectToEmployee(projectId, empCode);
            return ResponseEntity.ok("Project assigned successfully.");
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error assigning project: " + ex.getMessage());
        }
    }
}
