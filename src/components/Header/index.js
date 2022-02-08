import React, { useState, useEffect } from "react";
import "./navbar.css";
import { NavLink, Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, logout } from "../../firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import AddTask from "../AddTask";

export default function Navbar1() {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const [openAddModal, setOpenAddModal] = useState(false);

  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setName(data.name);
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };
  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
    fetchUserName();
  }, [user, loading]);

  return (
    <>
      <div class="nav1">
        <input type="checkbox" id="nav-check" />

        <div class="nav-header">
          <div class="nav-title">
            <NavLink to="/">
              <p
                style={{
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  margin: "0",
                  padding: "0",
                }}
              >
                My ProTask
              </p>
            </NavLink>
          </div>
        </div>

        <div class="nav-btn">
          <label for="nav-check">
            <span></span>
            <span></span>
            <span></span>
          </label>
        </div>

        <div class="nav-links">
          {user ? (
            <>
              <span>&nbsp;</span>{" "}
              <Button
                style={{
                  borderRadius: 35,
                  backgroundColor: "#21b6ae",
                  padding: "5px 15px",
                  fontSize: "15px",
                  fontWeight: "bold",
                  marginTop: "0px",
                  marginBottom: "7px",
                  border: "1px solid white",
                }}
                variant="contained"
                onClick={() => setOpenAddModal(true)}
              >
                Add Task +
              </Button>{" "}
              <span>&nbsp;</span>{" "}
              <Link to="/dashboard" activeClassName="current">
                <li className="fields" style={{ listStyleType: "none" }}>
                  {" "}
                  {name ? name : user?.email}
                </li>
              </Link>
              {/* <Link onClick={logout}> */}
              <Button
                style={{
                  color: "#f9f871",
                  textTransform: "none",
                  fontSize: "18px",
                }}
              >
                <li
                  onClick={logout}
                  className="fields"
                  style={{ listStyleType: "none" }}
                >
                  {" "}
                  Sign Out &nbsp; &nbsp;
                </li>
              </Button>
              {/* </Link> */}
            </>
          ) : (
            // </div>
            <>
              <span className="pc-none">
                <p style={{ marginTop: "-35px", color: "#14406d" }}>.</p>
              </span>

              <Link to="/login" activeClassName="current">
                <li className="fields" style={{ listStyleType: "none" }}>
                  {" "}
                  Sign In &nbsp; &nbsp;
                </li>
              </Link>
              <Link to="/register" activeClassName="current">
                <li className="fields joinp" style={{ listStyleType: "none" }}>
                  {" "}
                  Create an account &nbsp; &nbsp;
                </li>
              </Link>
            </>
          )}
        </div>
        {openAddModal && (
          <AddTask onClose={() => setOpenAddModal(false)} open={openAddModal} />
        )}
      </div>
    </>
  );
}
