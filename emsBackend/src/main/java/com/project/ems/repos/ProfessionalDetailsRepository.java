package com.project.ems.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.ems.models.ProfessionalDetails;

@Repository
public interface ProfessionalDetailsRepository extends JpaRepository<ProfessionalDetails, Long> {
}