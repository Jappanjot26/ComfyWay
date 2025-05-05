import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import HotelCard from "../components/ui/HotelCard";

const HotelListingsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter states
  const [location, setLocation] = useState(searchParams.get("location") || "");
  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "");
  const [type, setType] = useState(searchParams.get("type") || "");

  useEffect(() => {
    // Update URL search parameters based on filter states
    const params = new URLSearchParams();
    if (location) params.set("location", location);
    if (minPrice) params.set("minPrice", minPrice);
    if (maxPrice) params.set("maxPrice", maxPrice);
    if (type) params.set("type", type);
    setSearchParams(params, { replace: true });

    const fetchHotels = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${
            import.meta.env.VITE_BACKEND_URL || "http://localhost:5000"
          }/api/hotels?${params.toString()}`
        );
        const res = await response.json();
        if (response.ok) {
          // Transform hotel data to include id and image URL
          const hotelsWithId = res.map((hotel) => ({
            ...hotel,
            id: hotel._id,
            image:
              hotel.images && hotel.images.length > 0
                ? hotel.images[0].startsWith("http")
                  ? hotel.images[0]
                  : `${
                      import.meta.env.VITE_BACKEND_URL ||
                      "http://localhost:5000"
                    }${hotel.images[0]}`
                : "/path/to/default-image.jpg", // Fallback image
          }));
          setHotels(hotelsWithId);
        }
      } catch (error) {
        console.error("Failed to fetch hotels:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, [location, minPrice, maxPrice, type, setSearchParams]);

  const resetFilters = () => {
    setLocation("");
    setMinPrice("");
    setMaxPrice("");
    setType("");
  };

  const propertyTypes = ["House", "Apartment", "Villa"];

  return (
    <div className="pt-24 pb-20">
      <div className="container-custom">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Find Your Perfect Stay
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filter Section */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Filters
                </h2>
                <button
                  onClick={resetFilters}
                  className="text-sm text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300"
                >
                  Reset All
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="location"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Location
                  </label>
                  <input
                    type="text"
                    id="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="City or destination"
                    className="form-input"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Price Range (per night)
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <input
                        type="number"
                        id="minPrice"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                        placeholder="Min"
                        min="0"
                        className="form-input"
                      />
                    </div>
                    <div>
                      <input
                        type="number"
                        id="maxPrice"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                        placeholder="Max"
                        min="0"
                        className="form-input"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="propertyType"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Property Type
                  </label>
                  <select
                    id="propertyType"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="form-input"
                  >
                    <option value="">All Types</option>
                    {propertyTypes.map((propertyType) => (
                      <option key={propertyType} value={propertyType}>
                        {propertyType}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Listings Section */}
          <div className="lg:col-span-3">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {hotels.length === 0 ? (
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 text-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-16 w-16 mx-auto text-gray-400 mb-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <h3 className="text-xl font-semibold mb-2 text-gray-900 darkテキスト-white">
                      Not found
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      Try adjusting your filters or search criteria.
                    </p>
                    <button onClick={resetFilters} className="btn btn-primary">
                      Reset Filters
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="mb-6 flex justify-between items-center">
                      <div className="text-gray-600 dark:text-gray-400">
                        Found{" "}
                        <span className="font-semibold">{hotels.length}</span>{" "}
                        properties
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                      {hotels.map((hotel) => (
                        <HotelCard hotel={hotel} key={hotel.id} />
                      ))}
                    </div>
                  </>
                )}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelListingsPage;
