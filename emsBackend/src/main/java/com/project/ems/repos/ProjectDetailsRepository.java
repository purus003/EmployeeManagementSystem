package com.project.ems.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.project.ems.models.ProjectDetails;

@RepositoryRestResource
public interface ProjectDetailsRepository extends JpaRepository<ProjectDetails, Long> {  
}
