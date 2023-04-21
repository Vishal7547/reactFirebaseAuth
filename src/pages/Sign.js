import { Link, Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

import { auth } from "../firebase";
const Sign = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const [disabled, setDisabled] = useState(true);

  const handleSubmit = () => {
    setDisabled(false);
    // console.log(value);
    createUserWithEmailAndPassword(auth, value.email, value.password)
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
    <>
      <div className="login">
        <div className="title">
          <h1>Sign Up</h1>
        </div>
        <div className="innerLogin">
          <input
            type="text"
            onChange={(e) =>
              setValue((prev) => ({ ...prev, name: e.target.value }))
            }
            placeholder="Name.."
            required
            autoComplete="off"
          />

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
            onChange={(e) =>
              setValue((prev) => ({ ...prev, password: e.target.value }))
            }
            type="password"
            placeholder="Password"
            required
            autoComplete="off"
          />

          {disabled ? (
            <button onClick={handleSubmit}>Sign Up</button>
          ) : (
            <button onClick={handleSubmit}>Signing In</button>
          )}
          <span>{error}</span>
          <br />
          <span>
            if already have account?
            <Link to="/login">
              <b className="darks">Log In</b>
            </Link>
          </span>
        </div>
      </div>
    </>
  );
};

export default Sign;
