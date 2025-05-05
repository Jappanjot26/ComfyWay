import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useAuth } from "../contexts/AuthContext";
import toast from "react-hot-toast";

const AddPropertyPage = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);

  // Form state
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [type, setType] = useState("Hotel");
  const [rooms, setRooms] = useState("");
  const [isPremium, setIsPremium] = useState(false);
  const [amenities, setAmenities] = useState([]);
  const [images, setImages] = useState(["", "", ""]);
  const [availableDates, setAvailableDates] = useState({
    start: new Date(),
    end: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
  });

  // Available amenities
  const availableAmenities = [
    "Swimming Pool",
    "Gym",
    "Free WiFi",
    "Free Food",
    "Car Parking",
  ];

  // Property types
  const propertyTypes = ["House ", "Apartment", "Villa"];

  const handleAmenityToggle = (amenity) => {
    if (amenities.includes(amenity)) {
      setAmenities(amenities.filter((a) => a !== amenity));
    } else {
      setAmenities([...amenities, amenity]);
    }
  };

  const handleImageChange = (index, value) => {
    const newImages = [...images];
    newImages[index] = value;
    setImages(newImages);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    if (!name || !description || !location || !price || !type || !rooms) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (images.filter(Boolean).length === 0) {
      toast.error("Please add at least one image URL");
      return;
    }

    setLoading(true);

    try {
      const propertyData = {
        ownerId: currentUser.id,
        name,
        description,
        location,
        price: Number(price),
        type,
        rooms: Number(rooms),
        isPremium,
        amenities,
        images: images.filter(Boolean),
        availableDates,
      };

      const response = await fetch(
        `${
          import.meta.env.VITE_BACKEND_URL || "http://localhost:5000"
        }/api/hotels`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${currentUser.token}`,
          },
          body: JSON.stringify(propertyData),
        }
      );

      const res = await response.json();

      if (response.ok) {
        toast.success("Property added successfully!");
        navigate("/owner/dashboard");
      } else {
        toast.error(res.message || "Failed to add property");
      }
    } catch (error) {
      console.error("Error adding property:", error);
      toast.error("An error occurred while adding the property");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-24 pb-20">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2 text-gray-900 dark:text-white">
              Add New Property
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Fill in the details below to list your property
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div>
                <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                  Basic Information
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="form-label">
                      Property Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="form-input"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="location" className="form-label">
                      Location
                    </label>
                    <input
                      type="text"
                      id="location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="form-input"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="type" className="form-label">
                      Property Type
                    </label>
                    <select
                      id="type"
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                      className="form-input"
                      required
                    >
                      {propertyTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="rooms" className="form-label">
                      Number of Rooms
                    </label>
                    <input
                      type="number"
                      id="rooms"
                      value={rooms}
                      onChange={(e) => setRooms(e.target.value)}
                      min="1"
                      className="form-input"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <label htmlFor="description" className="form-label">
                  Description
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows="4"
                  className="form-input"
                  required
                ></textarea>
              </div>

              {/* Pricing and Availability */}
              <div>
                <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                  Pricing and Availability
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="price" className="form-label">
                      Price per Night (₹)
                    </label>
                    <input
                      type="number"
                      id="price"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      min="0"
                      step="0.01"
                      className="form-input"
                      required
                    />
                  </div>

                  <div>
                    <label className="form-label">Available Dates</label>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <DatePicker
                          selected={availableDates.start}
                          onChange={(date) =>
                            setAvailableDates({
                              ...availableDates,
                              start: date,
                            })
                          }
                          className="form-input"
                          placeholderText="Start Date"
                        />
                      </div>
                      <div>
                        <DatePicker
                          selected={availableDates.end}
                          onChange={(date) =>
                            setAvailableDates({ ...availableDates, end: date })
                          }
                          className="form-input"
                          placeholderText="End Date"
                          minDate={availableDates.start}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      checked={isPremium}
                      onChange={(e) => setIsPremium(e.target.checked)}
                      className="form-checkbox h-5 w-5 text-primary-500"
                    />
                    <span className="ml-2 text-gray-700 dark:text-gray-300">
                      List as Premium Property
                    </span>
                  </label>
                </div>
              </div>

              {/* Images */}
              <div>
                <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                  Property Images
                </h2>

                <div className="space-y-4">
                  {images.map((url, index) => (
                    <div key={index}>
                      <label className="form-label">
                        Image URL {index + 1}
                        {index === 0 && " (Primary)"}
                      </label>
                      <input
                        type="url"
                        value={url}
                        onChange={(e) =>
                          handleImageChange(index, e.target.value)
                        }
                        placeholder="https://example.com/image.jpg"
                        className="form-input"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Amenities */}
              <div>
                <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                  Amenities
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {availableAmenities.map((amenity) => (
                    <label key={amenity} className="inline-flex items-center">
                      <input
                        type="checkbox"
                        checked={amenities.includes(amenity)}
                        onChange={() => handleAmenityToggle(amenity)}
                        className="form-checkbox h-5 w-5 text-primary-500"
                      />
                      <span className="ml-2 text-gray-700 dark:text-gray-300">
                        {amenity}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => navigate("/owner/dashboard")}
                  className="btn btn-outline"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className={`btn btn-primary ${
                    loading ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {loading ? (
                    <span className="flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Adding Property...
                    </span>
                  ) : (
                    "Add Property"
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AddPropertyPage;
