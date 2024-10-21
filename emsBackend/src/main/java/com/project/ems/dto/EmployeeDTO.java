package com.project.ems.dto;

import java.util.List;

import com.project.ems.models.FinanceDetails;
import com.project.ems.models.PersonalDetails;
import com.project.ems.models.ProfessionalDetails;

public class EmployeeDTO {
	private Long id;
	private PersonalDetails personalDetails;
	private ProfessionalDetails professionalDetails;
	private FinanceDetails financeDetails;
	private List<ProjectDetailsDTO> projectDetails;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	
	public PersonalDetails getPersonalDetails() {
		return personalDetails;
	}
	public void setPersonalDetails(PersonalDetails personalDetails) {
		this.personalDetails = personalDetails;
	}
	public ProfessionalDetails getProfessionalDetails() {
		return professionalDetails;
	}
	public void setProfessionalDetails(ProfessionalDetails professionalDetails) {
		this.professionalDetails = professionalDetails;
	}
	public FinanceDetails getFinanceDetails() {
		return financeDetails;
	}
	public void setFinanceDetails(FinanceDetails financeDetails) {
		this.financeDetails = financeDetails;
	}
	public List<ProjectDetailsDTO> getProjectDetails() {
		return projectDetails;
	}
	public void setProjectDetails(List<ProjectDetailsDTO> projectDetails) {
		this.projectDetails = projectDetails;
	}
	

}
