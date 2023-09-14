import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import Anchor from '../Anchor'
import { Link } from 'react-router-dom'
import './styles.css'

import { useDispatch } from 'react-redux'

import userActions from "../../store/actions/usersActions"

function index() {
    const dispatch = useDispatch()

    const [toggleMenu, setToggleMenu] = useState(false)

    function showMenu() {
        setToggleMenu(toggleMenu => !toggleMenu)
    }

    function closeMenu() {
        setToggleMenu(toggleMenu => false)
    }

    const itemMenu = [
        {url:"/", texto:"Home"},
        {url:"/cities", texto:"Cities"},
    ]

    const data = useSelector(store => store.userReducer.user)
    
    let foto = localStorage.getItem("foto")
    
    function singOut() {
        dispatch(userActions.sing_out())
    }

  return (
    <>
        <nav className={`menu ${toggleMenu && "mostrar"}`}> 
            {itemMenu.map((elem, index) => <Anchor key={index} url={elem.url} texto={elem.texto} handlerClose={closeMenu}/>)}
            {
                data ? 
                <>
                    <button className='nav__btn' onClick={singOut}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className='close__icon' viewBox="0 0 16 16">
                            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
                        </svg>
                        Logout
                    </button> 
                    <img className='user__img' src={foto} alt="" />
                </>
                : 
                <Link className='nav__btn' to="/singin" onClick={closeMenu}> 
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
                    </svg> 
                    Login
                </Link>
            }
        </nav>
        <button onClick={showMenu} className='nav__btnMenu'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
            </svg>
        </button>
    </>
  )
}

export default index