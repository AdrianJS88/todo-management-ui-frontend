import React, { useEffect } from 'react'
import { useState } from 'react'
import { getAppointment, saveAppointment, updateAppointment } from '../services/AppointmentService'
import { useNavigate, useParams } from 'react-router-dom'


const AppointmentComponent = () => {
   
   
    const [date_appointment, setAppointment] = useState('')
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const navigate = useNavigate()
    const { id } = useParams()


    function saveOrUpdateAppointment(e){
        e.preventDefault()

        const appointment = {date_appointment, name, price}
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
                setPrice(response.data.price)
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
                <div className='card-body'>
                    <form>
                    <div className='form-group mb-2'>
                            <label className='form-label'>Appointment Date:</label>
                            <input
                                type='datetime-local'
                                
                                className='form-control'
                                placeholder='Enter appointment Date'
                                name='date'
                                value={date_appointment}
                                
                                onChange={(e) => setAppointment(e.target.value)}
                            >
                            </input>
                        </div>

                    
                




                        <div className='form-group mb-2'>
                            <label className='form-label'>Appointment Name:</label>
                            <input
                                type='text'
                                className='form-control'
                                placeholder='Enter appointment NAME'
                                name='name'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            >
                            </input>
                        </div>

                        <div className='form-group mb-2'>
                            <label className='form-label'>Appointment price:</label>
                            <input
                                type='text'
                                className='form-control'
                                placeholder='Enter appointment price'
                                name='price'
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
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