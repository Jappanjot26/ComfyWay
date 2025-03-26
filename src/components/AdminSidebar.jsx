import { useState } from "react";
import profile from "../assets/profile-icon.png";

function AdminSidebar() {
  const [clickedListings, getClickedListings] = useState(false);
  return (
    <div className="h-11/12 w-1/4 bg-white flex flex-col items-center px-4 transition-all duration-150">
      <div className="h-1/4 w-full bg-blue flex flex-col items-center justify-center  border-b-2 border-gray-100/90 mx-4">
        <img src={profile} alt="user profile picture" className="h-24 w-24" />
        <p className="text-md">Jappanjot Singh</p>
      </div>
      <div className="h-1/2 w-full flex flex-col py-2">
        <button className="p-4 hover:bg-gray-100 w-full flex gap-4 active:bg-gray-100 text-lg font-semibold items-center fill-blue-500 rounded-md transition duration-150 mb-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 256 256"
          >
            <path d="M120,56v48a16,16,0,0,1-16,16H56a16,16,0,0,1-16-16V56A16,16,0,0,1,56,40h48A16,16,0,0,1,120,56Zm80-16H152a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V56A16,16,0,0,0,200,40Zm-96,96H56a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V152A16,16,0,0,0,104,136Zm96,0H152a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V152A16,16,0,0,0,200,136Z"></path>
          </svg>
          <p>Dashboard</p>
        </button>
        <button className="p-4 hover:bg-gray-100 w-full flex gap-4 active:bg-gray-100 text-lg font-semibold items-center fill-blue-500 rounded-md transition duration-150 mb-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 256 256"
          >
            <path d="M184,32H72A16,16,0,0,0,56,48V224a8,8,0,0,0,12.24,6.78L128,193.43l59.77,37.35A8,8,0,0,0,200,224V48A16,16,0,0,0,184,32Z"></path>
          </svg>
          <p>Bookings</p>
        </button>
        <div
          className="p-4 hover:bg-gray-100 active:bg-gray-100 w-full flex gap-4 text-lg font-semibold items-center fill-blue-500 rounded-md transition duration-150"
          onClick={() => getClickedListings((c) => !c)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 256 256"
          >
            <path d="M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM68,188a12,12,0,1,1,12-12A12,12,0,0,1,68,188Zm0-48a12,12,0,1,1,12-12A12,12,0,0,1,68,140Zm0-48A12,12,0,1,1,80,80,12,12,0,0,1,68,92Zm124,92H104a8,8,0,0,1,0-16h88a8,8,0,0,1,0,16Zm0-48H104a8,8,0,0,1,0-16h88a8,8,0,0,1,0,16Zm0-48H104a8,8,0,0,1,0-16h88a8,8,0,0,1,0,16Z"></path>
          </svg>
          <p>Listings</p>
          {clickedListings ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              className="ml-auto fill-black"
              viewBox="0 0 256 256"
            >
              <path d="M176,128a8,8,0,0,1-8,8H88a8,8,0,0,1,0-16h80A8,8,0,0,1,176,128Zm56,0A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z"></path>
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              className="ml-auto fill-black"
              viewBox="0 0 256 256"
            >
              <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm48-88a8,8,0,0,1-8,8H136v32a8,8,0,0,1-16,0V136H88a8,8,0,0,1,0-16h32V88a8,8,0,0,1,16,0v32h32A8,8,0,0,1,176,128Z"></path>
            </svg>
          )}
        </div>
        {clickedListings && (
          <div className="pl-12">
            <button className="p-4 hover:bg-gray-100 active:bg-gray-100 w-full flex gap-4 text-lg font-semibold items-center fill-blue-500 rounded-md transition duration-150">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 256 256"
              >
                <path d="M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128ZM40,72H216a8,8,0,0,0,0-16H40a8,8,0,0,0,0,16ZM216,184H40a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Z"></path>
              </svg>
              All Listings
            </button>
            <button className="p-4 hover:bg-gray-100 active:bg-gray-100 w-full flex gap-4 text-lg font-semibold items-center fill-blue-500 rounded-md transition duration-150">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 256 256"
              >
                <path d="M32,64a8,8,0,0,1,8-8H216a8,8,0,0,1,0,16H40A8,8,0,0,1,32,64Zm8,72H216a8,8,0,0,0,0-16H40a8,8,0,0,0,0,16Zm104,48H40a8,8,0,0,0,0,16H144a8,8,0,0,0,0-16Zm88,0H216V168a8,8,0,0,0-16,0v16H184a8,8,0,0,0,0,16h16v16a8,8,0,0,0,16,0V200h16a8,8,0,0,0,0-16Z"></path>
              </svg>
              Add Listing
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminSidebar;
