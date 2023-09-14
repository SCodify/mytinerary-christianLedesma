import { createAction, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

import Swal from "sweetalert2"

const apiUrl = "http://localhost:4000"

const sing_up = createAsyncThunk("sing_up", async (payload) => {
  try {
    const user = await axios.post(apiUrl + '/api/user/register', payload)
    .then(response => {
      Swal.fire({
        icon: 'success',
        showConfirmButton: false,
        color: "#008000",
        background: "#e9fffb",
        position: "center",
        width: "max-content",
        timer: 2000,
        timerProgressBar: true,
        html: response.data.message,
        allowOutsideClick: false,
      })
      if(response.data.success){
        setTimeout(() => {
          window.location.assign("http://localhost:5173/singin")
        }, 2000);
      }
    })
    .catch((error)=> {
      let messagesInFront = ''
      let errorMessager = error.response.data.message
      errorMessager.forEach(item => {
        messagesInFront += `<p>${item}<p/>`
      })
      Swal.fire({
        toast: true,
        color: "#E61C51",
        background: "#e9fffb",
        position: "center",
        width: "max-content",
        timer: 3000,
        timerProgressBar: true,
        html: messagesInFront,
        confirmButtonColor: "#008080",
        allowOutsideClick: false,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
    })
    return user
  } catch (error) {
    return error.response.data.message
  }
})

const sing_in = createAsyncThunk("sing_in", async (payload) => {
  try {
    const user = await axios.post(apiUrl + '/api/user/login', payload)
    .then((response) => {
      localStorage.setItem("token", response.data.token)
      localStorage.setItem("foto", response.data.user.foto)

      Swal.fire({
        icon: 'success',
        showConfirmButton: false,
        color: "#008000",
        background: "#e9fffb",
        backdrop: "#0000004d",
        position: "center",
        width: "max-content",
        timer: 2000,
        timerProgressBar: true,
        html: response.data.message,
        allowOutsideClick: false,
      })

      return { 
        success: response.data.success,
        data: response.data.user 
      }
    })
    .catch((error)=> {
      let messagesInFront = ''
      let errorMessager = error.response.data.message
      
      errorMessager.forEach(item => {
        messagesInFront += `<p>${item}<p/>`
      })

      Swal.fire({
        toast: true,
        color: "#E61C51",
        background: "#e9fffb",
        position: "center",
        width: "max-content",
        timer: 3000,
        timerProgressBar: true,
        html: messagesInFront,
        confirmButtonColor: "#008080",
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })

    })
    return user
  } catch (error) {
    return error.response.data.message
  }
})


export const authenticate = createAsyncThunk("authenticate", async ()=>{
  try {
    let token = localStorage.getItem("token");
    let user = await axios.post(apiUrl + "/api/user/authenticated", null, {
      headers: {
        'Authorization' : 'Bearer ' + token
      }
    })
    .then((response) => {
      console.log("authenticated successfully");
      localStorage.setItem("token", response.data.token)
      return response.data.user
    })

    return {
      user: user
    }
  } catch (error) {
    console.log(error.message);
  }
})

// const sing_out = createAsyncThunk("sing_out", async () => {
//   try {
//     axios.post(apiUrl + "/api/user/logout")
//     .then((response) => {
//       localStorage.removeItem("token")
//     })
//   } catch (error) {
//     console.log(error.message);
//   }   
// })

const sing_out = createAction("sing_out", () => {
  localStorage.removeItem("token")
  
  Swal.fire({
    icon: 'error',
    showConfirmButton: false,
    color: "#008080",
    background: "#e9fffb",
    position: "center",
    width: "max-content",
    timer: 2000,
    timerProgressBar: true,
    text: "The session is closed",
    allowOutsideClick: false,
  })
  setTimeout(() => {
    localStorage.removeItem("foto")
    window.location.assign("http://localhost:5173/singin")
  }, 2000);

  return {
    payload: null
  }
})

const userActions = { sing_up, sing_in, authenticate, sing_out }

export default userActions