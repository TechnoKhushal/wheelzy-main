const API_BASE_URL =
  import.meta.env.VITE_API_URL || "/api";

async function request(endpoint, options = {}) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
}

export const api = {
  // Vehicles
  getVehicles: () => request("/vehicles"),
  getVehicle: (id) => request(`/vehicles/${id}`),

  // Drivers
  getDrivers: () => request("/drivers"),
  getDriver: (id) => request(`/drivers/${id}`),

  // Authentication
  login: (data) =>
    request("/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  register: (data) =>
    request("/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  // Bookings
  createBooking: (data) =>
    request("/bookings", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  getBookings: () => request("/bookings"),
};