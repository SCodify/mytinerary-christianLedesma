import React, { useRef } from 'react'
import './styles.css'

function index({ onSubmitProp }) {
    const inputRef = useRef(null)
    
    const handleSubmit = (event) => {
        event.preventDefault()
        if(inputRef.current.value){
            const queryParams = `?nombre=${inputRef.current.value}`
            onSubmitProp(queryParams)
        } else {
            onSubmitProp(false)
        } 
    }

   return (
        <form onInput={handleSubmit}>
            <input type="text" className='searchBar' placeholder='Search your city' ref={inputRef}/>
            <button className='searchBar__button'>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                </svg>
            </button>
        </form>    
   )
}

export default index