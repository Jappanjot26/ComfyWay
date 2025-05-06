import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import HotelCard from "../components/ui/HotelCard";
import Initial from "../components/ui/Initial";
import Footer from "../components/layout/Footer";

const HomePage = () => {
  const [featuredHotels, setFeaturedHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedHotels = async () => {
      try {
        const response = await fetch(
          `${
            import.meta.env.VITE_BACKEND_URL || "http://localhost:5000"
          }/api/hotels`
        );
        const res = await response.json();
        if (response.ok) {
          const sorted = [...res]
            .sort((a, b) => b.rating - a.rating)
            .slice(0, 3);
          setFeaturedHotels(sorted);
        }
      } catch (error) {
        console.error("Failed to fetch featured hotels:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedHotels();
  }, []);

  return (
    <div className="pt-16">
      <Initial />
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              Your Home Away From Home
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Discover the comfort and convenience of our carefully curated
              properties, designed to make you feel right at home.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg text-center"
            >
              <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/50 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 256 256"
                  className="w-6 h-6 fill-primary-500"
                >
                  <path d="M109.66,146.34a8,8,0,0,1,0,11.32L83.31,184l18.35,18.34A8,8,0,0,1,96,216H48a8,8,0,0,1-8-8V160a8,8,0,0,1,13.66-5.66L72,172.69l26.34-26.35A8,8,0,0,1,109.66,146.34ZM83.31,72l18.35-18.34A8,8,0,0,0,96,40H48a8,8,0,0,0-8,8V96a8,8,0,0,0,13.66,5.66L72,83.31l26.34,26.35a8,8,0,0,0,11.32-11.32ZM208,40H160a8,8,0,0,0-5.66,13.66L172.69,72,146.34,98.34a8,8,0,0,0,11.32,11.32L184,83.31l18.34,18.35A8,8,0,0,0,216,96V48A8,8,0,0,0,208,40Zm3.06,112.61a8,8,0,0,0-8.72,1.73L184,172.69l-26.34-26.35a8,8,0,0,0-11.32,11.32L172.69,184l-18.35,18.34A8,8,0,0,0,160,216h48a8,8,0,0,0,8-8V160A8,8,0,0,0,211.06,152.61Z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                Spacious Accommodations
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Enjoy ample space to relax and unwind in our generously sized
                rooms and suites.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg text-center"
            >
              <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/50 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 fill-primary-500"
                  viewBox="0 0 256 256"
                >
                  <path d="M224,152v40a16,16,0,0,1-16,16H48a16,16,0,0,1-16-16V152a16,16,0,0,1,16-16H208A16,16,0,0,1,224,152ZM208,48H48A16,16,0,0,0,32,64v40a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V64A16,16,0,0,0,208,48Z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                Fully Equipped Kitchens
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Prepare your favorite meals with ease in our fully equipped
                kitchens, complete with modern appliances and utensils.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg text-center"
            >
              <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/50 rounded-full flex items-center justify-center mx-auto mb-4 ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 fill-primary-500"
                  viewBox="0 0 256 256"
                >
                  <path d="M16,100V72A16,16,0,0,1,32,56h84a4,4,0,0,1,4,4v76H64a32,32,0,0,0-32-32H20A4,4,0,0,1,16,100Zm208,4h12a4,4,0,0,0,4-4V72a16,16,0,0,0-16-16H140a4,4,0,0,0-4,4v76h56A32,32,0,0,1,224,104Zm8,16h-8a16,16,0,0,0-16,16v8a8,8,0,0,1-8,8H56a8,8,0,0,1-8-8v-8a16,16,0,0,0-16-16H24A16,16,0,0,0,8,136v32a16,16,0,0,0,16,16h8v15.73A8.18,8.18,0,0,0,39.47,208,8,8,0,0,0,48,200V184H208v15.73a8.17,8.17,0,0,0,7.47,8.25,8,8,0,0,0,8.53-8V184h8a16,16,0,0,0,16-16V136A16,16,0,0,0,232,120Z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                Cozy Living Spaces
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Relax and unwind in our comfortable living spaces, featuring
                plush seating, entertainment options, and a warm ambiance.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
     
      {/* Premium Section */}
      <section className="py-20 bg-primary-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
            <defs>
              <pattern
                id="pattern"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M0 20 L40 20 M20 0 L20 40"
                  stroke="currentColor"
                  strokeWidth="1"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#pattern)" />
          </svg>
        </div>

        <div className="container-custom relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-10">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="md:w-1/2"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Upgrade to Premium
              </h2>
              <p className="text-lg text-gray-200 mb-6">
                Unlock exclusive benefits with our premium membership. Enjoy 25%
                discounts on all properties, special access to premium listings,
                and dark mode for a better browsing experience.
              </p>
              <ul className="mb-8 space-y-3">
                {[
                  "25% discount on all bookings",
                  "Access to exclusive premium properties",
                  "Dark mode enabled",
                  "Priority customer support",
                  "No booking fees",
                ].map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-accent-500 mt-1 mr-2 flex-shrink-0"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {benefit}
                  </li>
                ))}
              </ul>
              <Link to="/profile" className="btn btn-accent">
                Upgrade Now
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="md:w-1/2 relative"
            >
              <div className="relative bg-primary-800 p-6 rounded-lg border border-primary-700 shadow-xl">
                <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
                  <div className="bg-accent-500 text-primary-900 text-xs font-bold px-2 py-1 rounded">
                    PREMIUM
                  </div>
                </div>

                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-primary-700 rounded-full flex items-center justify-center mr-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-primary-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Premium Membership</h3>
                    <p className="text-primary-300 text-sm">
                      Unlock exclusive benefits
                    </p>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="text-3xl font-bold mb-1">
                    ₹799
                    <span className="text-lg text-primary-300 font-normal">
                      /month
                    </span>
                  </div>
                  <p className="text-primary-300 text-sm">Cancel anytime</p>
                </div>

                {/* Placeholder for a UI element showing premium benefits */}
                <div className="bg-primary-700/50 p-4 rounded mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <div className="text-sm">Standard price</div>
                    <div className="font-medium">₹2000</div>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <div className="text-sm">Premium discount</div>
                    <div className="text-accent-400 font-medium">-₹500</div>
                  </div>
                  <div className="border-t border-primary-600 my-2"></div>
                  <div className="flex justify-between items-center">
                    <div className="font-medium">Your price</div>
                    <div className="font-bold text-lg">₹1500</div>
                  </div>
                </div>

                <div className="text-center mt-6">
                  <Link to="/profile" className="btn btn-accent w-full">
                    Upgrade Now
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      {/* Testimonials */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              What Our Guests Say
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Read authentic reviews from our satisfied guests.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Anmol Sharma",
                location: "Chandigarh",
                comment:
                  "ComfyWay gave us a ghar jaisa feeling! The properties felt just like home, and the discounts helped us extend our stay.",
              },
              {
                name: "Karan Patel",
                location: "Ahmedabad",
                comment:
                  "I travel frequently for work, and ComfyWay's premium membership is a lifesaver. The priority support is excellent!",
              },
              {
                name: "Priya Kumar",
                location: "Delhi",
                comment:
                  "The properties are so well-maintained and clean. It felt like a home away from home. Highly recommended!",
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg relative"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 absolute top-6 right-6 text-gray-200 dark:text-gray-700"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <div className="mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 inline text-yellow-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  "{testimonial.comment}"
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center text-primary-600 dark:text-primary-400 font-bold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div className="ml-3">
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {testimonial.location}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-16 bg-primary-500 text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Find Your Perfect Stay?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Browse our collection of handpicked properties and start planning
            your next adventure.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/hotels"
              className="btn bg-white text-primary-600 hover:bg-gray-100"
            >
              Browse Hotels
            </Link>
            <Link
              to="/register"
              className="btn btn-outline border-white text-white hover:bg-white/10"
            >
              Create Account
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default HomePage;
