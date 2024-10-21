package com.project.ems.service;

import java.util.Collections;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.project.ems.models.User;
import com.project.ems.repos.UserRepository;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String empcode) throws UsernameNotFoundException {
        User user = userRepository.findByEmpcode(empcode)
            .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        // Convert the role to a GrantedAuthority
        GrantedAuthority authority = new SimpleGrantedAuthority(user.getRole());

        // Return UserDetails object
        return new org.springframework.security.core.userdetails.User(
            user.getEmpcode(), 
            user.getPassword(), 
            Collections.singletonList(authority) // Use the role as an authority
        );
    }
}