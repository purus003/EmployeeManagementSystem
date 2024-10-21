package com.project.ems.repos;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.project.ems.models.User;

@Repository
public interface UserRepository extends JpaRepository <User, Long> {
	Optional<User> findByEmpcode(String empcode);
	
	@Modifying
	@Transactional
	@Query(value= "DELETE FROM User WHERE empcode= :empcode",nativeQuery = true)
	void deleteByEmpcode(@Param("empcode")String empcode);
}
