import Logo from "../assets/logo.png";
import { auth, signOut } from "../../firebase";

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Navbar({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState({});

  const handleLogout = async () => {
    await signOut(auth);
    localStorage.removeItem("user");
    navigate("/login");
  };
  useEffect(() => {
    async function fetchUser() {
      const temp = await JSON.parse(localStorage.getItem("user"));
      setUser(temp);
    }
    fetchUser();
  }, []);
  return (
    <nav className="bg-white rounded-t-2xl h-1/12">
      <div className="flex justify-between items-center h-full px-4">
        <img className="h-[100px]" src={Logo} alt="logo" />
        <div className="flex items-center w-1/3 text-sm gap-4 rounded-xl ring-(--main-bg) ring-2 px-4">
          <button className="p-1 w-1/3 text-start font-semibold border-r-2  border-gray-300">
            Destiny
            <p className="text-(--text-gray) text-xs font-normal">Delhi</p>
          </button>
          <button className="p-1 w-1/3 text-start font-semibold border-r-2  border-gray-300">
            Check in-out
            <p className="text-(--text-gray) text-xs font-normal">Mar 20-24</p>
          </button>
          <div className="p-1 w-1/3 text-start font-semibold flex items-center justify-between">
            <div>
              Guests
              <p className="text-(--text-gray) text-xs font-normal">4</p>
            </div>
            <button className="p-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 fill-white bg-blue-500 rounded-full p-1"
                viewBox="0 0 256 256"
              >
                <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
              </svg>
            </button>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <button className="rounded-lg p-1 text-xl cursor-pointer">
            {user?.photoURL ? (
              <img
                src={user.photoURL}
                alt="User Image"
                referrerpolicy="no-referrer"
                className="h-8 w-8 rounded-full"
              />
            ) : (
              "Ⓜ️"
            )}
          </button>

          <button
            className="rounded-lg p-1 text-xl cursor-pointer"
            onClick={handleLogout}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 p-1.5 bg-[#2b7fff] fill-white rounded-full"
              viewBox="0 0 256 256"
            >
              <path d="M120,216a8,8,0,0,1-8,8H48a8,8,0,0,1-8-8V40a8,8,0,0,1,8-8h64a8,8,0,0,1,0,16H56V208h56A8,8,0,0,1,120,216Zm109.66-93.66-40-40a8,8,0,0,0-11.32,11.32L204.69,120H112a8,8,0,0,0,0,16h92.69l-26.35,26.34a8,8,0,0,0,11.32,11.32l40-40A8,8,0,0,0,229.66,122.34Z"></path>
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
