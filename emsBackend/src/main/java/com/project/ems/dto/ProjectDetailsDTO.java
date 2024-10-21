package com.project.ems.dto;

import java.time.LocalDate;

public class ProjectDetailsDTO {
	private Long id;
	 public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	    private String projectCode;
	    private String clientProjectName;
	    private LocalDate startDate;
	    private LocalDate endDate;
	    private String reportingManager;
	    private String projectStatus;
	    
	    
		public String getProjectCode() {
			return projectCode;
		}
		public void setProjectCode(String projectCode) {
			this.projectCode = projectCode;
		}
		public String getClientProjectName() {
			return clientProjectName;
		}
		public void setClientProjectName(String clientProjectName) {
			this.clientProjectName = clientProjectName;
		}
		public LocalDate getStartDate() {
			return startDate;
		}
		public void setStartDate(LocalDate startDate) {
			this.startDate = startDate;
		}
		public LocalDate getEndDate() {
			return endDate;
		}
		public void setEndDate(LocalDate endDate) {
			this.endDate = endDate;
		}
		public String getReportingManager() {
			return reportingManager;
		}
		public void setReportingManager(String reportingManager) {
			this.reportingManager = reportingManager;
		}
		public String getProjectStatus() {
			return projectStatus;
		}
		public void setProjectStatus(String projectStatus) {
			this.projectStatus = projectStatus;
		}

}
