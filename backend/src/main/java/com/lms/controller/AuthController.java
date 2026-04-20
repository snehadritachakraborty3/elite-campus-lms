package com.lms.controller;

import com.lms.model.Role;
import com.lms.model.User;
import com.lms.repository.UserRepository;
import com.lms.security.JWTUtil;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.Set;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private JWTUtil jwtUtil;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest authRequest) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword())
        );

        final UserDetails userDetails = userDetailsService.loadUserByUsername(authRequest.getUsername());
        final String jwt = jwtUtil.generateToken(userDetails);

        User user = userRepository.findByUsername(authRequest.getUsername()).orElseThrow();
        
        return ResponseEntity.ok(new AuthResponse(jwt, user.getUsername(), user.getFullName(), user.getRoles()));
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest registerRequest) {
        if (userRepository.findByUsername(registerRequest.getUsername()).isPresent()) {
            return ResponseEntity.badRequest().body("Username already exists");
        }

        User user = new User();
        user.setUsername(registerRequest.getUsername());
        user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
        user.setFullName(registerRequest.getFullName());
        
        Set<Role> roles = new HashSet<>();
        if (registerRequest.getRole() != null && registerRequest.getRole().equals("INSTRUCTOR")) {
            roles.add(Role.ROLE_INSTRUCTOR);
        } else {
            roles.add(Role.ROLE_STUDENT);
        }
        user.setRoles(roles);

        userRepository.save(user);

        return ResponseEntity.ok("User registered successfully");
    }

    @Data @AllArgsConstructor @NoArgsConstructor
    static class AuthRequest {
        private String username;
        private String password;
    }

    @Data @AllArgsConstructor @NoArgsConstructor
    static class AuthResponse {
        private String token;
        private String username;
        private String fullName;
        private Set<Role> roles;
    }

    @Data @AllArgsConstructor @NoArgsConstructor
    static class RegisterRequest {
        private String username;
        private String password;
        private String fullName;
        private String role; // "STUDENT" or "INSTRUCTOR"
    }
}
