import axios from "axios";

const getProjects = () => {
    return axios.get('http://localhost:8080/admin/projects');
};

const createProject = (projectData) => {
    console.log(projectData)
    return axios.post('http://localhost:8080/admin/projects', projectData);
};

const updateProject = ( projectId, projectData) => {
    console.log(projectData)
    console.log(projectId)
    return axios.put(`http://localhost:8080/admin/projects/${projectId}`, projectData);
};

const deleteProject = (projectId) => {
    return axios.delete(`http://localhost:8080/admin/projects/${projectId}`);
};

const assignProjectToEmployee = (projectId, empCode) => {
    return axios.put('http://localhost:8080/admin/projects/assign',null, {
        params: { projectId, empCode },
    });
};

const ProjectService = {
    getProjects,
    createProject,
    assignProjectToEmployee,
    deleteProject,
    updateProject,
};

export default ProjectService;
