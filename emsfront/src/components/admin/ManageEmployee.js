import React, { useState, useEffect } from "react";
import AddEmployeeForm from "./AddEmployeeForm"; // Overlay component
import EmployeeService from "../../services/EmployeeService";
import EmployeeDetailsModal from "./ViewEmployeeDetails"; // Assume this is a modal component
import EditEmployeeForm from "./EditEmployeeForm"; // Assume this is a modal component

const ManageEmployee = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [employee, setEmployee] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [showViewEmployee, setShowViewEmployee] = useState(false);
    const [showEditEmployee, setShowEditEmployee] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    const closeView = () => setShowViewEmployee(false);
    const closeEdit = () => setShowEditEmployee(false);

    useEffect(() => {
        loadEmployee();
    }, []);

    const loadEmployee = () => {
        EmployeeService.getAllEmployees()
            .then(response => {
                console.log(response);
                setEmployee(response.data);
            })
            .catch(error => {
                console.error('Error Fetching employees', error);
            });
    };

    const handleDeleteEmployee = (employeeCode) => {
        if (window.confirm("Are you sure you want to delete this Employee?")) {
            EmployeeService.deleteEmployee(employeeCode)
                .then(() => {
                    alert('Employee deleted successfully');
                    loadEmployee(); // Refresh the employee list
                })
                .catch(error => {
                    console.error('Error deleting Employee', error);
                    alert('Failed to delete the Employee');
                });
        }
    };

    const handleViewEmployee = (employee) => {
        setSelectedEmployee(employee);
        setShowViewEmployee(true);
    }

    const handleEditEmployee = (employee) => {
        setSelectedEmployee(employee);
        setShowEditEmployee(true);
    }

    return (
        <div className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Manage Employees</h2>
            <button 
                onClick={openModal} 
                className="bg-blue-500 text-white px-4 py-2 rounded mb-4 hover:bg-blue-600">
                Add Employee
            </button>

            {/* Add Employee Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white rounded-lg shadow-lg w-3/4 md:w-1/2 p-6">
                        <AddEmployeeForm closeOverlay={closeModal} loadEmployee={loadEmployee} />
                    </div>
                </div>
            )}

            {/* View Employee Modal */}
            {showViewEmployee && selectedEmployee && (
                 <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white rounded-lg shadow-lg w-3/4 md:w-1/2 p-6">
                <EmployeeDetailsModal
                    onClose={closeView}
                    loadEmployee={loadEmployee}
                    employee={selectedEmployee} 
                />
                  </div>
                </div>
            )}

            {/* Edit Employee Modal */}
            {showEditEmployee && selectedEmployee && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white rounded-lg shadow-lg w-3/4 md:w-1/2 p-6">
                        <EditEmployeeForm 
                            closeEdit={closeEdit} 
                            loadEmployee={loadEmployee} 
                            employee={selectedEmployee} 
                        />
                    </div>
                </div>
            )}

            <table className="min-w-full bg-white shadow-md rounded mb-4">
                <thead>
                    <tr className="w-full bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                        <th className="py-3 px-6 text-center">Employee ID</th>
                        <th className="py-3 px-6 text-center">Full Name</th>
                        <th className="py-3 px-6 text-center">Company Email</th>
                        <th className="py-3 px-6 text-center">Actions</th>
                    </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                    {employee.map((employee) => (
                        <tr key={employee.id} className="hover:bg-gray-100">
                            <td className="py-3 px-6 text-center">{employee.professionalDetails.employmentCode}</td>
                            <td className="py-3 px-6 text-center">{employee.personalDetails.fullName}</td>
                            <td className="py-3 px-6 text-center">{employee.professionalDetails.companyEmail}</td>
                            <td className="py-3 px-6 space-x-2 text-center">
                                <button onClick={() => handleViewEmployee(employee)} className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded">
                                    View
                                </button>
                                <button onClick={() => handleEditEmployee(employee)}  className="bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-3 rounded">
                                    Edit
                                </button>
                                <button onClick={() => handleDeleteEmployee(employee.professionalDetails.employmentCode)} className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManageEmployee;
