import React, { useEffect } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useLocation } from 'react-router-dom';

import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux';

function index() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location])

  //const user = useSelector(store => store.userReducer.user)
  
  const token = localStorage.getItem("token")

  if(!token) {
    return <Navigate to={'/singin'}/>
  }
  
  return (
    <>
        <Header />
            <Outlet />
        <Footer />
    </>
  )
}

export default index