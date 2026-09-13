const supabase = require("../config/supabase");

// Create booking
const createBooking = async (req, res) => {
  try {
    const {
      user_id,
      vehicle_id,
      driver_id,
      start_date,
      end_date
    } = req.body;

    if (!user_id || !vehicle_id || !start_date || !end_date) {
      return res.status(400).json({
        message: "user_id, vehicle_id, start_date and end_date are required"
      });
    }

    // Check vehicle
    const { data: vehicle, error: vehicleError } = await supabase
      .from("vehicles")
      .select("*")
      .eq("id", vehicle_id)
      .single();

    if (vehicleError || !vehicle) {
      return res.status(404).json({
        message: "Vehicle not found"
      });
    }

    if (!vehicle.available) {
      return res.status(400).json({
        message: "Vehicle is not available"
      });
    }

    // Calculate number of days
    const start = new Date(start_date);
    const end = new Date(end_date);

    if (end < start) {
      return res.status(400).json({
        message: "End date must be after start date"
      });
    }

    const difference = end.getTime() - start.getTime();
    const days = Math.max(
      1,
      Math.ceil(difference / (1000 * 60 * 60 * 24))
    );

    const total_price = days * Number(vehicle.price);

    // Create booking
    const { data: booking, error: bookingError } = await supabase
      .from("bookings")
      .insert([
        {
          user_id,
          vehicle_id,
          driver_id: driver_id || null,
          start_date,
          end_date,
          days,
          price_per_day: vehicle.price,
          total_price,
          status: "confirmed"
        }
      ])
      .select()
      .single();

    if (bookingError) {
      return res.status(500).json({
        message: "Failed to create booking",
        error: bookingError.message
      });
    }

    // Mark vehicle unavailable
    const { error: updateError } = await supabase
      .from("vehicles")
      .update({ available: false })
      .eq("id", vehicle_id);

    if (updateError) {
      return res.status(500).json({
        message: "Booking created but vehicle status could not be updated",
        error: updateError.message,
        booking
      });
    }

    res.status(201).json({
      message: "Booking created successfully",
      booking
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};


// Get all bookings
const getBookings = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .order("id", { ascending: false });

    if (error) {
      return res.status(500).json({
        message: "Failed to fetch bookings",
        error: error.message
      });
    }

    res.json(data);

  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};


// Get bookings for a user
const getUserBookings = async (req, res) => {
  try {
    const { userId } = req.params;

    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .eq("user_id", userId)
      .order("id", { ascending: false });

    if (error) {
      return res.status(500).json({
        message: "Failed to fetch user bookings",
        error: error.message
      });
    }

    res.json(data);

  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};


// Update booking
const updateBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const { data, error } = await supabase
      .from("bookings")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error || !data) {
      return res.status(404).json({
        message: "Booking not found",
        error: error?.message
      });
    }

    res.json({
      message: "Booking updated successfully",
      booking: data
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};


// Cancel booking
const cancelBooking = async (req, res) => {
  try {
    const { id } = req.params;

    // Find booking first
    const { data: booking, error: findError } = await supabase
      .from("bookings")
      .select("*")
      .eq("id", id)
      .single();

    if (findError || !booking) {
      return res.status(404).json({
        message: "Booking not found"
      });
    }

    // Update booking status
    const { data, error } = await supabase
      .from("bookings")
      .update({ status: "cancelled" })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return res.status(500).json({
        message: "Failed to cancel booking",
        error: error.message
      });
    }

    // Make vehicle available again
    const { error: vehicleError } = await supabase
      .from("vehicles")
      .update({ available: true })
      .eq("id", booking.vehicle_id);

    if (vehicleError) {
      return res.status(500).json({
        message: "Booking cancelled but vehicle status could not be updated",
        error: vehicleError.message,
        booking: data
      });
    }

    res.json({
      message: "Booking cancelled successfully",
      booking: data
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};


module.exports = {
  createBooking,
  getBookings,
  getUserBookings,
  updateBooking,
  cancelBooking
};