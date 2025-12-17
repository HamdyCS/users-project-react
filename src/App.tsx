import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./pages/website/authentication/Login";
import SignUp from "./pages/website/authentication/SignUp";
import Dashboard from "./pages/dashboard/Dashboard";
import NotFound from "./components/NotFound";
import "./App.css";
import RequireAuth from "./pages/website/authentication/RequireAuth";
import PersistLogin from "./pages/website/authentication/PersistLogin";

export default function App() {
  return (
    <div className="text-center app overflow-x-hidden">
      <Routes>
        <Route element={<PersistLogin />}>
          <Route path="/" element={<Layout />}>
            <Route index element={<div>Home Page</div>} />
            <Route path="signup" element={<SignUp />} />
            <Route path="login" element={<Login />} />
            <Route path="*" element={<NotFound />} />
            {/* protected routes */}
            <Route element={<RequireAuth />}>
              <Route path="dashboard/*" element={<Dashboard />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </div>
  );
}
