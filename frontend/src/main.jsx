import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css' // O './App.css', depende de cómo se llame tu archivo de estilos globales
import { Amplify } from 'aws-amplify';

// CONFIGURACIÓN DE AWS COGNITO
Amplify.configure({
  Auth: {
    Cognito: {
      // REEMPLAZA ESTOS VALORES CON LOS TUYOS:
      userPoolId: 'us-east-1_RzP3za8PJ', 
      userPoolClientId: '2n3epn937e4vsm8tm8kr3gjvg1'
    }
  }
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)