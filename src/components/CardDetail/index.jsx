import React from 'react'
import './styles.css'

function index({data}) {
  return (
    <>
        <div className='containerDetailsPage'>
            <img className='img__detailsPage' src={data?.portada} alt="" />{/*Hay que agregar los signos de pregunta porque carga tan rapido que componente que no se alcanza a actualizar por eso hay que preguntarle si por medio del operardor ? si tiene el dato*/}
            <div className='centerContentDetailsPage'>
                <div className='containerDetailsPage__text'>
                    <h2>{data?.nombre}</h2>{/*Acá también*/}
                    <h3>{data?.datos}</h3>{/*Acá también*/}
                </div>
            </div>
        </div>
    </>
  )
}

export default index