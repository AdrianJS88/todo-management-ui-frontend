import React, { useState } from 'react'
import { registerAPICall } from '../services/AuthService'
import { useNavigate } from 'react-router-dom';

const RegisterComponent = () => {

    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigator = useNavigate();
    const [error, setError] = useState('');

    function handleRegistrationForm(e){

        e.preventDefault();
      
        const register = {name, username, email, password}
       
        console.log(register);
      
       

        registerAPICall(register).then((response) => {
            console.log(response.data);
            navigator("/login")
            window.location.reload(false);
        }).catch(error => {
            console.error(error);
            setError('Format email gresit!!!');
        })
    }
        
  return (
    <><img src="register.jpg" alt="Italian Trulli" width="1920" height="400"></img>
    
    <div className='container'>
     
          <br /> <br />
          <div className='row'>
              <div className='col-sm-12 my-auto'>
                  <div className='card'>
                      <div className='card-header'>
                          <h2 className='text-center'> User Registration Form </h2>
                      </div>

                      <div className='card-body'>
                          <form>
                              <div className='row mb-3'>
                              
                                  <label className='col-md-3 control-label'> Name </label>
                                  <div className='col-md-9'>
                                      <input
                                          type='text'
                                          name='name'
                                          className='form-control'
                                          placeholder='Enter name'
                                          value={name}
                                          onChange={(e) => setName(e.target.value)}
                                      >
                                      </input>
                                  </div>
                              </div>

                              <div className='row mb-3'>
                                  <label className='col-md-3 control-label'> Username </label>
                                  <div className='col-md-9'>
                                      <input
                                          type='text'
                                          name='username'
                                          className='form-control'
                                          placeholder='Enter username'
                                          value={username}
                                          onChange={(e) => setUsername(e.target.value)}
                                      >
                                      </input>
                                  </div>
                              </div>


                              <div className='row mb-3'>
                               {error && <div className="alert alert-danger">{error}</div>}
                                  <label className='col-md-3 control-label'> Email </label>
                                  <div className='col-md-9'>
                                      <input
                                          type='text'
                                          name='email'
                                          className='form-control'
                                          placeholder='Enter email address'
                                          value={email}
                                          onChange={(e) => setEmail(e.target.value)}
                                      >
                                      </input>
                                  </div>
                              </div>

                              <div className='row mb-3'>
                                  <label className='col-md-3 control-label'> Password </label>
                                  <div className='col-md-9'>
                                      <input
                                          type='password'
                                          name='password'
                                          className='form-control'
                                          placeholder='Enter password'
                                          value={password}
                                          onChange={(e) => setPassword(e.target.value)}
                                      >
                                      </input>
                                  </div>
                              </div>

                              <div className='form-group mb-3'>
                                  <button className='btn btn-primary' onClick={(e) => handleRegistrationForm(e)}>Submit</button>

                              </div>
                          </form>

                      </div>

                  </div>
              </div>
          </div>


      </div></>
  )
}

export default RegisterComponent