import apiClient from "../../../shared/api/api";

export const requestAppointment = async (payload) => {
  try {
    const response = await apiClient.post("/appointments/requests", payload);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to request appointment" };
  }
};

export const getPatientAppointmentRequests = async (patientId) => {
  try {
    const response = await apiClient.get(`/appointments/patients/${patientId}/requests`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to fetch appointment requests" };
  }
};

export const getAllAppointmentRequests = async () => {
  try {
    const response = await apiClient.get("/appointments/requests");
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to fetch appointment requests" };
  }
};

export const getNurseAppointmentRequests = async (nurseId, status = "") => {
  try {
    const response = await apiClient.get(
      `/appointments/nurses/${nurseId}/requests`,
      {
        params: status ? { status } : {},
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to fetch appointment requests" };
  }
};

export const getDoctorAcceptedAppointmentRequests = async (doctorId) => {
  try {
    const response = await apiClient.get(
      `/appointments/doctors/${doctorId}/accepted-requests`
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to fetch session patients" };
  }
};

export const acceptAppointmentRequest = async ({ requestId, nurseId }) => {
  try {
    const response = await apiClient.patch(
      `/appointments/requests/${requestId}/accept`,
      null,
      { params: { nurseId } }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to accept appointment request" };
  }
};

export const removeAppointmentRequest = async ({ requestId, nurseId }) => {
  try {
    const response = await apiClient.patch(
      `/appointments/requests/${requestId}/remove`,
      null,
      { params: { nurseId } }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to remove appointment request" }; //error reponse
  }
};
