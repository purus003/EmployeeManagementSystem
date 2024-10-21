package com.project.ems.models;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToOne;

@Entity
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "personal_details_id", referencedColumnName = "id")
    private PersonalDetails personalDetails;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "professional_details_id", referencedColumnName = "id")
    private ProfessionalDetails professionalDetails;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "finance_details_id", referencedColumnName = "id")
    private FinanceDetails financeDetails;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
    		name="employee_projects",
    		joinColumns = @JoinColumn(name="employee_id"),
    		inverseJoinColumns=@JoinColumn(name="project_id")
    		)
    private List<ProjectDetails> projectDetails;

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

	public List<ProjectDetails> getProjectDetails() {
		return projectDetails;
	}

	public void setProjectDetails(List<ProjectDetails> projectDetails) {
		this.projectDetails = projectDetails;
	}
    
}