package com.management.galle_hospital.Repository;

import com.management.galle_hospital.Model.AppointmentRequest;
import com.management.galle_hospital.Model.AppointmentStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AppointmentRequestRepository extends JpaRepository<AppointmentRequest, Long> {
    List<AppointmentRequest> findAllByOrderByRequestedAtDesc();

    List<AppointmentRequest> findByPatientIdOrderByRequestedAtDesc(Long patientId);

    List<AppointmentRequest> findByClinicSessionClinicNurseIdOrderByRequestedAtDesc(Long nurseId);

    List<AppointmentRequest> findByClinicSessionClinicNurseIdAndStatusOrderByRequestedAtDesc(Long nurseId, AppointmentStatus status);

    List<AppointmentRequest> findByClinicSessionClinicDoctorsIdAndStatusOrderByAcceptedAtDesc(Long doctorId, AppointmentStatus status);

    long countByClinicSessionIdAndStatus(Long clinicSessionId, AppointmentStatus status);

    boolean existsByPatientIdAndClinicSessionIdAndStatus(Long patientId, Long clinicSessionId, AppointmentStatus status);
}
