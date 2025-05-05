import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import PremiumBadge from "./PremiumBadge";
import { useAuth } from "../../contexts/AuthContext";

const HotelCard = ({ hotel }) => {
  const { id, name, location, description, price, rating, isPremium, images } =
    hotel;
  const { isPremium: isUserPremium } = useAuth();

  const discountedPrice = isUserPremium ? price * 0.75 : price;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden flex flex-col"
    >
      {/* Image Section */}
      <div className="relative w-full aspect-w-16 aspect-h-9 bg-gray-100">
        {isPremium && (
          <div className="absolute top-3 left-3 z-10">
            <PremiumBadge />
          </div>
        )}
        <Link to={`/hotels/${id}`} className="block">
          <img
            src={images?.[0]}
            alt={name}
            className="w-full h-56 object-cover transition-transform duration-500 hover:scale-105"
          />
        </Link>
        {/* Rating Badge */}
        <div className="absolute bottom-3 left-3 bg-white dark:bg-gray-900 px-2 py-1 rounded-md flex items-center shadow">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-yellow-400 mr-1"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-.181h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span className="text-xs font-medium text-gray-800 dark:text-gray-200">
            {rating} / 5
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4 flex flex-col justify-between flex-grow">
        <div className="flex justify-between items-start">
          <div>
            <Link to={`/hotels/${id}`}>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white hover:text-primary-500">
                {name}
              </h3>
            </Link>
            <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm mt-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1 text-primary-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              {location}
            </div>
          </div>

          <div className="text-right">
            {isUserPremium ? (
              <div>
                <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
                  ₹{price}
                </span>
                <div className="text-lg font-bold text-primary-600 dark:text-primary-400">
                  ₹{discountedPrice}
                </div>
              </div>
            ) : (
              <div className="text-lg font-bold text-primary-600 dark:text-primary-400">
                ₹{price}
              </div>
            )}
            <span className="text-sm text-gray-500 dark:text-gray-400">
              per night
            </span>
          </div>
        </div>

        <p className="mt-3 text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
          {description}
        </p>

        {/* Action Buttons */}
        <div className="mt-4 flex justify-between items-center gap-2">
          <Link
            to={`/hotels/${id}`}
            className="btn btn-primary text-sm font-medium flex-grow"
          >
            View Details
          </Link>
          <Link
            to={`/book/${id}`}
            className="text-sm bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg flex-grow"
          >
            Book Now
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default HotelCard;
