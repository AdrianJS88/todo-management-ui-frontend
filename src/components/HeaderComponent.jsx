import React from 'react'
import { NavLink } from 'react-router-dom'
import { isUserLoggedIn, logout } from '../services/AuthService'
import { useNavigate } from 'react-router-dom'

const HeaderComponent = () => {

    const isAuth = isUserLoggedIn();

    const navigator = useNavigate();

    function handleLogout(){
        logout();
        navigator('/login')
    }

  return (
    <div>
        <header>
          
            <nav className='navbar navbar-expand-md navbar-dark bg-dark'>

                <div>
             
                </div>
                
                <div>
                    <a href='http://localhost:3000' className='navbar-brand'>
                       Barber Appointment System
                    </a>
                </div>
                <div className='collapse navbar-collapse'>
               
                    <ul className='navbar-nav'>
                  
                        {
                            isAuth &&                         
                            <li className='nav-item'>
                            <NavLink to="/todos" className="nav-link">Todos</NavLink>
                        </li>
                        }

                    </ul>
                    <ul className='navbar-nav'>

                    {
                            isAuth &&  
                   <li className='nav-item'>
                   <NavLink to="/appointments" className="nav-link">Appointment</NavLink>
                   </li>
                    }
                    
                   </ul>
                   </div>
            
               
               
                <ul className='navbar-nav'>
                    
                    {
                        !isAuth &&                         
                        <li className='nav-item'>
                        <NavLink to="/register" className="nav-link">Register</NavLink>
                    </li>
                    }

                    {
                        !isAuth &&    
                        <li className='nav-item'>
                        <NavLink to="/login" className="nav-link">Login</NavLink>
                    </li>
                    }

                    {
                        isAuth &&    
                        <li className='nav-item'>
                        <NavLink to="/login" className="nav-link" onClick={handleLogout}>Logout</NavLink>
                    </li>
                    }

                    </ul>
            </nav>
        </header>
        <div>
    
      </div>
       </div>
    
  )
  
}

export default HeaderComponent