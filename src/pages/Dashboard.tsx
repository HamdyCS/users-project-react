import { Route, Routes } from "react-router-dom";
import DashboardNavBar from "../components/dashboard/NavBar";
import DashboardSideBar from "../components/dashboard/SideBar";
import UsersDashboard from "./Users";
import NotFound from "../components/NotFound";
import UpdateUser from "./UpdateUser";

export default function dashboard() {
  return (
    <div>
      <DashboardNavBar />
      <div className="dashboard-body flex">
        <DashboardSideBar />
        <div className="bg-blue-300 flex-grow p-5 min-w-0">
          <Routes>
            <Route path="users" element={<UsersDashboard />} />
            <Route path="users/:userId" element={<UpdateUser />} />
            <Route index element={<UsersDashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
