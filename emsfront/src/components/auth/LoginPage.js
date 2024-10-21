import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../../services/AuthService';

const LoginPage = () => {  // Accepting onLogin as a prop
    const [empcode, setEmpcode] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(()=>{
        const userRole = sessionStorage.getItem("role");
        console.log(userRole);

        if(userRole){
            if(userRole ==="EMPLOYEE"){
                navigate("/employee/dashboard")
            }else if(userRole === "ADMIN"){
                navigate("/admin/dashboard")
            }
        }else{
            navigate("/login")
        }
    },[navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await AuthService.login(empcode, password);

            const role=response.data.role;
            const employeeDetails = response.data.employeeDetails;
            console.log(response);
            console.log(employeeDetails);
            console.log("aaa");
            
            if (role === "ADMIN") {
             // Call the onLogin function to update authentication state
                sessionStorage.setItem("role",role);
                navigate("/admin/dashboard");
            } else if (role === "EMPLOYEE") {
                // Call the onLogin function to update authentication state
                sessionStorage.setItem("role",role);
                sessionStorage.setItem("employeeDetails",JSON.stringify(employeeDetails))
                navigate("/employee/dashboard");
            } else {
                setError('Unknown role');
            }
        } catch (error) {
            setError('Invalid credentials');
        }
    };

    return (
        <div className='flex justify-center items-center bg-blue-100 h-screen '>
            <div className='bg-white px-10 py-20 rounded-3xl border-2 border-gray-200 w-1/3 h-3/4'>
            <h1 className='text-3xl font-semibold'>Login</h1>
            <p className='font-medium text-lg text-gray-500 mt-4'>Welcome Back! Please enter your details</p>
            <div className='mt-8'>
                <form onSubmit={handleLogin}>

                <div>
                    <label className='text-lg font-medium'>EMPCODE</label>
                    <input
                        className='w-full border-2 focus:border-blue-500 focus:outline-none border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                        placeholder='Enter your email'
                        type="text"
                        value={empcode}
                        onChange={(e) => setEmpcode(e.target.value)}
                        required
                        />
                </div>
                <div>
                    <label className='text-lg font-medium'>Password</label>
                    <input
                        className='w-full border-2  focus:border-blue-500 focus:outline-none border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                        placeholder='Enter your Password'
                        type='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        />
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit" className='active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-3 rounded-xl bg-blue-500 text-white text-lg font-bold w-20'>Log In</button>
                <div className='mt-8 flex justify-between items-center'>
                    <div >
                        <input
                            type="checkbox"
                            id='remember' />
                        <label className='ml-2 font-medium text-base' for="remember">Remeber Me</label>
                    </div>
                </div>
                
            </form>
            </div>
        </div>
        </div>
    );
};

export default LoginPage;
