import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from "react-router-dom"
import logo from "/logo.svg"
import './styles.css'

import { useDispatch } from 'react-redux'
import userActions from "../../store/actions/usersActions.js"

import { GoogleLogin } from '@react-oauth/google'
import decode from 'jwt-decode'

function index() {  
  const dispatch = useDispatch()
  
  const navigate = useNavigate()
  
  const formRefs = {
    email: useRef(),
    password: useRef()
  }
  
  const handleSubmit = async (event) => {
    event.preventDefault()
    
    const dataForm = {
      email: formRefs.email.current.value,
      password: formRefs.password.current.value
    }
    try {
      await dispatch(userActions.sing_in(dataForm))
      .then((response)=>{
        if (response?.payload?.success) {
          setTimeout(() => {
            navigate('/')
          }, 2000);
        }
      })
    } catch (error) {
      console.log('error :', error)
    }
  }

  const singInWithGoogle = async (credentialResponse) => {
    const dataUser = decode(credentialResponse.credential)
    const body = {
      email: dataUser.email,
      password: dataUser.family_name + dataUser.sub,
    }
    try {
      await dispatch(userActions.sing_in(body))
      .then((response)=>{
        if (response.payload.success) {
          setTimeout(() => {
            navigate('/')
          }, 2000);
        }
      })
    } catch (error) {
      console.log('error :', error)
    }
  }
  return (
    <div className="singIn__container">

      <div className="singIn__left__container">
        <img className='singIn__logo' src={logo} alt="logo myTinerary" />
      </div>
      
      <div className="singIn__card">
        <h2>Sing in</h2>
        <p className="singIn__text">New user? <Link to="/singup" className="anchor__singIn">Create an account</Link></p>
        <form className="singIn__form" action="submit">
          <input type="email" name="email" id="email" placeholder="Email" ref={formRefs.email}/>
          <input type="password" name="password" id="password" placeholder="Password" ref={formRefs.password}/>        
          <button type="submit" onClick={handleSubmit}>Continue</button>
        </form>
        <div className="divider">
          <hr />
          <span>O</span>
          <hr />
        </div>
        <strong>Continue with:</strong>
        <div className="singIn__google__container">
          <GoogleLogin
            type='icon'
            size='large'
            shape='pill' 
            text='singin_with'
            onSuccess={singInWithGoogle}
            onError={() => {
              console.log('Login Failed');
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default index;
