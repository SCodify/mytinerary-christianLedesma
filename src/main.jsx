import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { Provider } from 'react-redux'
import { store } from './store/store.js'

import { GoogleOAuthProvider } from '@react-oauth/google';

ReactDOM.createRoot(document.getElementById('root')).render(
  //<React.StrictMode>
  <Provider store={store}> 
      <GoogleOAuthProvider clientId="844770114465-c5o8v18b4ntnh5kb645ds8mj8ip7kmme.apps.googleusercontent.com">
        <App />
      </GoogleOAuthProvider>
    </Provider>
  //</React.StrictMode>
  
)