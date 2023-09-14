import React from 'react'
import Navbar from  '../Navbar'
import logo from '/logo.svg'
import './styles.css'

function index() {
  return (
    <header>
        <img className='header__logo' src={logo} alt="logo myTinerary" />
        <h1 className='header__title'>MyTinerary</h1>
        <Navbar />
    </header>
  )
}

export default index