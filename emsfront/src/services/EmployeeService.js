// import axiosInstance from '../utils/axiosIns';
import axios from "axios";
const getAllEmployees = () => {
    return axios.get('http://localhost:8080/admin/employee');
};

const deleteEmployee = (empCode) => {
    return axios.delete(`http://localhost:8080/admin/employee/${empCode}`);
}

// const createEmployee = (employee, projects) => {
//     return axiosInstance.post('/admin/employees', { employee, projects });
// };

const downloadPayslip = async (employeeId) => {
    try{
     const response = await axios.get(`http://localhost:8080/payslip/download/${employeeId}`, {
        responseType: 'blob', // Ensure binary data is handled as blob
      });
  
      // Create a Blob from the response data
      const blob = new Blob([response.data], { type: 'application/pdf' });
      
      // Generate a URL for the Blob
      const url = window.URL.createObjectURL(blob);
  
      // Create a temporary link element
      const link = document.createElement('a');
      link.href = url;
  
      // Specify the file name for download
      link.setAttribute('download', 'payslip.pdf'); 
  
      // Append link to the DOM
      document.body.appendChild(link);
  
      // Programmatically click the link to trigger the download
      link.click();
  
      // Clean up and revoke the Object URL
      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);
  
    } catch (error) {
      console.error('Error downloading the payslip:', error);
    }
  
};

// const deleteEmployee = (employeeId) => {
//     return axiosInstance.delete(`/admin/employees/${employeeId}`)
//         .then(response => {
//             console.log('Employee deleted successfully:', response);
//         })
//         .catch(error => {
//             console.error('Error deleting the employee:', error);
//             throw error;  // Handle the error, e.g., show notification
//         });
// };

const EmployeeService = { getAllEmployees, deleteEmployee, downloadPayslip};
export default EmployeeService;
// export default { getAllEmployees, createEmployee, downloadPayslip, deleteEmployee };
