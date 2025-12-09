import { useAtom } from "jotai";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { tokenAtom } from "../atoms/atom";
import { removeFromLocalStorage } from "../services/localStorageService";

export default function NavBar() {
  const [token, setToken] = useAtom(tokenAtom);
  const location = useLocation();

  if (location.pathname.includes("dashboard")) {
    return <></>;
  }

  return (
    <div className="bg-blue-400 p-5 font-bold text-white">
      <nav className="container mx-auto flex justify-between items-center">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
        </ul>

        {!token ? (
          <ul className="flex gap-5">
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>
        ) : (
          <Link
            to="/login"
            onClick={() => {
              setToken(null);
              removeFromLocalStorage("token");
            }}
          >
            logout
          </Link>
        )}
      </nav>
    </div>
  );
}
