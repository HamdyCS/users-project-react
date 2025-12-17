import { useAtom } from "jotai";
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { authAtom } from "../atoms/authAtom";
import Cookies from "universal-cookie";
import axios from "axios";
import { API_URL } from "../config";

export default function NavBar() {
  const [auth, setAuth] = useAtom(authAtom);
  const location = useLocation();
  const navigate = useNavigate();

  //hide nav bar in dashboard
  if (location.pathname.includes("dashboard")) {
    return <></>;
  }

  async function handelLogOut() {
    try {
      //logout
      const response = await axios.post(`${API_URL}logout`, null, {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      });

      console.log("ok");

      //remove token from cookie
      const cookie = new Cookies();
      cookie.remove("BearerToken");

      //remove user context
      setAuth(null);

      //redirect to home page
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="bg-blue-400 p-5 font-bold text-white">
      <nav className="container mx-auto flex justify-between items-center">
        <ul className="flex gap-5">
          <li>
            <Link to="/">Home</Link>
          </li>
          {auth?.token && (
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
          )}
        </ul>

        {!auth?.token ? (
          <ul className="flex gap-5">
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>
        ) : (
          <button onClick={handelLogOut}>
            logout
          </button>
        )}
      </nav>
    </div>
  );
}
