import React from "react";

const PersonalDetails = () => {
  const employee = JSON.parse(sessionStorage.getItem("employeeDetails"));

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Personal Details</h1>
      <p className="text-lg"><span className="font-semibold">Name:</span> {employee.personalDetails.fullName}</p>
      <p className="text-lg"><span className="font-semibold">Date of Birth:</span> {employee.personalDetails.dateOfBirth}</p>
      <p className="text-lg"><span className="font-semibold">Age:</span> {employee.personalDetails.age}</p>
      <p className="text-lg"><span className="font-semibold">Mobile:</span> {employee.personalDetails.mobile}</p>
      <p className="text-lg"><span className="font-semibold">Email:</span> {employee.personalDetails.personalEmail}</p>
      <p className="text-lg"><span className="font-semibold">Emergency Contact Name:</span> {employee.personalDetails.emergencyContactName}</p>
      <p className="text-lg"><span className="font-semibold">Emergency Contact Number:</span> {employee.personalDetails.emergencyContactMobile}</p>
      
      <h3 className="text-xl font-semibold mt-6 mb-2">Current Address</h3>
      <p className="text-lg">{employee.personalDetails.currentAddressLine1}</p>
      <p className="text-lg">{employee.personalDetails.currentAddressLine2}</p>
      <p className="text-lg">{employee.personalDetails.currentCity}</p>
      <p className="text-lg">{employee.personalDetails.currentPincode}</p>
      
      <h3 className="text-xl font-semibold mt-6 mb-2">Permanent Address</h3>
      <p className="text-lg">{employee.personalDetails.permanentAddressLine1}</p>
      <p className="text-lg">{employee.personalDetails.permanentAddressLine2}</p>
      <p className="text-lg">{employee.personalDetails.permanentCity}</p>
      <p className="text-lg">{employee.personalDetails.permanentPincode}</p>
    </div>
  );
};

export default PersonalDetails;
