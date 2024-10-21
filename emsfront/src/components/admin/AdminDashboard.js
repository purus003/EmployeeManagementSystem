import React from "react";
import AuthService from "../../services/AuthService";
import {  NavLink, Outlet } from "react-router-dom";


const AdminDashboard = () => {
    // const [employees, setEmployees] = useState([]);
    // //const navigate = useNavigate();

    // useEffect(() => {
    //     fetchEmployees();
    // }, []);

    // const fetchEmployees = async () => {
    //     try {
    //         const response = await EmployeeService.getAllEmployees();
    //         setEmployees(response.data);
    //     } catch (error) {
    //         console.error("Error fetching employees:", error);
    //     }
    // };

    // const deleteEmployee = async (id) => {
    //     try {
    //         await EmployeeService.deleteEmployee(id);
    //         setEmployees(employees.filter(emp => emp.id !== id));
    //     } catch (error) {
    //         console.error("Error deleting employee:", error);
    //     }
    // };

    return (


        <div className="flex h-screen">

    {/* Side Navbar */}
    <div className="w-1/5 bg-gray-100 p-5">
        <h2 className="text-xl font-bold mb-6">Admin Dashboard</h2>
        <nav>
            <ul className="list-none space-y-4">
                <li>
                <NavLink
                        to="/admin/dashboard/Welcome"
                        className="text-blue-600 hover:underline"
                    >
                        Welcome
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/admin/dashboard/manage-employee"
                        className="text-blue-600 hover:underline"
                    >
                        Manage Employee
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/admin/dashboard/manage-projects"
                        className="text-blue-600 hover:underline"
                    >
                        Manage Projects
                    </NavLink>
                </li>
                <li>
                    <p
                        onClick={AuthService.logout}
                        className="text-red-600 cursor-pointer hover:underline"
                    >
                        Logout
                    </p>
                </li>
            </ul>
        </nav>
    </div>

    {/* Content Area */}
    <div className="w-4/5 p-5">
        <Outlet />
    </div>
    
</div>
    );
};

export default AdminDashboard;
