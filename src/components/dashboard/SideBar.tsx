import React, { useRef } from "react";
import { Link, NavLink, Route, Routes, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartLine,
  faPlus,
  faUserPlus,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { faProductHunt } from "@fortawesome/free-brands-svg-icons";

export default function DashboardSideBar() {
  const location = useLocation();
  const sidebarHeight = useRef("64px");

  return (
    <div
      className="relative flex w-full max-w-[20rem] flex-col rounded-xl bg-white bg-clip-border p-2 text-gray-700 shadow-lg shadow-gray-300 "
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
        <NavLink
          end
          className={(obj) =>
            `flex items-center justify-center md:justify-start md:gap-6 w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900 bg-transparent hover:!bg-blue-400
          ${obj.isActive ? "!bg-blue-400" : ""}
          `
          }
          to={"/dashboard"}
        >
          <FontAwesomeIcon icon={faChartLine} />
          <p className="hidden  md:block">Dashboard</p>
        </NavLink>
        <NavLink
          end
          className={({ isActive }) =>
            `flex items-center justify-center md:justify-start md:gap-6 w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900 bg-transparent  hover:!bg-blue-400
          ${isActive ? "!bg-blue-400" : ""}
          `
          }
          to={"/dashboard/users"}
        >
          <FontAwesomeIcon icon={faUsers} />
          <p className="hidden  md:block">Users</p>
        </NavLink>
        <NavLink
          end
          className={({ isActive }) =>
            `flex items-center justify-center md:justify-start md:gap-6 w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900 bg-transparent  hover:!bg-blue-400
          ${isActive ? "!bg-blue-400" : ""}
          `
          }
          to={"/dashboard/users/create"}
        >
          <FontAwesomeIcon icon={faUserPlus} />{" "}
          <p className="hidden  md:block">Create User</p>
        </NavLink>
        <NavLink
          to={"/dashboard/products"}
          end
          className={({
            isActive,
          }) => `flex items-center justify-center md:justify-start md:gap-6 w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900 bg-transparent  hover:!bg-blue-400
          ${isActive ? "!bg-blue-400" : ""}`}
        >
          <FontAwesomeIcon icon={faProductHunt} />{" "}
          <p className="hidden  md:block">Products</p>
        </NavLink>
        <NavLink
          to={"/dashboard/products/create"}
          end
          className={({
            isActive,
          }) => `flex items-center justify-center md:justify-start md:gap-6 w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900 bg-transparent  hover:!bg-blue-400
          ${isActive ? "!bg-blue-400" : ""}`}
        >
          <FontAwesomeIcon icon={faPlus} />{" "}
          <p className="hidden  md:block">Create Product</p>
        </NavLink>
      </nav>
    </div>
  );
}
