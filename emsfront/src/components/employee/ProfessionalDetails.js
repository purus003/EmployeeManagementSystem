import React from "react";

const ProfessionalDetails = () => {
  const employee = JSON.parse(sessionStorage.getItem("employeeDetails"));

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-center">Professional Details</h1>
      
      <div className="space-y-3">
        <p className="text-lg">
          <span className="font-semibold">Employee Code:</span> {employee.professionalDetails.employmentCode}
        </p>
        <p className="text-lg">
          <span className="font-semibold">Date of Joining:</span> {employee.professionalDetails.dateOfJoining}
        </p>
        <p className="text-lg">
          <span className="font-semibold">Company Email:</span> {employee.professionalDetails.companyEmail}
        </p>
        <p className="text-lg">
          <span className="font-semibold">HR Name:</span> {employee.professionalDetails.hrName}
        </p>
        <p className="text-lg">
          <span className="font-semibold">Office Phone:</span> {employee.professionalDetails.officePhone}
        </p>
        <p className="text-lg">
          <span className="font-semibold">Office City:</span> {employee.professionalDetails.officeCity}
        </p>
        <p className="text-lg">
          <span className="font-semibold">Reporting Manager:</span> {employee.professionalDetails.reportingManager}
        </p>
      </div>
    </div>
  );
};

export default ProfessionalDetails;
