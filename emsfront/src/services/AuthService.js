import axios from "axios";

const login = async (empcode, password) => {
    const response = await axios.post('http://localhost:8080/login', { empcode, password });
    return response;
};

const logout = () => {
    sessionStorage.clear();
    window.location.href = '/login';  // Redirect to login page after logout
};

const AuthService = { login, logout };

export default AuthService;
