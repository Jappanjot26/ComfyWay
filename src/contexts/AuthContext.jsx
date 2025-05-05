import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const AuthContext = createContext(null);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("comfyway_user");
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setIsInitialized(true);
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_BACKEND_URL || "http://localhost:5000"
        }/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );
      const res = await response.json();

      if (response.ok) {
        const userWithToken = { ...res.user, token: res.token };
        setCurrentUser(userWithToken);
        localStorage.setItem("comfyway_user", JSON.stringify(userWithToken));
        toast.success("Login successful!");
        navigate("/");
      } else {
        toast.error(res.message || "Login failed");
      }
    } catch (error) {
      toast.error("Login failed. Please try again.");
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  const register = async (name, email, password, role = "customer") => {
    setLoading(true);
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_BACKEND_URL || "http://localhost:5000"
        }/api/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, password, role }),
        }
      );
      const res = await response.json();

      if (response.ok) {
        toast.success("Registration successful! Please log in.");
        navigate("/login");
      } else {
        toast.error(res.message || "Registration failed");
      }
    } catch (error) {
      toast.error("Registration failed. Please try again.");
      console.error("Registration error:", error);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("comfyway_user");
    toast.success("Successfully logged out!");
    navigate("/login");
  };

  const upgradeToPremium = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_BACKEND_URL || "http://localhost:5000"
        }/api/auth/upgrade`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${currentUser.token}`,
          },
        }
      );
      const res = await response.json();

      if (response.ok) {
        const updatedUser = { ...currentUser, isPremium: true };
        setCurrentUser(updatedUser);
        localStorage.setItem("comfyway_user", JSON.stringify(updatedUser));
        toast.success("Successfully upgraded to premium!");
      } else {
        toast.error(res.message || "Upgrade failed");
      }
    } catch (error) {
      toast.error("Upgrade failed. Please try again.");
      console.error("Upgrade error:", error);
    } finally {
      setLoading(false);
    }
  };

  const value = {
    currentUser,
    isAuthenticated: !!currentUser,
    isPremium: currentUser?.isPremium || false,
    isOwner: currentUser?.role === "owner",
    isInitialized,
    loading,
    login,
    register,
    logout,
    upgradeToPremium,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
