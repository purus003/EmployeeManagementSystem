import React, { useState, useEffect } from 'react';
import projectService from '../../services/ProjectService'; // Import project service for API calls
import ProjectService from '../../services/ProjectService';

const ManageProject = () => {
    const [projects, setProjects] = useState([]);
    const [showAddProjectForm, setShowAddProjectForm] = useState(false);
    const [showViewProjectDetails, setShowViewProjectDetails] = useState(false);
    const [showEditProjectForm, setShowEditProjectForm] = useState(false);
    const [newProject, setNewProject] = useState({
        projectCode: '',
        clientProjectName: '',
        startDate: '',
        endDate: '',
        reportingManager: '',
        projectStatus: '',
    });
    const [selectedProject, setSelectedProject] = useState(null);
    const [showOverlay, setShowOverlay] = useState(false);
    const [selectedProjectId, setSelectedProjectId] = useState(null);
    const [empCode, setEmpCode] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        loadProjects();
    }, []);

    const loadProjects = () => {
        projectService.getProjects()
            .then(response => {
                setProjects(response.data);
            })
            .catch(error => {
                console.error('Error fetching projects', error);
            });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProject({
            ...newProject,
            [name]: value,
        });
    };

    const handleAddProjectSubmit = (e) => {
        e.preventDefault();
        ProjectService.createProject(newProject)
            .then(response => {
                alert('Project added successfully');
                loadProjects();
                setShowAddProjectForm(false);
                resetNewProject();
            })
            .catch(error => {
                console.error('Error adding project', error);
                alert('Failed to add project');
            });
    };

    const handleViewProject = (project) => {
        setSelectedProject(project);
        setShowViewProjectDetails(true);
    };

    const handleEditProject = (project) => {
        setNewProject(project);
        setShowEditProjectForm(true);
    };

    const handleDeleteProject = (projectId) => {
        if (window.confirm("Are you sure you want to delete this project?")) {
            projectService.deleteProject(projectId)
                .then(() => {
                    alert('Project deleted successfully');
                    loadProjects();
                })
                .catch(error => {
                    console.error('Error deleting project', error);
                    alert('Failed to delete the project');
                });
        }
    };

    const handleEditProjectSubmit = (e, projectId) => {
        e.preventDefault();
        projectService.updateProject(projectId, newProject)
            .then(response => {
                alert('Project updated successfully');
                loadProjects();
                setShowEditProjectForm(false);
                resetNewProject();
            })
            .catch(error => {
                console.error('Error updating project', error);
                alert('Failed to update project');
            });
    };

    const handleAssignProject = async () => {
        if (empCode.trim()) {
            try {
                await projectService.assignProjectToEmployee(selectedProjectId, empCode);
                setShowOverlay(false);
                setEmpCode('');
                loadProjects();
            } catch (error) {
                setError('Failed to assign project. Please check the employee code.');
            }
        } else {
            setError('Employee code cannot be empty.');
        }
    };

    const resetNewProject = () => {
        setNewProject({
            projectCode: '',
            clientProjectName: '',
            startDate: '',
            endDate: '',
            reportingManager: '',
            projectStatus: '',
        });
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Manage Projects</h1>
            <button
                onClick={() => setShowAddProjectForm(true)}
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
            >
                Add Project
            </button>

            {/* Add Project Form */}
            {showAddProjectForm && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                    <div className="bg-white rounded-lg p-8 shadow-lg max-w-lg w-full">
                        <h2 className="text-xl font-semibold mb-4">Add New Project</h2>
                        <form onSubmit={handleAddProjectSubmit} className="space-y-4">
                            <div>
                                <label className="block font-medium">Project Code:</label>
                                <input
                                    type="text"
                                    name="projectCode"
                                    value={newProject.projectCode}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full border rounded p-2"
                                />
                            </div>
                            <div>
                                <label className="block font-medium">Client Project Name:</label>
                                <input
                                    type="text"
                                    name="clientProjectName"
                                    value={newProject.clientProjectName}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full border rounded p-2"
                                />
                            </div>
                            <div>
                                <label className="block font-medium">Start Date:</label>
                                <input
                                    type="date"
                                    name="startDate"
                                    value={newProject.startDate}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full border rounded p-2"
                                />
                            </div>
                            <div>
                                <label className="block font-medium">End Date:</label>
                                <input
                                    type="date"
                                    name="endDate"
                                    value={newProject.endDate}
                                    onChange={handleInputChange}
                                    className="w-full border rounded p-2"
                                />
                            </div>
                            <div>
                                <label className="block font-medium">Reporting Manager:</label>
                                <input
                                    type="text"
                                    name="reportingManager"
                                    value={newProject.reportingManager}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full border rounded p-2"
                                />
                            </div>
                            <div>
                                <label className="block font-medium">Project Status:</label>
                                <input
                                    type="text"
                                    name="projectStatus"
                                    value={newProject.projectStatus}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full border rounded p-2"
                                />
                            </div>
                            <div className="flex justify-between">
                                <button
                                    type="submit"
                                    className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
                                >
                                    Submit
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setShowAddProjectForm(false)}
                                    className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* View Project Details */}
            {showViewProjectDetails && selectedProject && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                    <div className="bg-white rounded-lg p-8 shadow-lg max-w-lg w-full">
                        <h2 className="text-xl font-semibold mb-4">Project Details</h2>
                        <p><strong>Project Code:</strong> {selectedProject.projectCode}</p>
                        <p><strong>Client Project Name:</strong> {selectedProject.clientProjectName}</p>
                        <p><strong>Start Date:</strong> {selectedProject.startDate}</p>
                        <p><strong>End Date:</strong> {selectedProject.endDate}</p>
                        <p><strong>Reporting Manager:</strong> {selectedProject.reportingManager}</p>
                        <p><strong>Project Status:</strong> {selectedProject.projectStatus}</p>
                        <button
                            onClick={() => setShowViewProjectDetails(false)}
                            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

            {/* Edit Project Form */}
            {showEditProjectForm && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                    <div className="bg-white rounded-lg p-8 shadow-lg max-w-lg w-full">
                        <h2 className="text-xl font-semibold mb-4">Edit Project</h2>
                        <form onSubmit={(e) => handleEditProjectSubmit(e, newProject.id)} className="space-y-4">
                            <div>
                                <label className="block font-medium">Project Code:</label>
                                <input
                                    type="text"
                                    name="projectCode"
                                    value={newProject.projectCode}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full border rounded p-2"
                                />
                            </div>
                            <div>
                                <label className="block font-medium">Client Project Name:</label>
                                <input
                                    type="text"
                                    name="clientProjectName"
                                    value={newProject.clientProjectName}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full border rounded p-2"
                                />
                            </div>
                            <div>
                                <label className="block font-medium">Start Date:</label>
                                <input
                                    type="date"
                                    name="startDate"
                                    value={newProject.startDate}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full border rounded p-2"
                                />
                            </div>
                            <div>
                                <label className="block font-medium">End Date:</label>
                                <input
                                    type="date"
                                    name="endDate"
                                    value={newProject.endDate}
                                    onChange={handleInputChange}
                                    className="w-full border rounded p-2"
                                />
                            </div>
                            <div>
                                <label className="block font-medium">Reporting Manager:</label>
                                <input
                                    type="text"
                                    name="reportingManager"
                                    value={newProject.reportingManager}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full border rounded p-2"
                                />
                            </div>
                            <div>
                                <label className="block font-medium">Project Status:</label>
                                <input
                                    type="text"
                                    name="projectStatus"
                                    value={newProject.projectStatus}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full border rounded p-2"
                                />
                            </div>
                            <div className="flex justify-between">
                                <button
                                    type="submit"
                                    className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
                                >
                                    Update
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setShowEditProjectForm(false)}
                                    className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {showOverlay && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                    <div className="bg-white rounded-lg p-8 shadow-lg max-w-lg w-full">
                        <h3 className="text-xl font-semibold mb-4">Assign Project</h3>
                        {error && <p className="text-red-500">{error}</p>}
                        <label className="block font-medium">Enter Employee Code:</label>
                        <input
                            type="text"
                            value={empCode}
                            onChange={(e) => setEmpCode(e.target.value)}
                            className="w-full border rounded p-2 mb-4"
                        />
                        <div className="flex justify-between">
                            <button
                                onClick={handleAssignProject}
                                className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
                            >
                                Submit
                            </button>
                            <button
                                onClick={() => setShowOverlay(false)}
                                className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <table className="table-auto w-full mt-6">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="px-4 py-2 text-center">Client Name</th>
                        <th className="px-4 py-2 text-center">Project Code</th>
                        <th className="px-4 py-2 text-center">Status</th>
                        <th className="px-4 py-2 text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {projects.map((project) => (
                        <tr key={project.id} className="bg-white border-b hover:bg-gray-100">
                            <td className="px-4 py-2 text-center">{project.clientProjectName}</td>
                            <td className="px-4 py-2 text-center">{project.projectCode}</td>
                            <td className="px-4 py-2 text-center">{project.projectStatus}</td>
                            <td className="px-4 py-2 space-x-2 text-center">
                                <button
                                    onClick={() => handleViewProject(project)}
                                    className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded"
                                >
                                    View
                                </button>
                                <button
                                    onClick={() => handleEditProject(project)}
                                    className="bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-3 rounded"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDeleteProject(project.id)}
                                    className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
                                >
                                    Delete
                                </button>
                                <button
                                    onClick={() => { setSelectedProjectId(project.id); setShowOverlay(true); }}
                                    className="bg-purple-500 hover:bg-purple-600 text-white py-1 px-3 rounded"
                                >
                                    Assign
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManageProject;
