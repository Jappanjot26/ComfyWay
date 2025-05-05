import { Link } from "react-router-dom";
import { useTheme } from "../../contexts/ThemeContext";

const Logo = () => {
  const { isDarkMode } = useTheme();

  return (
    <Link to="/" className="flex items-center h-10">
      <div>
        <img src="./logo.svg" alt="ComfyWay Logo" className="h-32 mt-1" />
      </div>
    </Link>
  );
};

export default Logo;
