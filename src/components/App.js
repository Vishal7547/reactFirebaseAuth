import { Home, Login, Sign } from "../pages";
import { auth } from "../firebase";
import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  const [isAuthenticate, setIsAuthenticate] = useState("");
  const [user, setUser] = useState("");
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user.displayName);
      } else {
        setUser("");
      }
    });
  }, []);

  return (
    <div className="App">
      {/* <button onClick={putData}>put data</button> */}
      <Router>
        <Navbar />

        <Routes>
          <Route exact path="/" element={<Home user={user} />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Sign />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
