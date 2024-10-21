import React from "react";

const ProjectsDetails = () => {
  const employee = JSON.parse(sessionStorage.getItem("employeeDetails"));

  return (
    <div className="p-6 bg-white shadow-md rounded-lg max-w-3xl mx-auto mt-6">
      <h3 className="text-2xl font-semibold text-gray-800 mb-4">Project Details</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 text-center text-gray-600 font-medium">Project Code</th>
              <th className="py-2 px-4 text-center text-gray-600 font-medium">Client Name</th>
              <th className="py-2 px-4 text-center text-gray-600 font-medium">Reporting Manager</th>
            </tr>
          </thead>
          <tbody>
            {employee.projectDetails.map((project) => (
              <tr key={project.id} className="border-b hover:bg-gray-50">
                <td className="py-2 px-4 text-center">{project.projectCode}</td>
                <td className="py-2 px-4 text-center">{project.clientProjectName}</td>
                <td className="py-2 px-4 text-center">{project.reportingManager}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProjectsDetails;
