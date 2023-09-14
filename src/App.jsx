import './App.css'
import Layout from './Layout'
import Home from './pages/Home'
import SingIn from './pages/SingIn'
import SingUp from './pages/SingUp'
import Cities from './pages/Cities'
import Details from './pages/Details'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import userActions from "./store/actions/usersActions.js"

const router = createBrowserRouter([
  { path:'/singin', element: <SingIn /> },
  { path:'/singup', element: <SingUp /> },
  { path:'/', element: <Layout />, 
    children: [
      { path:'/', element: <Home /> },
      { path:'/cities', element: <Cities /> },
      { path:'/details/:cid', element: <Details /> }
    ]
  }
])

function App() {
  const dispatch = useDispatch()
  
  useEffect(()=>{
    const token = localStorage.getItem("token")
    if(token){
      dispatch(userActions.authenticate())
    }
  },[])

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
