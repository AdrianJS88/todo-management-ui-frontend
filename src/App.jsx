import { useState } from 'react'
import './App.css'
import ListTodoComponent from './components/ListTodoComponent'
import TodoComponent from './components/TodoComponent'

import ListAppointmentComponent from './components/ListAppointmentComponent'
import AppointmentComponent from './components/AppointmentComponent'


import HeaderComponent from './components/HeaderComponent'
import FooterComponent from './components/FooterComponent'
import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'

import RegisterComponent from './components/RegisterComponent'
import LoginComponent from './components/LoginComponent'
import { isUserLoggedIn } from './services/AuthService'

function App() {

  function AuthenticatedRoute({children}){

    const isAuth = isUserLoggedIn();

    if(isAuth) {
      return children;
    }

    return <Navigate to="/" />

  }

  return (
    <>
    <BrowserRouter>
        <HeaderComponent />
          <Routes>
              {/* http://localhost:8080 */}
              <Route path='/' element = { <LoginComponent /> }></Route>

               {/* http://localhost:8080/todos */}
              <Route path='/todos' element = { 
              <AuthenticatedRoute>
                <ListTodoComponent />
              </AuthenticatedRoute> 
              }></Route>


                  {/* http://localhost:8080/appointments */}
                  <Route path='/appointments' element = { 
              <AuthenticatedRoute>
                <ListAppointmentComponent />
              </AuthenticatedRoute> 
              }></Route>



              {/* http://localhost:8080/add-todo */}
              <Route path='/add-todo' element = { 
                <AuthenticatedRoute>
                <TodoComponent /> 
                </AuthenticatedRoute>
              }></Route>

               {/* http://localhost:8080/add-appointment */}
               <Route path='/add-appointment' element = { 
                <AuthenticatedRoute>
                <AppointmentComponent /> 
                </AuthenticatedRoute>
              }></Route>




              {/* http://localhost:8080/update-todo/1 */}
              <Route path='/update-todo/:id' element = { 
              <AuthenticatedRoute>
              <TodoComponent /> 
              </AuthenticatedRoute>
              }></Route>

               {/* http://localhost:8080/update-appointment/1 */}
               <Route path='/update-appointment/:id' element = { 
              <AuthenticatedRoute>
              <AppointmentComponent /> 
              </AuthenticatedRoute>
              }></Route>






               {/* http://localhost:8080/register */}
              <Route path='/register' element = { <RegisterComponent />}></Route>

               {/* http://localhost:8080/login */}
               <Route path='/login' element = { <LoginComponent /> }></Route>

          </Routes>
        <FooterComponent />
        </BrowserRouter>
    </>
  )
}

export default App
