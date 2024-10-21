import React from "react";

const Welcome = () => {
  const employee = JSON.parse(sessionStorage.getItem("employeeDetails"));
  console.log(employee);
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Welcome To The  <span className="text-blue-500">ADMIN Dashboard</span> 
          {/* <span className="text-blue-500">{employee?.personalDetails.fullName}</span> */}
        </h1>
        <p className="text-gray-600">
          Here you can add the new employess , projects ,all employees details ,all project details and more.
        </p>
      </div>
    </div>
  );
};

export default Welcome;
