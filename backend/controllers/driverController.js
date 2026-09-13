const supabase = require("../config/supabase");

// Get all drivers
const getDrivers = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("drivers")
      .select("*")
      .order("id", { ascending: true });

    if (error) {
      return res.status(500).json({
        message: "Failed to fetch drivers",
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

// Get driver by ID
const getDriverById = async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from("drivers")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      return res.status(404).json({
        message: "Driver not found",
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

module.exports = {
  getDrivers,
  getDriverById
};