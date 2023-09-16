import React, { useEffect, useState } from 'react'
import {  deleteAppointment, getAllAppointments } from '../services/AppointmentService'
import { useNavigate } from 'react-router-dom'
import { isAdminUser } from '../services/AuthService'

const ListAppointmentComponent = () => {

    const [appointments, setAppointments] = useState([])

    const navigate = useNavigate()

   const isAdmin = isAdminUser();

    useEffect(() => {
        listAppointments();
    }, [])
    
    function listAppointments(){
        getAllAppointments().then((response) => {
            setAppointments(response.data);
        }).catch(error => {
            console.error(error);
        });
    }

    function addNewAppointment(){
        navigate('/add-appointment')

    }

    function updateAppointment(id){
        console.log(id)
        navigate(`/update-appointment/${id}`)
    }
    
    function removeAppointment(id){
        deleteAppointment(id).then((response) => {
            listAppointments();
        }).catch(error => {
            console.error(error)
        })
    }


  return (
    <div className='container'>
        <h2 className='text-center'>List of Appointments</h2>
      
         <button className='btn btn-primary mb-2' onClick={addNewAppointment}>Add Appointment</button>
       
       
       
       
        <div>
            <table className='table table-bordered table-striped'>
                <thead>
                    <tr>
                        <th>Appointment Date</th>
                        <th>Appointment Name</th>
                        <th>Appointment Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        appointments.map(appointment => 
                            <tr key={appointment.id}>
                                <td>{appointment.date_appointment}</td>
                                <td>{appointment.name}</td>
                                <td>{appointment.price}</td>
                                <td>
                             
                              <button className='btn btn-info' onClick={() => updateAppointment(appointment.id)}>Update</button>
                               
                                
                         <button className='btn btn-danger' onClick={() => removeAppointment(appointment.id)} style={ { marginLeft: "10px" }} >Delete</button>
                       
                                 
                                </td>
                            </tr>
                        )
                    }

                </tbody>
            </table>
        </div>

    </div>
  )
}

export default ListAppointmentComponent