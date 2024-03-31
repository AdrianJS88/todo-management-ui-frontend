import React, { useEffect } from 'react';
import { useState } from 'react';
import { getAppointment, saveAppointment, updateAppointment } from '../services/AppointmentService';
import { useNavigate, useParams } from 'react-router-dom';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { format, isValid, isPast } from 'date-fns'; // Import isValid and isPast from date-fns

import DatePicker from 'react-datepicker';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import moment from 'moment-timezone';

const AppointmentComponent = () => {
    const [error, setError] = useState('');
    const [date_appointment, setAppointment] = useState('');
    
    const [name, setName] = useState('');
    const [appointment_u_name, setAppointment_u_name] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();
    const localizer = momentLocalizer(moment);


    function saveOrUpdateAppointment(e) {
        e.preventDefault();

       // Validation
        if (!date_appointment) {
            setError('Please select a date and time tip programare si nume client.');
            return;
        } else {
            setError('');
        }
        // Validate date_appointment
        if (!isValid(new Date(date_appointment)) || isPast(new Date(date_appointment))) {
            setError('Te rog alege o progrmare cu data in viitor!');
            return;
        }
        

        const formattedDate = format(new Date(date_appointment), 'dd-MM-yyyy HH:mm');
        const appointment = {
            date_appointment: formattedDate,
            name,
            appointment_u_name,
        };

        if (id) {
            updateAppointment(id, appointment)
                .then((response) => {
                    navigate('/appointments');
                })
                .catch((error) => {
                    console.error(error);
                });
        } else {
            saveAppointment(appointment)
                .then((response) => {
                    console.log(response.data);
                    navigate('/appointments');
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }

    function pageTitle() {
        if (id) {
            return <h2 className='text-center'>Update appointment</h2>;
        } else {
            return <h2 className='text-center'>Add appointment</h2>;
        }
    }

    useEffect(() => {
        if (id) {
            getAppointment(id)
                .then((response) => {
                    console.log(response.data);
                    setAppointment(parseISO(response.data.date_appointment));
                    setName(response.data.name);
                    setAppointment_u_name(response.data.appointment_u_name);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, [id]);

    return (
        <div className='container'>
            <br /> <br />
            <div className='row'>
                <div className='card col-md-6 offset-md-3 offset-md-3'>
                    {pageTitle()}
                    <div className='registration-form-container'>
                        <form>
                            <div>
                                <div>
                                    <label htmlFor='appointmentDate'>Select Date and Time:</label>
                                    <br></br>
                                    <DatePicker
                                        id='appointmentDate'
                                        placeholderText='Select Date and Time'
                                        selected={date_appointment}
                                        onChange={(date) => setAppointment(date)}
                                        showTimeSelect
                                        timeFormat='HH:mm'
                                        timeIntervals={60}
                                        dateFormat='dd-MM-yyyy HH:mm'
                                    />
                                </div>
                            </div>

                            <div className='form-group mb-2'>
                                <label className='form-label'>Alege un tip Programare:</label>
                                <select
                                    type='submit'
                                    className='form-control'
                                    placeholder='Enter appointment tip'
                                    name='name'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}>
                                    <option value='Alege tip programare '> Alege tip programare</option>
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
                                />
                            </div>

                            <div className='error-message'>{error}</div> {/* Display error message */}

                            <button className='btn btn-success' onClick={(e) => saveOrUpdateAppointment(e)}>
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AppointmentComponent;
