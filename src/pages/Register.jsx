import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../components/utils";
import register from "../assets/register.svg";
import logo from "../assets/logo.png";
import { auth, provider, signInWithPopup } from "../../firebase";

export default function Register() {
  const [googleClicked, setGoogleClicked] = useState(false);
  const [info, setInfo] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleGoogleSignin = async () => {
    try {
      setGoogleClicked(true);

      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      localStorage.setItem(
        "user",
        JSON.stringify({ ...user, apiKey: undefined, auth: undefined })
      );
      navigate("/home");
    } catch (error) {
      console.error("Login Failed:", error);
    }
  };

  const handleChange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (googleClicked) {
      setGoogleClicked((c) => !c);
      return;
    }

    const { email, password } = info;
    if (!email || !password) {
      return handleError("Please fill all the fields");
    }
    try {
      const url = `${
        import.meta.env.VITE_BACKEND_URL || "http://localhost:5174"
      }/auth/signup`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(info),
      });
      const res = await response.json();
      console.log(res);
      if (res.success) {
        handleSuccess(res.message);
        localStorage.setItem("user", res.email);
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else if (res.error) {
        handleError(res.error?.details[0].message);
      } else if (!res.success) {
        handleError(res.message);
      }
    } catch (error) {
      handleError(error.message);
    }
  };

  return (
    <section className="h-screen w-screen">
      <div className="flex w-full h-full">
        <div className="w-5/8 flex flex-col">
          <Link to="/">
            <img src={logo} alt="logo" className="h-34 mx-12 w-36" />
          </Link>
          <img src={register} alt="Login page image" className="h-9/12" />
        </div>
        <div className="w-3/8 flex flex-col bg-[#2c56fe] py-24">
          <h1 className="uppercase text-white font-semibold text-4xl text-center">
            Signup
          </h1>
          <form
            className="border-y-1 border-white/30 mx-4 px-12 my-4 flex flex-col justify-center py-12 items"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col items-center my-8  self-center w-full ">
              <button
                className="gsi-material-button"
                onClick={handleGoogleSignin}
              >
                <div className="gsi-material-button-state"></div>
                <div className="gsi-material-button-content-wrapper">
                  <div className="gsi-material-button-icon">
                    <svg
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 48 48"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      style={{ display: "block" }}
                    >
                      <path
                        fill="#EA4335"
                        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                      ></path>
                      <path
                        fill="#4285F4"
                        d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                      ></path>
                      <path
                        fill="#FBBC05"
                        d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                      ></path>
                      <path
                        fill="#34A853"
                        d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                      ></path>
                      <path fill="none" d="M0 0h48v48H0z"></path>
                    </svg>
                  </div>
                  <span className="gsi-material-button-contents">
                    Sign up with Google
                  </span>
                  <span style={{ display: "none" }}>Sign up with Google</span>
                </div>
              </button>
            </div>
            <div className="flex items-center gap-2 text-white">
              <div className="w-full h-0.5 bg-white/30"></div>
              <div className="">OR</div>
              <div className="w-full h-0.5 bg-white/30"></div>
            </div>
            <input
              type="email"
              placeholder="Email"
              id="email"
              name="email"
              onChange={handleChange}
              value={info.email}
              className="w-full h-10 border-1 border-white/80 px-2 mt-8 mb-3 text-white focus:outline-white focus:outline-1"
            />
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              value={info.password}
              className="w-full h-10 border-1 border-white/80 px-2 focus:outline-white focus:outline-1 text-white color-white"
            />
            <button
              type="submit"
              className="bg-white hover:bg-gray-100 h-10 w-full mt-8 mb-2"
            >
              Submit
            </button>
            <div className="mt-4 font-semibold text-sm text-white self-center text-center md:text-left">
              {"Already registered? "}
              <Link
                className="text-[#60ff41] hover:underline hover:underline-offset-4"
                to="/login"
              >
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
}
