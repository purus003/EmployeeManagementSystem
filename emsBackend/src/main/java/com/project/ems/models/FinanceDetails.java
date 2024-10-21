package com.project.ems.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class FinanceDetails {
	   @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long id;

	    private String panCard;
	    private String aadharCard;
	    private String bankName;
	    private String branch;
	    private String ifscCode;
	    private double ctc;
		public Long getId() {
			return id;
		}
		public void setId(Long id) {
			this.id = id;
		}
		public String getPanCard() {
			return panCard;
		}
		public void setPanCard(String panCard) {
			this.panCard = panCard;
		}
		public String getAadharCard() {
			return aadharCard;
		}
		public void setAadharCard(String aadharCard) {
			this.aadharCard = aadharCard;
		}
		public String getBankName() {
			return bankName;
		}
		public void setBankName(String bankName) {
			this.bankName = bankName;
		}
		public String getBranch() {
			return branch;
		}
		public void setBranch(String branch) {
			this.branch = branch;
		}
		public String getIfscCode() {
			return ifscCode;
		}
		public void setIfscCode(String ifscCode) {
			this.ifscCode = ifscCode;
		}
		public double getCtc() {
			return ctc;
		}
		public void setCtc(double ctc) {
			this.ctc = ctc;
		}
	

}
