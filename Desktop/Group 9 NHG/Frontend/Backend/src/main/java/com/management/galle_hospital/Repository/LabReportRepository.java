package com.management.galle_hospital.Repository;

import com.management.galle_hospital.Model.LabReport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LabReportRepository extends JpaRepository<LabReport, Long> {
    List<LabReport> findAllByOrderBySubmittedAtDesc();

    List<LabReport> findByPatientPhoneNumberOrderBySubmittedAtDesc(String patientPhoneNumber);

    List<LabReport> findByPatientIdOrderBySubmittedAtDesc(Long patientId);
}
