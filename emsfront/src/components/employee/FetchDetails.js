import axios from "axios";

const Fetchdetails = () =>{
    const employee = JSON.parse(sessionStorage.getItem("employeeDetails"))
    console.log(employee);
    const employeeId = employee.professionalDetails.employmentCode;
    
    if(employeeId){
        axios.get(`http://localhost:8080/admin/employee/${employeeId}`)
        .then((response)=>{
            const updatedEmployeeDetails = response.data;
            sessionStorage.setItem("employeeDetails",JSON.stringify(updatedEmployeeDetails))
        })
    }
    
}
export default Fetchdetails;