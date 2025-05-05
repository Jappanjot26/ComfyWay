import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import User from "./models/User.js";
import Hotel from "./models/Hotel.js";
import Booking from "./models/Booking.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Auth middleware
const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      throw new Error();
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).send({ error: "Please authenticate" });
  }
};

// Auth routes
app.post("/api/auth/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create user
    const user = new User({
      name,
      email,
      password,
      role,
    });

    await user.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error saving user:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isPremium: user.isPremium,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Hotel routes
app.get("/api/hotels", async (req, res) => {
  try {
    const { location, minPrice, maxPrice, type, ownerId } = req.query;

    let query = {};

    if (location) {
      query.location = { $regex: location, $options: "i" };
    }

    if (minPrice !== undefined) {
      query.price = { $gte: Number(minPrice) };
    }

    if (maxPrice !== undefined) {
      query.price = { ...query.price, $lte: Number(maxPrice) };
    }

    if (type) {
      query.type = type;
    }

    if (ownerId) {
      query.ownerId = ownerId;
    }

    const hotels = await Hotel.find(query);
    res.json(hotels);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/api/hotels/:id", async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }
    res.json(hotel);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/api/hotels", auth, async (req, res) => {
  try {
    if (req.user.role !== "owner") {
      return res
        .status(403)
        .json({ message: "Access denied. Only owners can add properties." });
    }

    const hotel = new Hotel({
      ...req.body,
      ownerId: req.user._id,
    });

    await hotel.save();
    res.status(201).json(hotel);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

app.put("/api/hotels/:id", auth, async (req, res) => {
  try {
    const hotel = await Hotel.findOne({
      _id: req.params.id,
      ownerId: req.user._id,
    });

    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    Object.assign(hotel, req.body);
    await hotel.save();

    res.json(hotel);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

app.delete("/api/hotels/:id", auth, async (req, res) => {
  try {
    const hotel = await Hotel.findOneAndDelete({
      _id: req.params.id,
      ownerId: req.user._id,
    });

    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    res.json({ message: "Hotel deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Booking routes
app.post("/api/bookings", auth, async (req, res) => {
  try {
    const { hotelId } = req.body;

    // Debugging log to verify hotelId
    console.log("Hotel ID received:", hotelId);

    // Check if the hotel exists
    const hotel = await Hotel.findById(hotelId);
    if (!hotel) {
      console.error("Hotel not found for ID:", hotelId); // Debugging log
      return res.status(404).json({ message: "Hotel not found" });
    }

    const booking = new Booking({
      ...req.body,
      userId: req.user._id,
    });

    await booking.save();

    // Update the hotel's bookings field
    await Hotel.findByIdAndUpdate(hotelId, {
      $push: { bookings: booking._id },
    });

    res.status(201).json(booking);
  } catch (error) {
    console.error("Error confirming booking:", error); // Debugging log
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/api/bookings/user", auth, async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user._id })
      .populate("hotelId")
      .sort("-createdAt");

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/api/bookings/owner", auth, async (req, res) => {
  try {
    if (req.user.role !== "owner") {
      return res
        .status(403)
        .json({ message: "Access denied. Only owners can view bookings." });
    }

    // Get owner's hotels
    const hotels = await Hotel.find({ ownerId: req.user._id });
    const hotelIds = hotels.map((hotel) => hotel._id);

    // Get bookings for these hotels
    const bookings = await Booking.find({ hotelId: { $in: hotelIds } })
      .populate("userId", "name email")
      .populate("hotelId", "name location")
      .sort("-createdAt");

    res.json(bookings);
  } catch (error) {
    console.error("Error fetching owner bookings:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Analytics routes
app.get("/api/analytics/owner", auth, async (req, res) => {
  try {
    // Get owner's hotels
    const hotels = await Hotel.find({ ownerId: req.user._id });
    const hotelIds = hotels.map((hotel) => hotel._id);

    // Get all bookings for these hotels
    const bookings = await Booking.find({ hotelId: { $in: hotelIds } });

    // Calculate total revenue
    const totalRevenue = bookings.reduce(
      (sum, booking) => sum + booking.totalPrice,
      0
    );

    // Generate monthly data
    const monthlyData = await Booking.aggregate([
      {
        $match: {
          hotelId: { $in: hotelIds },
        },
      },
      {
        $group: {
          _id: {
            month: { $month: "$createdAt" },
            year: { $year: "$createdAt" },
          },
          revenue: { $sum: "$totalPrice" },
          bookings: { $sum: 1 },
        },
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1,
        },
      },
    ]);

    res.json({
      totalProperties: hotels.length,
      totalBookings: bookings.length,
      totalRevenue,
      monthlyData: monthlyData.map((data) => ({
        month: new Date(data._id.year, data._id.month - 1).toLocaleString(
          "default",
          { month: "short" }
        ),
        revenue: data.revenue,
        bookings: data.bookings,
      })),
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

app.use((req, res, next) => {
  res.status(404).json({ message: "Endpoint not found" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal server error" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
