import { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";
import toast from "react-hot-toast";

const ProfilePage = () => {
  const { currentUser, isPremium, logout, upgradeToPremium, loading } =
    useAuth();
  const { isDarkMode, canToggleDarkMode, toggleDarkMode } = useTheme();

  const [activeTab, setActiveTab] = useState("account");

  const handleUpgrade = async () => {
    if (isPremium) {
      toast.error("You are already a premium member");
      return;
    }

    await upgradeToPremium();
  };

  return (
    <div className="pt-24 pb-20">
      <div className="container-custom">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            My Profile
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Manage your account settings and preferences.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6"
            >
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center text-primary-600 dark:text-primary-400 font-bold text-2xl mx-auto">
                  {currentUser.name.charAt(0)}
                </div>
                <h2 className="mt-4 font-semibold text-lg text-gray-900 dark:text-white">
                  {currentUser.name}
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  {currentUser.email}
                </p>
                {isPremium && (
                  <div className="mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-accent-100 text-accent-800">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3.5 w-3.5 mr-1 text-accent-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    Premium Member
                  </div>
                )}
              </div>

              <nav>
                <ul className="space-y-1">
                  <li>
                    <button
                      onClick={() => setActiveTab("account")}
                      className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                        activeTab === "account"
                          ? "bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      }`}
                    >
                      <div className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 mr-3"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                        Account
                      </div>
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveTab("preferences")}
                      className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                        activeTab === "preferences"
                          ? "bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      }`}
                    >
                      <div className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 mr-3"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        Preferences
                      </div>
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveTab("premium")}
                      className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                        activeTab === "premium"
                          ? "bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      }`}
                    >
                      <div className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 mr-3"
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
                        Premium
                      </div>
                    </button>
                  </li>
                </ul>
              </nav>

              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={logout}
                  className="w-full px-4 py-2 text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                    Sign Out
                  </div>
                </button>
              </div>
            </motion.div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6"
            >
              {activeTab === "account" && (
                <div>
                  <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                    Account Information
                  </h2>

                  <div className="space-y-6">
                    <div>
                      <label className="form-label">Full Name</label>
                      <input
                        type="text"
                        value={currentUser.name}
                        className="form-input"
                        disabled
                      />
                    </div>

                    <div>
                      <label className="form-label">Email Address</label>
                      <input
                        type="email"
                        value={currentUser.email}
                        className="form-input"
                        disabled
                      />
                    </div>

                    <div>
                      <label className="form-label">Account Type</label>
                      <input
                        type="text"
                        value={isPremium ? "Premium Member" : "Standard Member"}
                        className="form-input"
                        disabled
                      />
                    </div>

                    <div>
                      <label className="form-label">Password</label>
                      <input
                        type="password"
                        value="********"
                        className="form-input"
                        disabled
                      />
                    </div>

                    <div className="pt-4">
                      <button className="btn btn-primary" disabled>
                        Update Information
                      </button>
                      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                        Account updates are disabled in this version.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "preferences" && (
                <div>
                  <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                    Preferences
                  </h2>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-4 text-gray-900 dark:text-white">
                        Appearance
                      </h3>

                      <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">
                              Dark Mode
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              Switch between light and dark theme
                            </p>
                          </div>

                          {canToggleDarkMode ? (
                            <button
                              onClick={toggleDarkMode}
                              className="relative inline-flex h-6 w-11 items-center rounded-full"
                            >
                              <span className="sr-only">Toggle dark mode</span>
                              <span
                                className={`${
                                  isDarkMode ? "bg-primary-500" : "bg-gray-300"
                                } inline-block h-6 w-11 rounded-full transition`}
                              ></span>
                              <span
                                className={`${
                                  isDarkMode ? "translate-x-6" : "translate-x-1"
                                } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                              ></span>
                            </button>
                          ) : (
                            <div className="flex items-center">
                              <span className="text-sm text-yellow-600 dark:text-yellow-400 mr-2">
                                Premium Only
                              </span>
                              <button
                                disabled
                                className="relative inline-flex h-6 w-11 items-center rounded-full opacity-50 cursor-not-allowed"
                              >
                                <span className="sr-only">
                                  Toggle dark mode
                                </span>
                                <span className="inline-block h-6 w-11 rounded-full bg-gray-300"></span>
                                <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-1"></span>
                              </button>
                            </div>
                          )}
                        </div>

                        {!isPremium && (
                          <div className="mt-4 text-sm text-gray-600 dark:text-gray-400 p-2 bg-gray-100 dark:bg-gray-600 rounded">
                            <p className="flex items-center">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 text-yellow-500 mr-1"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                              Upgrade to premium to use dark mode
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "premium" && (
                <div>
                  <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                    Premium Membership
                  </h2>

                  {isPremium ? (
                    <div className="bg-accent-50 dark:bg-accent-900/20 border border-accent-200 dark:border-accent-800 rounded-lg p-6 text-center">
                      <div className="w-16 h-16 bg-accent-100 dark:bg-accent-900/50 rounded-full flex items-center justify-center text-accent-500 mx-auto mb-4">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-8 w-8"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        You're a Premium Member!
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300 mb-6">
                        Enjoy all the benefits of your premium membership,
                        including exclusive discounts, dark mode access, and
                        premium property bookings.
                      </p>

                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="bg-white dark:bg-gray-700 rounded-lg p-4 text-center">
                          <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                            Membership
                          </h4>
                          <p className="text-accent-500 font-bold">Active</p>
                        </div>
                        <div className="bg-white dark:bg-gray-700 rounded-lg p-4 text-center">
                          <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                            Discount
                          </h4>
                          <p className="text-accent-500 font-bold">25%</p>
                        </div>
                      </div>

                      <button
                        className="btn bg-accent-500 hover:bg-accent-600 text-gray-900 w-full"
                        disabled
                      >
                        Manage Subscription
                      </button>
                      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                        Subscription management is disabled in this version.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm overflow-hidden">
                        <div className="p-6">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                                Premium Membership
                              </h3>
                              <p className="text-gray-600 dark:text-gray-400">
                                Unlock exclusive benefits and save on every
                                booking
                              </p>
                            </div>
                            <div className="bg-accent-100 dark:bg-accent-900/30 text-accent-800 dark:text-accent-300 px-2 py-1 rounded text-sm font-medium">
                              Recommended
                            </div>
                          </div>

                          <div className="mt-4">
                            <div className="text-3xl font-bold text-gray-900 dark:text-white">
                              ₹799
                              <span className="text-lg text-gray-500 dark:text-gray-400 font-normal">
                                /month
                              </span>
                            </div>
                            <p className="text-gray-500 dark:text-gray-400 text-sm">
                              Cancel anytime
                            </p>
                          </div>

                          <ul className="mt-6 space-y-3">
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
                                  className="h-5 w-5 text-primary-500 mt-0.5 mr-2"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                                <span className="text-gray-700 dark:text-gray-300">
                                  {benefit}
                                </span>
                              </li>
                            ))}
                          </ul>

                          <button
                            onClick={handleUpgrade}
                            disabled={loading}
                            className={`btn bg-accent-500 hover:bg-accent-600 text-gray-900 w-full mt-6 ${
                              loading ? "opacity-70 cursor-not-allowed" : ""
                            }`}
                          >
                            {loading ? (
                              <span className="flex items-center justify-center">
                                <svg
                                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-900"
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
                              "Upgrade Now"
                            )}
                          </button>
                        </div>

                        <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600">
                          <div className="text-center text-sm text-gray-600 dark:text-gray-400">
                            This is a demo upgrade. No actual payment is
                            processed.
                          </div>
                        </div>
                      </div>

                      <div className="bg-primary-50 dark:bg-primary-900/20 p-4 rounded-lg">
                        <h3 className="font-medium text-primary-800 dark:text-primary-300 mb-2">
                          Why upgrade to Premium?
                        </h3>
                        <p className="text-primary-700 dark:text-primary-400 text-sm">
                          Premium members save an average of ₹750 per booking.
                          With just one booking, your membership could pay for
                          itself!
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
