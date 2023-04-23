import { Link, Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import { signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";

const Login = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const [disabled, setDisabled] = useState(true);
  const handleSubmit = () => {
    setDisabled(false);
    // console.log(value);
    signInWithEmailAndPassword(auth, value.email, value.password)
      .then(async (res) => {
        setDisabled(true);
        const user = res.user;
        await updateProfile(user, {
          displayName: value.name,
        });
        navigate("/");
        console.log("res", user);
      })
      .catch((e) => {
        setError(e.message);
        console.log("error:", e);
        setDisabled(true);
      });
  };
  return (
    <div className="main">
      <div className="login">
        <div className="title">
          <h1>Log In</h1>
        </div>
        <div className="innerLogin">
          <input
            type="email"
            onChange={(e) =>
              setValue((prev) => ({ ...prev, email: e.target.value }))
            }
            placeholder="Email.."
            required
            autoComplete="off"
          />

          <input
            type="password"
            onChange={(e) =>
              setValue((prev) => ({ ...prev, password: e.target.value }))
            }
            placeholder="Password"
            required
            autoComplete="off"
          />
          {disabled ? (
            <button onClick={handleSubmit}>Log In</button>
          ) : (
            <button onClick={handleSubmit}>Logging in</button>
          )}
          <span className="error">{error}</span>
          <br />
          <span>
            if already have account?
            <Link to="/signup">
              <b className="darks">Sign Up</b>
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
