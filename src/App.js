import { Login, Register, Reset, Dashboard } from "./pages";
import { Footer, Header, TaskManager as Home } from "./components";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import IconButton from "@material-ui/core/IconButton";
import { useState, useEffect } from "react";

function App() {
  const [Toggle, setToggle] = useState(false);

  function handleClick() {
    setToggle(!Toggle);
    localStorage.setItem("toggle1", Toggle);
    getData();
  }

  var num;
  // save dark mode preference
  let getData = () => {
    var data = localStorage.getItem("toggle1");
    JSON.stringify(data);

    if (data == "true") {
      num = true;
    }
    if (data == "false") {
      num = false;
    }
    setDisplay(num);
    return num;
  };

  const [display, setDisplay] = useState();

  useEffect(() => {
    getData();
    setDisplay(num);
  }, []);

  return (
    <div
      className="app"
      style={{ backgroundColor: "black", minHeight: "100vh" }}
    >
      <Router>
        <Header />
        <div className="darkmode-btn">
          <IconButton
            onClick={handleClick}
            style={{ backgroundColor: "white" }}
          >
            <Brightness4Icon />
          </IconButton>
        </div>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/reset" element={<Reset />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
