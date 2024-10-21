package com.project.ems.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.project.ems.dto.EmployeeDTO;
import com.project.ems.models.User;
import com.project.ems.repos.UserRepository;
import com.project.ems.service.EmployeeService;

@RestController
public class LoginControler {

    @Autowired
    private AuthenticationManager authenticationManager;
    
    @Autowired
    private UserRepository userRepo;
    
    @Autowired
    private EmployeeService empService;
    
    //@CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User loginRequest) {
    	System.out.println(loginRequest);
        try {
              Authentication authentication = authenticationManager.authenticate( new UsernamePasswordAuthenticationToken(loginRequest.getEmpcode(), loginRequest.getPassword()));
              SecurityContextHolder.getContext().setAuthentication(authentication);
              System.out.println(authentication);
              User user = userRepo.findByEmpcode(loginRequest.getEmpcode())
                      .orElseThrow(() -> new UsernameNotFoundException("User not found"));
              System.out.println(user.getRole());
              
              Map<String, Object> response = new HashMap<>();
              response.put("role", user.getRole());
           
              if(user.getRole().equals("EMPLOYEE")) {
            	  System.out.println("entered the if block");
            	  EmployeeDTO employee = empService.getEmployeeById(loginRequest.getEmpcode());
            	  response.put("employeeDetails", employee);          	  
               }
              
              
             	  return ResponseEntity.ok(response);
              
      
        } catch (RuntimeException ex) {
            return ResponseEntity.status(401).body("Unauthorized: " + ex.getMessage());
        }
    }
}
