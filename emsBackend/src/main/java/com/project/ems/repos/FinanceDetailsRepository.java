package com.project.ems.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.ems.models.FinanceDetails;

@Repository
public interface FinanceDetailsRepository extends JpaRepository<FinanceDetails, Long> {
}
