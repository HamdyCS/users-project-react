import { useAtom } from "jotai";
import React from "react";
import { authAtom } from "../../../atoms/authAtom";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function RequireAuth() {
  const [auth, setAuth] = useAtom(authAtom);
  const location = useLocation();

  return auth?.token ? (
    <Outlet />
  ) : (
    <Navigate state={{ from: location }} replace to={"/login"} />
  );
}
