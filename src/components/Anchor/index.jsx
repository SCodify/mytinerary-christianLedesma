import React from 'react'
import './styles.css'
import { Link as Anchor } from 'react-router-dom'

function index({url, texto, handlerClose}) {
  return (
    <Anchor to={ url } onClick={ handlerClose }>{ texto }</Anchor>
  )
}

export default index