import React from "react";
import EmployeeService from "../../services/EmployeeService";

const FinanceDetails = () => {
  const employee = JSON.parse(sessionStorage.getItem("employeeDetails"));

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-center">Finance Details</h1>
      
      <div className="space-y-3">
        <p className="text-lg">
          <span className="font-semibold">Employee Code:</span> {employee.professionalDetails.employmentCode}
        </p>
        <p className="text-lg">
          <span className="font-semibold">Aadhaar Number:</span> {employee.financeDetails.aadharCard}
        </p>
        <p className="text-lg">
          <span className="font-semibold">PAN Number:</span> {employee.financeDetails.panCard}
        </p>
        <p className="text-lg">
          <span className="font-semibold">Bank Name:</span> {employee.financeDetails.bankName}
        </p>
        <p className="text-lg">
          <span className="font-semibold">Branch:</span> {employee.financeDetails.branch}
        </p>
        <p className="text-lg">
          <span className="font-semibold">IFSC Code:</span> {employee.financeDetails.ifscCode}
        </p>
      </div>

      <div className="mt-6">
        <button
          className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-300"
          onClick={() => EmployeeService.downloadPayslip(employee.id)}
        >
          Download Payslip
        </button>
      </div>
    </div>
  );
};

export default FinanceDetails;
