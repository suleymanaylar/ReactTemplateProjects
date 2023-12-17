import axios  from "axios";

const HTTP=axios.create({
    baseURL:'https://localhost:44307/api'
})

export const Login=async(tcNo)=> await HTTP.get('/Account/Login/'+tcNo)