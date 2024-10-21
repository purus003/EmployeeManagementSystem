import React, { useState } from 'react';
import axios from 'axios';

const EmployeeDetailsModal = ({ employee, onClose }) => {
  const [activeTab, setActiveTab] = useState('personal');

  const handRemoveProject = (ProjectId, EmployeeId) => {
    if (window.confirm("Are you sure you want to remove this project from the employee?")) {
      axios.put('http://localhost:8080/admin/employee/dp', null, {
        params: { ProjectId, EmployeeId },
      })
        .then(() => {
          alert('Project removed successfully');
        })
        .catch(error => {
          console.error('Error removing project', error);
          alert('Failed to remove the project');
        });
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl mx-auto p-6 relative">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Employee Details</h2>

        {/* Tab Navigation */}
        <div className="flex border-b mb-4">
          <button
            className={`py-2 px-4 text-sm font-medium ${activeTab === 'personal' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-600'}`}
            onClick={() => setActiveTab('personal')}
          >
            Personal Details
          </button>
          <button
            className={`py-2 px-4 text-sm font-medium ${activeTab === 'professional' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-600'}`}
            onClick={() => setActiveTab('professional')}
          >
            Professional Details
          </button>
          <button
            className={`py-2 px-4 text-sm font-medium ${activeTab === 'finance' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-600'}`}
            onClick={() => setActiveTab('finance')}
          >
            Finance Details
          </button>
          <button
            className={`py-2 px-4 text-sm font-medium ${activeTab === 'project' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-600'}`}
            onClick={() => setActiveTab('project')}
          >
            Project Details
          </button>
        </div>

        {/* Tab Content */}
        <div className="tab-content">
          {activeTab === 'personal' && (
            <div className="tab-pane">
              <h3 className="text-lg font-medium mb-2 text-gray-800">Personal Details</h3>
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
          )}

          {activeTab === 'professional' && (
            <div className="tab-pane">
              <h3 className="text-lg font-medium mb-2 text-gray-800">Professional Details</h3>
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
          )}

          {activeTab === 'finance' && (
            <div className="tab-pane">
              <h3 className="text-lg font-medium mb-2 text-gray-800">Finance Details</h3>
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
          )}

          {activeTab === 'project' && (
            <div className="tab-pane">
              <h3 className="text-lg font-medium mb-2 text-gray-800">Project Details</h3>
              <table className="table-auto w-full text-left">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-4 py-2">Project Code</th>
                    <th className="px-4 py-2">Client Name</th>
                    <th className="px-4 py-2">Reporting Manager</th>
                    <th className="px-4 py-2">Project Status</th>
                    <th className="px-4 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {employee.projectDetails.map((project) => (
                    <tr key={project.id} className="border-b">
                      <td className="px-4 py-2">{project.projectCode}</td>
                      <td className="px-4 py-2">{project.clientProjectName}</td>
                      <td className="px-4 py-2">{project.reportingManager}</td>
                      <td className="px-4 py-2">{project.projectStatus}</td>
                      <td className="px-4 py-2">
                        <button
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                          onClick={() => handRemoveProject(project.id, employee.id)}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default EmployeeDetailsModal;
