package com.management.galle_hospital;

import com.management.galle_hospital.Model.Admin;
import com.management.galle_hospital.Model.Role;
import com.management.galle_hospital.Repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootApplication
public class GalleHospitalApplication {

	public static void main(String[] args) {
		SpringApplication.run(GalleHospitalApplication.class, args);
	}

	@Bean
	CommandLineRunner createDefaultAdmin(UserRepository userRepository) {
		return args -> {
			String adminEmail = "admin@example.com";

			if (userRepository.findByEmail(adminEmail).isPresent()) {
				return;
			}

			BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

			Admin admin = new Admin();
			admin.setFirstName("Admin");
			admin.setLastName("User");
			admin.setMobile("N/A");
			admin.setEmail(adminEmail);
			admin.setPassword(passwordEncoder.encode("admin123"));
			admin.setRole(Role.ADMIN);

			userRepository.save(admin);
		};
	}

}
