import React, { useEffect, useState } from 'react'
import {  deleteAppointment, getAllAppointments  } from '../services/AppointmentService'
import { useNavigate } from 'react-router-dom'
import { getLoggedInUser, isAdminUser } from '../services/AuthService'
import 'bootstrap/dist/css/bootstrap.min.css';
import { autocompleteClasses } from '@mui/material';

const ListAppointmentComponent = () => {
  
    const [appointments, setAppointments] = useState([])

    const navigate = useNavigate()
  
   const isAdmin = isAdminUser();

   const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);


  const handleSearch = () => {
    const username = sessionStorage.getItem("authenticatedUser");

    const filteredAppointments = appointments.filter(appointment =>
      appointment.appointment_u_name.toLowerCase() === getLoggedInUser(searchTerm.toLowerCase()) 
      
    );
   
    setSearchResults(filteredAppointments);
  };




    useEffect(() => {
     
        listAppointments();
    }, [])
    
    function listAppointments(){
     
         getAllAppointments(). then((response) => {
            setAppointments(response.data);
        }).catch(error => {
            console.error(error);
        });
    }



    function addNewAppointment(){
        navigate('/add-appointment')

    }

   function updateAppointment(id) {
    navigate(`/update-appointment/${id}`);
}

function removeAppointment(id) {
    deleteAppointment(id)
        .then((response) => {
            setAppointments((prevAppointments) =>
                prevAppointments.filter((appointment) => appointment.id !== id)
            );
        })
        .catch((error) => {
            console.error(error);
        });
    }


  return (
    
    <div className='card-lg' >
     
        <h2 className='text-center'>Appointments List</h2>
        
         <button className='btn btn-primary mb-2' onClick={addNewAppointment}>Add Appointment</button>
        
    
       
        <div>
          {isAdmin &&
            <table className='table table-bordered table-striped'>
            
                <thead className='appoint' >
                
                    <tr>
                       
                        <th>Appointment Type Name</th>
                        <th>Appointment Date/Time</th>
                        <th>Appointment Username</th>
                 
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        appointments.map(appointment => 
                            <tr key={appointment.id } >
                               <td>{appointment.name}</td>
                                <td>{appointment.date_appointment} </td>
                                 <td>{appointment.appointment_u_name}</td>
                           
                                <td>
                             
                              <button className='btn btn-info' onClick={() => updateAppointment(appointment.id)}>Update</button>
                               
                                
                         <button className='btn btn-danger' onClick={() => removeAppointment(appointment.id)} style={ { marginLeft: "10px" }} >Delete</button>
                       
                        
                                </td>
                            </tr>
                        )
                    }

                </tbody>
            </table>
        }
        </div>
           
    <div>
  <div className="mb-3">
    <label htmlFor="searchName" className="form-label">Enter Appointment Name:</label>
    <input
      type="text"
      className="form-control"
      id="searchName"
      value={searchTerm}
      onChange={e => setSearchTerm(e.target.value)}
    />
    <button className="btn btn-primary" onClick={handleSearch}>Programarile tale</button>
    
  </div>

  <div className="containertext-center-3">
    <table className="table">
      <thead className="table">
       
        <tr>
          <th scope="col">Nume client :</th>
          <th scope="col">Tip Programare:</th>
          <th scope="col">Data/ora Programare:</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        {searchResults.map(appointment => (
          <tr key={appointment.id} style={{ background:  'grey' }}>
            <td>{appointment.appointment_u_name}</td>
            <td>{appointment.name}</td>
            <td>{appointment.date_appointment}</td>
             
            <td>
              {/* <button className='btn btn-info' onClick={() => updateAppointment(appointment.id)}>Update</button> */}
              <button className='btn btn-danger' onClick={() => removeAppointment(appointment.id)} style={{ marginLeft: "10px" }}>Delete</button>
            </td>
          </tr>
        ))}
        
      </tbody>
      
    </table>
    
  </div>
  
</div>
    <img src='wp3066953.jpg' width={autocompleteClasses} height={autocompleteClasses}></img>
    </div>





  )
}

export default ListAppointmentComponent