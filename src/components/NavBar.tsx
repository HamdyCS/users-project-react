import { useAtom } from "jotai";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { authAtom } from "../atoms/authAtom";

export default function NavBar() {
  const [auth, setAuth] = useAtom(authAtom);
  const location = useLocation();

  if (location.pathname.includes("dashboard")) {
    return <></>;
  }

  function handelLogOut() {
    setAuth(null);
  }

  return (
    <div className="bg-blue-400 p-5 font-bold text-white">
      <nav className="container mx-auto flex justify-between items-center">
        <ul className="flex gap-5">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
        </ul>

        {!auth ? (
          <ul className="flex gap-5">
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>
        ) : (
          <Link to="/login" onClick={handelLogOut}>
            logout
          </Link>
        )}
      </nav>
    </div>
  );
}
