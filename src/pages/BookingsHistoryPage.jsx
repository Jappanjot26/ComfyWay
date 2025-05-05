import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const BookingsHistoryPage = () => {
  const { currentUser } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookings = async () => {
      if (!currentUser || !currentUser.token) {
        toast.error("You must be logged in to view your bookings.");
        navigate("/login");
        return;
      }

      setLoading(true);
      try {
        const response = await fetch(
          `${
            import.meta.env.VITE_BACKEND_URL || "http://localhost:5000"
          }/api/bookings/user`,
          {
            headers: {
              Authorization: `Bearer ${currentUser.token}`,
            },
          }
        );

        if (response.status === 401) {
          toast.error("Session expired. Please log in again.");
          navigate("/login");
          return;
        }

        const res = await response.json();

        if (response.ok) {
          setBookings(res);
        } else {
          toast.error(res.message || "Failed to fetch bookings");
        }
      } catch (error) {
        console.error("Error fetching bookings:", error);
        toast.error("An error occurred while fetching bookings");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [currentUser, navigate]);

  if (loading) {
    return (
      <div className="pt-24 flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div className="pt-24 pb-20">
        <div className="container-custom">
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4">No Bookings Found</h2>
            <p className="text-gray-600">You have not made any bookings yet.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20">
      <div className="container-custom">
        <h1 className="text-3xl font-bold mb-6">My Bookings</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4"
            >
              <h2 className="text-xl font-semibold mb-2">
                {booking.hotelId.name}
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                {booking.hotelId.location}
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                Check-in: {new Date(booking.checkIn).toLocaleDateString()}
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                Check-out: {new Date(booking.checkOut).toLocaleDateString()}
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                Guests: {booking.guests}
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                Total Price: ₹{booking.totalPrice}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookingsHistoryPage;
