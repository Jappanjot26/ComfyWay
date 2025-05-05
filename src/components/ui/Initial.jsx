import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const houseImages = [
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
  "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
];

const locations = ["Delhi, India", "Goa, India", "Hyderabad, India"];

const App = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate();

  const handleImageChange = (direction) => {
    if (direction === "next") {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === houseImages.length - 1 ? 0 : prevIndex + 1
      );
    } else if (direction === "prev") {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 0 ? houseImages.length - 1 : prevIndex - 1
      );
    }
  };

  return (
    <div
      className="min-h-screen relative flex items-center justify-center transition-all duration-500 ease-in-out bg-white dark:bg-gray-900"
      style={{
        backgroundImage: `url('${
          houseImages[(currentImageIndex + 2) % houseImages.length]
        }')`,
      }}
    >
      <div className="bg-white rounded-2xl md:rounded-[40px] shadow-2xl mt-0 drop-shadow-black p-4 md:p-8 max-w-5xl w-full flex flex-col md:flex-row my-8 md:my-20 mx-1 tablet:mx-12 lg:mx-20 xl:mx-32 2xl:mx-48 tablet:h-[85vh] tablet:px-16 laptop:mx-16">
        <div className="flex-1 pr-0 md:pr-8">
          <div className="mb-2">
            <h1 className="text-3xl md:text-4xl font-bold mb-1 tracking-tight pt-2 pb-2 leading-12">
              Reserve Your Ideal Holiday by ComfyWay
            </h1>
            <div className="flex items-center pr-2 justify-between">
              <p className="text-gray-500 text-sm font-semibold ">
                Let's get acquainted!
              </p>
              <p className="text-gray-500 text-sm mb-2 w-1/4 md:w-72 h-0.5 bg-gray-200"></p>
            </div>
            <div className="text-gray-500 text-sm mb-6 leading-relaxed mt-4 flex flex-col md:flex-row pr-2 gap-4 md:gap-6 items-center text-justify">
              We specialize in curating exceptional villa rentals, providing an
              unparalleled level of comfort, privacy, and convenience for your
              dream vacation.
              <Link
                className="bg-black text-white text-sm font-medium px-6 py-2 rounded-full flex items-center hover:bg-[#0f0f0f] transition duration-150 h-12 group hover:drop-shadow-xl self-start"
                to="/login"
              >
                <p className="group-hover:text-[#fffffff5] text-[16px]">
                  Login
                </p>
                <svg
                  className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:-rotate-45"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>
          </div>
          <div className="flex justify-between items-center mb-8 gap-2 md:pr-2">
            <div>
              <p className="text-xl md:text-3xl font-bold text-gray-900">
                115K+
              </p>
              <p className="text-gray-500 text-sm">Capital Raised</p>
            </div>
            <div className="w-1 h-12 hidden md:block bg-gray-200"></div>
            <div>
              <p className="text-xl md:text-3xl font-bold text-gray-900">
                10K+
              </p>
              <p className="text-gray-500 text-sm">Happy Customers</p>
            </div>
            <div className="w-1 h-12 hidden md:block bg-gray-200"></div>

            <div>
              <p className="text-xl md:text-3xl font-bold text-gray-900">4K+</p>
              <p className="text-gray-500 text-sm">Property Options</p>
            </div>
          </div>

          <div className="relative">
            <div>
              <div className="w-full h-48 md:h-64">
                <img
                  src={houseImages[currentImageIndex]}
                  alt="House"
                  className="w-full h-full object-cover rounded-xl transition-opacity duration-500 ease-in-out drop-shadow-lg absolute top-1.5 left-1.5 opacity-25"
                />
                <img
                  src={
                    houseImages[(currentImageIndex + 1) % houseImages.length]
                  }
                  alt="House Next"
                  className="w-full h-full object-cover rounded-xl  opacity-55 transition-opacity duration-500 static ease-in-out"
                />
                <img
                  src={
                    houseImages[(currentImageIndex + 2) % houseImages.length]
                  }
                  alt="House"
                  className="w-full h-full object-cover rounded-xl transition-opacity duration-500 ease-in-out drop-shadow-lg absolute -top-2 -left-2"
                />

                <div className="bg-gray-100 text-gray-600 text-sm font-medium px-4 py-1 rounded-full mb-3 absolute top-2 left-2">
                  {locations[currentImageIndex]}
                </div>
              </div>

              <div className="absolute top-1/2 right-4 transform -translate-y-1/2 flex flex-col space-y-2 z-20">
                <button
                  onClick={() => handleImageChange("prev")}
                  className="bg-white p-2 rounded-full shadow-md hover:scale-105 transition duration-150"
                >
                  <svg
                    className="w-5 h-5 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 15l7-7 7 7"
                    />
                  </svg>
                </button>
                <button
                  onClick={() => handleImageChange("next")}
                  className="bg-white p-2 rounded-full shadow-md hover:scale-105 transition duration-150"
                >
                  <svg
                    className="w-5 h-5 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 items-center hidden md:flex">
          <div className="w-full h-full flex flex-col">
            <div className="relative w-full h-48 md:h-full">
              <img
                src={houseImages[(currentImageIndex + 2) % houseImages.length]}
                alt="House"
                className="w-full h-full object-cover rounded-xl transition-opacity duration-500 ease-in-out"
              />
              <div className="bg-gray-100 text-gray-600 text-sm font-medium px-4 py-1 rounded-full mb-4 self-end absolute top-4 left-4">
                {locations[currentImageIndex]}
              </div>
              <div className="absolute bottom-4 left-4 right-4 flex flex-col space-y-4 ">
                <div className=" bg-black/5 py-2 ">
                  <p className="text-white text-sm leading-relaxed border-l-4 border-black pl-4 ">
                    Enjoy a luxurious vacation in a villa with breathtaking city
                    views and easy access to the vibrant city life and culinary
                    delights.
                  </p>
                </div>
                <form
                  className="relative w-full"
                  onSubmit={(e) => {
                    e.preventDefault();
                    navigate("/login");
                  }}
                >
                  <input
                    type="text"
                    placeholder="Enter Location"
                    className="w-full p-3 bg-white bg-opacity-80 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm"
                  />
                  <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <svg
                      className="w-5 h-5 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
