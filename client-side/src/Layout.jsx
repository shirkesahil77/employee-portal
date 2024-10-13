import React,{useState, useEffect} from 'react'
import {Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Menubar from './pages/Navigation/Menubar';
import Login from './pages/Security/Login';
import EmployeesList from './pages/Employees/EmployeesList';
import EmployeeDetails from './pages/Employees/EmployeeDetails';


const Layout = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check for token on mount to determine authentication status
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  // Handle login success (from Login component)
  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  // Handle logout
  const handleLogout = () => {
    sessionStorage.removeItem("token");
    setIsAuthenticated(false);
  };
  return (
    <div className='container'>
        <Menubar
        isAuthenticated={isAuthenticated}
        onLogout={handleLogout}
      />
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/home' element={<Home/>}/>
            <Route path='/login' element={<Login onLoginSuccess={handleLoginSuccess}/>}/>
            <Route path='/employees' element={<EmployeesList/>}/>
            <Route path='/employees/:id' element={<EmployeeDetails/>}/>
        </Routes>
        
    </div>
  )
}

export default Layout