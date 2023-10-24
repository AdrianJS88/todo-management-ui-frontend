import React, { useEffect } from 'react'
import { useState } from 'react'
import { getAppointment, saveAppointment, updateAppointment } from '../services/AppointmentService'
import { useNavigate, useParams } from 'react-router-dom'


const AppointmentComponent = () => {
   

   
    const [date_appointment, setAppointment] = useState('')
  
    const [name, setName] = useState('')
    const [appointment_u_name, setAppointment_u_name] = useState('')
    const navigate = useNavigate()
    const { id } = useParams()
     
    


    function saveOrUpdateAppointment(e){
        e.preventDefault()
 
  // Parse the input date string into a JavaScript Date object
  const inputDate = new Date(date_appointment);

  // Create a function to format the date in the desired format
  const formatDate = (date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1; // Month is zero-based, so we add 1
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    // Ensure two-digit formatting for day, month, hours, and minutes
    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;
    const formattedHours = hours < 10 ? `0${hours}` : hours;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${formattedDay}-${formattedMonth}-${year} ${formattedHours}:${formattedMinutes}`;
  };

  // Format the date
  const formattedDate = formatDate(inputDate);

  const appointment = {
    date_appointment: formattedDate,
    name,
    appointment_u_name,
  };

  console.log(appointment);
          

 


        if(id){

            updateAppointment(id, appointment).then((response) => {
                navigate('/appointments')
            }).catch(error => {
                console.error(error);
            })

        }else{
            saveAppointment(appointment).then((response) => {
                console.log(response.data)
                navigate('/appointments')
            }).catch(error => {
                console.error(error);
            })
        }
    }

    function pageTitle(){
        
        if(id) {
            
            return <h2 className='text-center'>Update appointment</h2>
        }else {
            return <h2 className='text-center'>Add appointment</h2>
        }
    }





    useEffect( () => {

        

        if(id){
            getAppointment(id).then((response) => {
                console.log(response.data)
                setAppointment(response.data.date_appointment)
                setName(response.data.name)
                setAppointment_u_name(response.data.appointment_u_name)
                
            }).catch(error => {
                console.error(error);
            })
        }

    }, [id])

  return (
    
    <div className='container'>
         
        <br /> <br />
        <div className='row'>
        
            <div className='card col-md-6 offset-md-3 offset-md-3'>
            
                { pageTitle() }
                
                <div className='registration-form-container'>
                  
                    <form>
               <div className="form-group mb-2">
      <label className="form-label" htmlFor="datetime">
        Appointment Date:
      </label>
      <input
        type="datetime-local"
        id="datetime"
        step="3600"
        className="form-control"
        placeholder="Enter appointment Date"
        name="date"
        value={date_appointment}  
        onChange={(e) => setAppointment(e.target.value)}
     
      />
    </div>


 
                        <div className='form-group mb-2'>
                            <label className='form-label'>Alege un tip Programare:</label>
                            <select
                                type='submit'
                                className='form-control'
                                placeholder='Enter appointment tip'
                                name='name'
                                value={name}
                                 onChange={(e) => setName(e.target.value)}
                           >
                             <option value='Alege tip programare'>Alege Tip Programare </option>
                            <option value='Tuns pret 50 ron '>Tuns pret 50 ron </option>
                            <option value='Tuns + barba pret 60 ron'>Tuns + barba pret 60 ron </option>
                            <option value='Tuns copii sub 12 ani pret 40 ron'>Tuns copii sub 12 ani pret 40 ron </option>
                            </select> 
                        </div>
                      

                        <div className='form-group mb-2'>
                            <label className='form-label'> Nume client:</label>
                            <input
                                type='text'
                                className='form-control'
                                placeholder='Introdu numele tau'
                                name='appointment_u_name'
                                value={appointment_u_name}
                                onChange={(e) => setAppointment_u_name(e.target.value)}
                            >
                            </input>
                            
                        </div>

                       
                       

                      
                         
                        <button className='btn btn-success' onClick={ (e) => saveOrUpdateAppointment(e)}>Submit</button>
                    </form>

                </div>
                
            </div>

        </div>
        
    </div>
    
  )
}

export default AppointmentComponent