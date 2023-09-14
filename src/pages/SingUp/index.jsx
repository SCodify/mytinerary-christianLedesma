import React, { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAllCities } from '../../services/citiesQueris'
import { Link } from "react-router-dom"
import logo from "/logo.svg"
import './styles.css'

import { useDispatch, useSelector } from 'react-redux'
import getCitiesAction from '../../store/actions/citiesActions'

import { GoogleLogin } from '@react-oauth/google'
import decode from 'jwt-decode'

import userActions from "../../store/actions/usersActions.js"

function index() {
  const dispatch = useDispatch()

  const citiesReducerInStore = useSelector(store => store.citiesReducer.cities)

  const runGetAllCities = () => {
    getAllCities()
    .then(data => {
      dispatch(getCitiesAction.get_cities(data))
    })
    .catch(err => console.log(err))
  }

  useEffect(
    ()=>{
      runGetAllCities()
    },
    []
  )

  const formRefs = {
    nombre: useRef(),
    apellido: useRef(),
    email: useRef(),
    password: useRef(),
    foto: useRef(),
    pais: useRef()
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const dataForm = {
      nombre: formRefs.nombre.current.value,
      apellido: formRefs.apellido.current.value,
      email: formRefs.email.current.value,
      password: formRefs.password.current.value,
      foto: formRefs.foto.current.value,
      pais: formRefs.pais.current.value
    }
    try {
      await dispatch(userActions.sing_up(dataForm))
    } catch (error) {
      console.log(error)
    }
  }

  const singUpWithGoogle = async (credentialResponse) => {
    try {
      const dataUser = decode(credentialResponse.credential)
      const body = {
        nombre: dataUser.given_name,
        apellido: dataUser.family_name,
        email: dataUser.email,
        password: dataUser.family_name + dataUser.sub,
        foto: dataUser.picture
      }
      await dispatch(userActions.sing_up(body))
    } catch (error) {
      console.log(error)
    }
    
  }
  
  return (
    <div className="singUp__container">

      <div className="singUp__left__container">
        <img className='singUp__logo' src={logo} alt="logo myTinerary" />
      </div>
      
      <div className="singUp__card">
        <h2>Create account</h2>
        <div className="singUp__google__container">
          <GoogleLogin
            type='icon'
            size='large'
            shape='pill' 
            text='singup_with'
            onSuccess={singUpWithGoogle}
            onError={() => {
              console.log('Login Failed');
            }}
          />
        </div>
        <div className="divider">
          <hr />
          <span>O</span>
          <hr />
        </div>
        <strong>Sing up whit email</strong>
        <form className="singUp__form" action="submit">
          <input type="email" name="email" id="email" placeholder="Email" ref={formRefs.email}/>
          <input type="password" name="password" id="password" placeholder="Password" ref={formRefs.password}/>
          <fieldset>
            <input type="text" name="nombre" id="nombre" placeholder="Name" ref={formRefs.nombre}/>
            <input type="text" name="apellido" id="apellido" placeholder="Lastname" ref={formRefs.apellido}/>
          </fieldset>
          <input type="text" name="foto" id="foto" placeholder="URL photo user" ref={formRefs.foto}/>
          <label htmlFor="select__country">Country/region:
              <select name="pais" id="pais" required defaultValue="default" ref={formRefs.pais}>
                  <option disabled value="default">select a country</option>
                  {citiesReducerInStore.map((item) => <option key={item._id} value={item.pais}>{item.pais}</option>)}
              </select>
          </label>
          <button onClick={handleSubmit} type="submit">Continue</button>
        </form>
        <p className="singIn__text">Already have an acconunt? <Link to="/singin" className="anchor__singIn">Sing in</Link></p>
      </div>
      
    </div>
  )
}

export default index;
