const supabase = require("../config/supabase");

// Register
const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email and password are required"
      });
    }

    // Check if user already exists
    const { data: existingUser, error: checkError } = await supabase
      .from("users")
      .select("id")
      .eq("email", email)
      .maybeSingle();

    if (checkError) {
      return res.status(500).json({
        message: "Database error",
        error: checkError.message
      });
    }

    if (existingUser) {
      return res.status(409).json({
        message: "User already exists"
      });
    }

    // Create user
    const { data, error } = await supabase
      .from("users")
      .insert([
        {
          name,
          email,
          password,
          role: role || "user"
        }
      ])
      .select("id, name, email, role, created_at")
      .single();

    if (error) {
      return res.status(500).json({
        message: "Failed to register user",
        error: error.message
      });
    }

    res.status(201).json({
      message: "Registration successful",
      user: data
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};

// Login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required"
      });
    }

    const { data, error } = await supabase
      .from("users")
      .select("id, name, email, password, role")
      .eq("email", email)
      .maybeSingle();

    if (error) {
      return res.status(500).json({
        message: "Database error",
        error: error.message
      });
    }

    if (!data || data.password !== password) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }

    // Don't send password to frontend
    const user = {
      id: data.id,
      name: data.name,
      email: data.email,
      role: data.role
    };

    res.json({
      message: "Login successful",
      user
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};

module.exports = {
  register,
  login
};