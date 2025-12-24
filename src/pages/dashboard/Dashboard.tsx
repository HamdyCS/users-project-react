import { Route, Routes } from "react-router-dom";
import DashboardNavBar from "../../components/dashboard/NavBar";
import DashboardSideBar from "../../components/dashboard/SideBar";
import NotFound from "../../components/NotFound";
import Users from "./users/Users";
import UpdateUser from "./users/UpdateUser";
import CreateUser from "./users/CreateUser";
import CreateProduct from "./products/CreateProduct";
import UpdateProduct from "./products/UpdateProduct";
import ProductsDashboard from "./products/ProductsDashboard";

export default function dashboard() {
  return (
    <div>
      <DashboardNavBar />
      <div className="dashboard-body flex">
        <DashboardSideBar />
        <div className="bg-blue-300 flex-grow p-5 min-w-0">
          <Routes>
            {/* users */}
            <Route index element={<Users />} />
            <Route path="users" element={<Users />} />
            <Route path="users/:userId" element={<UpdateUser />} />
            <Route path="users/create" element={<CreateUser />} />
            <Route path="*" element={<NotFound />} />

            {/* Products */}
            <Route path="products" element={<ProductsDashboard />} />
            <Route path="products/create" element={<CreateProduct />} />
            <Route path="products/:productId" element={<UpdateProduct />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
