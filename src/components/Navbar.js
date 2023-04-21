import "../styles/navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="logo">
        <Link to="/">
          <h1>Reminder</h1>
        </Link>
      </div>
      <div className="auth">
        <Link to="/login">
          <span>Log In</span>
        </Link>
        <Link to="/signup">
          <span>Sign Up</span>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
