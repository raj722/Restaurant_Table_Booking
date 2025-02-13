import { Link } from "react-router-dom";
import { useAuth } from "../Authentication/AuthContext";

const Navbar = () => {
  const { role, logout } = useAuth();

  return (
    <nav className="p-4 text-white bg-gray-800">
      <div className="container flex items-center justify-between mx-auto">
        <Link to="/" className="text-xl font-bold">TableBooking</Link>
        <div className="flex space-x-4">
          <Link to="/about" className="hover:underline">About</Link>
          <Link to="/contact" className="hover:underline">Contact</Link>
          {role === "admin" && (
            <Link to="/admin" className="hover:underline">Admin Dashboard</Link>
          )}
          {role === "restaurant" && (
            <Link to="/restaurant" className="hover:underline">Restaurant Dashboard</Link>
          )}
          {role === "customer" && (
            <Link to="/profile" className="hover:underline">Profile</Link>
          )}
          {!role ? (
            <Link to="/login" className="hover:underline">Login</Link>
          ) : (
            <button onClick={logout} className="hover:underline">Logout</button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
