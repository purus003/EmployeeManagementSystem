package com.project.ems.config;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.project.ems.models.User;
import com.project.ems.repos.UserRepository;

@Configuration
public class DataInitializer {

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Bean
    CommandLineRunner initDatabase(UserRepository userRepo) {
        return args -> {
            // Insert admin credentials if not present
            if (userRepo.findByEmpcode("600001").isEmpty()) {
                User admin = new User();
                admin.setEmpcode("600001");
                admin.setPassword(passwordEncoder.encode("Manu@143"));  // Use password encoder
                admin.setRole("ADMIN");
                userRepo.save(admin);
            }

            // Insert employee credentials if not present
            if (userRepo.findByEmpcode("600002").isEmpty()) {
                User employee = new User();
                employee.setEmpcode("600002");
                employee.setPassword(passwordEncoder.encode("Manu@143"));  // Use password encoder
                employee.setRole("EMPLOYEE");
                userRepo.save(employee);
            }
        };
    }
}
