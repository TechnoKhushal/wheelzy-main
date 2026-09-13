const supabase = require("../config/supabase");

// Get all vehicles
const getVehicles = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("vehicles")
      .select("*")
      .order("id", { ascending: true });

    if (error) {
      return res.status(500).json({
        message: "Failed to fetch vehicles",
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

// Get vehicle by ID
const getVehicleById = async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from("vehicles")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      return res.status(404).json({
        message: "Vehicle not found",
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

// Add vehicle
const addVehicle = async (req, res) => {
  try {
    const {
      name,
      brand,
      category,
      price,
      location,
      image,
      seats,
      fuel,
      transmission
    } = req.body;

    if (!name || !brand || !category || price === undefined) {
      return res.status(400).json({
        message: "Name, brand, category and price are required"
      });
    }

    const { data, error } = await supabase
      .from("vehicles")
      .insert([
        {
          name,
          brand,
          category,
          price,
          location,
          image,
          seats: seats || 5,
          fuel,
          transmission,
          available: true
        }
      ])
      .select()
      .single();

    if (error) {
      return res.status(500).json({
        message: "Failed to add vehicle",
        error: error.message
      });
    }

    res.status(201).json({
      message: "Vehicle added successfully",
      vehicle: data
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};

module.exports = {
  getVehicles,
  getVehicleById,
  addVehicle
};