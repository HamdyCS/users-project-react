import { Route, Routes } from "react-router-dom";
import DashboardNavBar from "../components/dashboard/DashboardNavBar";
import DashboardSideBar from "../components/dashboard/DashboardSideBar";
import UsersDashboard from "../components/dashboard/UsersDashboard";
import NotFound from "../components/NotFound";

export default function dashboard() {
  return (
    <div>
      <DashboardNavBar />
      <div className="dashboard-body flex">
        <DashboardSideBar />
        <div className="bg-blue-300 flex-grow p-5 min-w-0">
          <Routes>
            <Route path="users" element={<UsersDashboard />} />
            <Route index element={<UsersDashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
