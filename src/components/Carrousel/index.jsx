import React, { useState, useEffect } from 'react'
import CardContainer from '../CardContainer'
import './styles.css'

function index() { 
  let [step, setStep] = useState(0)

  let handlerBack = () => {
    if(step != 0) {
      setStep(step - 1)
    } else {  
      setStep(2)
    }
  }

  let handlerNext = () => {
    if(step != 2) {
      setStep(step + 1)
    } else {
      setStep(0)
    }
  }

  useEffect(() => {
    let interval = setInterval(() => {
       handlerNext()
    }, 5000)
    return () => {
      clearInterval(interval)
    }
  }, [step]);
  
  return (
    <section>
        <h2 className='carrousel__title'>Popular MYTINERARY!</h2>
        <div className='carrousel__container'>
          <button className='carrouser__btn back' onClick={()=>{handlerBack()}}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
              <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z"/>
            </svg>  
          </button>

            <CardContainer slide={step}/>
          
          <button className='carrouser__btn next' onClick={()=>{handlerNext()}}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
              <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
            </svg>
          </button>
        </div>
          
    </section>
  )
}

export default index