package com.management.galle_hospital.Repository;


import com.management.galle_hospital.Model.User;
import com.management.galle_hospital.Model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);

    Optional<User> findByEmailIgnoreCase(String email);

    Optional<User> findByNic(String nic);

    List<User> findByRole(Role role);
}
