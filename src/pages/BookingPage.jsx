import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { format, addDays, differenceInDays } from "date-fns";
import { motion } from "framer-motion";
import { useAuth } from "../contexts/AuthContext";
import toast from "react-hot-toast";
import PremiumBadge from "../components/ui/PremiumBadge";

const BookingPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser, isPremium } = useAuth();

  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  // Form state
  const [checkIn, setCheckIn] = useState(format(new Date(), "yyyy-MM-dd"));
  const [checkOut, setCheckOut] = useState(
    format(addDays(new Date(), 2), "yyyy-MM-dd")
  );
  const [guests, setGuests] = useState(2);

  // Calculate booking details
  const nights =
    checkIn && checkOut
      ? differenceInDays(new Date(checkOut), new Date(checkIn))
      : 0;
  const basePrice = hotel ? hotel.price * nights * guests : 0;
  const discountAmount = isPremium ? basePrice * 0.25 : 0;
  const totalPrice = basePrice - discountAmount;

  useEffect(() => {
    const fetchHotel = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `${
            import.meta.env.VITE_BACKEND_URL || "http://localhost:5000"
          }/api/hotels/${id}`
        );
        const res = await response.json();

        if (response.ok) {
          setHotel(res);

          // Check if premium hotel but user is not premium
          if (res.isPremium && !isPremium) {
            setError(
              "This is a premium property. Only premium members can book it."
            );
          }
        } else {
          setError(res.message || "Failed to load hotel details");
        }
      } catch (error) {
        console.error("Error fetching hotel:", error);
        setError("An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchHotel();
  }, [id, isPremium]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currentUser || !hotel) return;

    // Validate dates
    if (nights <= 0) {
      toast.error("Check-out date must be after check-in date");
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_BACKEND_URL || "http://localhost:5000"
        }/api/bookings`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${currentUser.token}`,
          },
          body: JSON.stringify({
            hotelId: hotel._id,
            checkIn,
            checkOut,
            guests,
            totalPrice,
          }),
        }
      );
      const res = await response.json();

      if (response.ok) {
        toast.success("Booking confirmed successfully!");
        navigate("/bookings");
      } else {
        toast.error(res.message || "Failed to create booking");
      }
    } catch (error) {
      console.error("Booking error:", error);
      toast.error("An error occurred while processing your booking");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="pt-24 flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (error || !hotel) {
    return (
      <div className="pt-24 pb-20">
        <div className="container-custom">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 mx-auto text-error-500 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
              {error || "Unable to proceed with booking"}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {hotel?.isPremium && !isPremium
                ? "Upgrade your account to premium to book this property."
                : "Please try another property or contact customer support."}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={() => navigate(-1)} className="btn btn-outline">
                Go Back
              </button>
              {hotel?.isPremium && !isPremium && (
                <button
                  onClick={() => navigate("/profile")}
                  className="btn btn-accent"
                >
                  Upgrade to Premium
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
            Complete Your Booking
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Booking Form */}
            <div className="md:col-span-2">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8">
                <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                  Booking Details
                </h2>

                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    <div>
                      <label htmlFor="check-in" className="form-label">
                        Check-in Date
                      </label>
                      <input
                        type="date"
                        id="check-in"
                        value={checkIn}
                        onChange={(e) => setCheckIn(e.target.value)}
                        min={format(new Date(), "yyyy-MM-dd")}
                        className="form-input"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="check-out" className="form-label">
                        Check-out Date
                      </label>
                      <input
                        type="date"
                        id="check-out"
                        value={checkOut}
                        onChange={(e) => setCheckOut(e.target.value)}
                        min={format(
                          addDays(new Date(checkIn), 1),
                          "yyyy-MM-dd"
                        )}
                        className="form-input"
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-6">
                    <label htmlFor="guests" className="form-label">
                      Number of Guests
                    </label>
                    <select
                      id="guests"
                      value={guests}
                      onChange={(e) => setGuests(parseInt(e.target.value))}
                      className="form-input"
                      required
                    >
                      {[1, 2, 3, 4, 5, 6].map((num) => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? "Guest" : "Guests"}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-lg font-medium mb-3 text-gray-900 dark:text-white">
                      Guest Information
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="form-label">
                          Full Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          value={currentUser.name}
                          className="form-input bg-gray-50 dark:bg-gray-700"
                          readOnly
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className="form-label">
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          value={currentUser.email}
                          className="form-input bg-gray-50 dark:bg-gray-700"
                          readOnly
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mb-8">
                    <h3 className="text-lg font-medium mb-3 text-gray-900 dark:text-white">
                      Special Requests (Optional)
                    </h3>
                    <textarea
                      id="special-requests"
                      rows="3"
                      placeholder="Any special requests or preferences..."
                      className="form-input"
                    ></textarea>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      Special requests cannot be guaranteed, but the property
                      will do its best to accommodate.
                    </p>
                  </div>

                  <div className="mb-6">
                    <div className="flex items-center mb-4">
                      <input
                        id="terms"
                        type="checkbox"
                        required
                        className="w-4 h-4 text-primary-500 bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded focus:ring-primary-500"
                      />
                      <label
                        htmlFor="terms"
                        className="ml-2 text-sm text-gray-700 dark:text-gray-300"
                      >
                        I agree to the{" "}
                        <a
                          href="#"
                          className="text-primary-500 hover:underline"
                        >
                          Terms and Conditions
                        </a>{" "}
                        and{" "}
                        <a
                          href="#"
                          className="text-primary-500 hover:underline"
                        >
                          Cancellation Policy
                        </a>
                      </label>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting || nights <= 0}
                    className={`btn btn-primary w-full ${
                      submitting ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                  >
                    {submitting ? (
                      <span className="flex items-center justify-center">
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
                        Processing...
                      </span>
                    ) : (
                      "Confirm Booking"
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* Booking Summary */}
            <div className="md:col-span-1">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 sticky top-24">
                <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                  Booking Summary
                </h2>

                <div className="flex items-center mb-4">
                  <div className="w-20 h-20 rounded-md overflow-hidden mr-4">
                    <img
                      src={hotel.images[0]}
                      alt={hotel.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {hotel.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {hotel.location}
                    </p>
                    {hotel.isPremium && <PremiumBadge className="mt-1" />}
                  </div>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mb-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600 dark:text-gray-400">
                      Check-in
                    </span>
                    <span className="text-gray-900 dark:text-white font-medium">
                      {format(new Date(checkIn), "MMM dd, yyyy")}
                    </span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600 dark:text-gray-400">
                      Check-out
                    </span>
                    <span className="text-gray-900 dark:text-white font-medium">
                      {format(new Date(checkOut), "MMM dd, yyyy")}
                    </span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600 dark:text-gray-400">
                      Duration
                    </span>
                    <span className="text-gray-900 dark:text-white font-medium">
                      {nights} {nights === 1 ? "night" : "nights"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      Guests
                    </span>
                    <span className="text-gray-900 dark:text-white font-medium">
                      {guests} {guests === 1 ? "guest" : "guests"}
                    </span>
                  </div>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mb-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600 dark:text-gray-400">
                      ₹{hotel.price} x {nights}{" "}
                      {nights === 1 ? "night" : "nights"} x {guests}{" "}
                      {guests === 1 ? "guest" : "guests"}
                    </span>
                    <span className="text-gray-900 dark:text-white font-medium">
                      ₹{basePrice}
                    </span>
                  </div>

                  {isPremium && (
                    <div className="flex justify-between mb-2 text-accent-600 dark:text-accent-400">
                      <span>Premium Discount (25%)</span>
                      <span>-₹{discountAmount}</span>
                    </div>
                  )}
                </div>

                <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                  <div className="flex justify-between">
                    <span className="text-lg font-semibold text-gray-900 dark:text-white">
                      Total
                    </span>
                    <span className="text-lg font-semibold text-primary-600 dark:text-primary-400">
                      ₹{totalPrice}
                    </span>
                  </div>

                  {isPremium && (
                    <div className="mt-2 bg-accent-50 dark:bg-accent-900/20 text-accent-800 dark:text-accent-300 text-sm p-2 rounded flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-1"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5 2a2 2 0 00-2 2v14l3.5-2 3.5 2 3.5-2 3.5 2V4a2 2 0 00-2-2H5zm4.707 3.707a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L8.414 9H10a3 3 0 013 3v1a1 1 0 102 0v-1a5 5 0 00-5-5H8.414l1.293-1.293z"
                          clipRule="evenodd"
                        />
                      </svg>
                      You saved ₹{discountAmount} with your premium membership!
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BookingPage;
