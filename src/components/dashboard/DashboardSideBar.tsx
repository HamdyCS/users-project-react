import React, { useRef } from "react";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import UsersDashboard from "./UsersDashboard";

export default function DashboardSideBar() {
  const location = useLocation();
  const sidebarHeight = useRef("64px");

  return (
    <div
      className="relative flex w-full max-w-[20rem] flex-col rounded-xl bg-white bg-clip-border p-2 text-gray-700 shadow-lg shadow-gray-300"
      style={{
        height: `calc(100vh - ${sidebarHeight.current})`,
      }}
    >
      <div className="p-4 mb-2">
        <h5 className="block font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-gray-900">
          Sidebar
        </h5>
      </div>
      <nav className="flex  flex-col gap-1 p-2 font-sans text-base font-normal text-blue-gray-700">
        <Link
          role="button"
          className="flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900 hover:!bg-blue-400"
          style={{
            backgroundColor: location.pathname.endsWith("dashboard")
              ? "#60a5fa "
              : "transparent",
          }}
          to={"/dashboard"}
        >
          <div className="grid mr-4 place-items-center">
            <p>🖋️</p>
          </div>
          <p className="hidden md:block">Dashboard</p>
        </Link>
        <Link
          role="button"
          className="flex items-center p-3 px-5 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900  hover:!bg-blue-400"
          style={{
            backgroundColor: location.pathname.includes("users")
              ? "#60a5fa "
              : "transparent",
          }}
          to={"/dashboard/users"}
        >
          <div className="grid mr-4 place-items-center">
            <p>👤</p>
          </div>
          <p className="hidden md:block">Users</p>
        </Link>
      </nav>
    </div>
  );
}
