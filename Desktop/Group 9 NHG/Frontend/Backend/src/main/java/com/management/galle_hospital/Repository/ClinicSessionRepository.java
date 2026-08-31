package com.management.galle_hospital.Repository;

import com.management.galle_hospital.Model.ClinicSession;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClinicSessionRepository extends JpaRepository<ClinicSession, Long> {
}
