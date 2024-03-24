import axios from "axios";
import { getToken } from "./AuthService";

const BASE_REST_API_URL = 'http://localhost:8080/api/appointments';



// export function getAllTodos(){
//     return axios.get(BASE_REST_API_URL);
// }

// Add a request interceptor
axios.interceptors.request.use(function (config) {
    
    config.headers['Authorization'] = getToken();

    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

  export const  searchAppointments = (appointment) => axios.get(BASE_REST_API_URL  + appointment)
  
 export const  getAllAppointments = () => axios.get(BASE_REST_API_URL)

 export const saveAppointment = (appointment) => axios.post(BASE_REST_API_URL, appointment)

 export const getAppointment = (id) => axios.get(BASE_REST_API_URL + '/' + id)
 

 export const getIsAvailable = (isAvailable) => axios.get(BASE_REST_API_URL + '/' + isAvailable)

 export const updateAppointment = (id, appointment) => axios.put(BASE_REST_API_URL + '/' + id, appointment)

 export const deleteAppointment = (id) => axios.delete(BASE_REST_API_URL + '/' + id)

