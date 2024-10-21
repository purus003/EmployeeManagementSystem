import React, { useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";
import AuthService from "../../services/AuthService";
import Fetchdetails from "./FetchDetails";

const EmployeeDashboard = () => {
  // Realtime Data Fetching
  useEffect(() => {
    Fetchdetails();
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Side Navbar */}
      <div className="w-1/5 bg-white shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4">Employee Dashboard</h2>
        <nav>
          <ul className="list-none p-0">
            <li className="mb-2">
             <NavLink
                   to="/admin/dashboard/Welcome"
                 className="text-blue-600 hover:underline"
                >
                   Welcome
              </NavLink>
            </li>
            <li className="mb-2">
              <NavLink to="/employee/dashboard/personal-details" className="text-blue-500 hover:underline">
                Personal Details
              </NavLink>
            </li>
            <li className="mb-2">
              <NavLink to="/employee/dashboard/professional-details" className="text-blue-500 hover:underline">
                Professional Details
              </NavLink>
            </li>
            <li className="mb-2">
              <NavLink to="/employee/dashboard/finance-details" className="text-blue-500 hover:underline">
                Finance Details
              </NavLink>
            </li>
            <li className="mb-2">
              <NavLink to="/employee/dashboard/projects-details" className="text-blue-500 hover:underline">
                Projects
              </NavLink>
            </li>
            <li className="mt-4">
              <p className="text-red-500 cursor-pointer" onClick={AuthService.logout}>
                Logout
              </p>
            </li>
          </ul>
        </nav>
      </div>

      {/* Content Area */}
      <div className="w-4/5 p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default EmployeeDashboard;
