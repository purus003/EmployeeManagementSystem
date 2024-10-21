// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import LoginPage from './components/auth/LoginPage';
import AdminDashboard from './components/admin/AdminDashboard';
import EmployeeDashboard from './components/employee/EmployeeDashboard';
import ManageProjects from './components/admin/ManageProject';
import ManageEmployee from './components/admin/ManageEmployee';
import WelcomeSection from './components/employee/WelcomeSection';
import PersonalDetails from './components/employee/PersonalDetails';
import ProfessionalDetails from './components/employee/ProfessionalDetails';
import FinanceDetails from './components/employee/FinanceDetails';
import ProjectsDetails from './components/employee/ProjectDetails';
import Welcome from './components/admin/Welcome';

const App = () => {

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/login"/>} />
                {/* <Route path="*" element={<Navigate to="/login"/>} /> */}
                <Route path="/login" Component={LoginPage} />
                <Route
                    path="/admin/dashboard"
                    Component={AdminDashboard}
                >
                    <Route path="manage-projects" element={<ManageProjects/>} />
                    <Route path="manage-employee" element={<ManageEmployee/>}/>
                    <Route path="Welcome" element={<Welcome />} />

                    
                </Route>
               
                <Route
                    path="/employee/dashboard"
                    Component={EmployeeDashboard}
                >
                    <Route path="welcome" element={<WelcomeSection />} />
                    <Route path="personal-details" element={<PersonalDetails />} />
                    <Route path="professional-details" element={<ProfessionalDetails />} />
                    <Route path="finance-details" element={<FinanceDetails />} />
                    <Route path="projects-details" element={<ProjectsDetails />} />
                </Route>
                {/* Add more routes as necessary */}
            </Routes>
        </Router>
    );
};

export default App;
