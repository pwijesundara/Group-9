package com.management.galle_hospital.Controller;

import com.management.galle_hospital.Model.AppointmentStatus;
import com.management.galle_hospital.Payload.AppointmentRequestCreateRequest;
import com.management.galle_hospital.Payload.AppointmentRequestResponse;
import com.management.galle_hospital.Service.AppointmentRequestService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/appointments")
@RequiredArgsConstructor
public class AppointmentRequestController {
    private final AppointmentRequestService appointmentRequestService;

    @PostMapping("/requests")
    public ResponseEntity<?> createAppointmentRequest(@RequestBody AppointmentRequestCreateRequest request) {
        return appointmentRequestService.createAppointmentRequest(request);
    }

    @GetMapping("/requests")
    public List<AppointmentRequestResponse> getAllRequests() {
        return appointmentRequestService.getAllRequests();
    }

    @GetMapping("/patients/{patientId}/requests")
    public List<AppointmentRequestResponse> getRequestsByPatient(@PathVariable Long patientId) {
        return appointmentRequestService.getRequestsByPatient(patientId);
    }

    @GetMapping({"/nurses/{nurseId}/requests", "/consultants/{nurseId}/requests"})
    public ResponseEntity<?> getRequestsByNurse(
            @PathVariable Long nurseId,
            @RequestParam(required = false) AppointmentStatus status
    ) {
        return appointmentRequestService.getRequestsByNurse(nurseId, status);
    }

    @GetMapping("/doctors/{doctorId}/accepted-requests")
    public ResponseEntity<?> getAcceptedRequestsByDoctor(@PathVariable Long doctorId) {
        return appointmentRequestService.getAcceptedRequestsByDoctor(doctorId);
    }

    @PatchMapping("/requests/{requestId}/accept")
    public ResponseEntity<?> acceptRequest(
            @PathVariable Long requestId,
            @RequestParam(required = false) Long nurseId,
            @RequestParam(required = false) Long consultantId
    ) {
        return appointmentRequestService.acceptRequest(requestId, resolveNurseId(nurseId, consultantId));
    }

    @PatchMapping("/requests/{requestId}/remove")
    public ResponseEntity<?> removeRequest(
            @PathVariable Long requestId,
            @RequestParam(required = false) Long nurseId,
            @RequestParam(required = false) Long consultantId
    ) {
        return appointmentRequestService.removeRequest(requestId, resolveNurseId(nurseId, consultantId));
    }

    private Long resolveNurseId(Long nurseId, Long consultantId) {
        return nurseId != null ? nurseId : consultantId;
    }
}
