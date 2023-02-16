import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './pages/app/component'
import Main from './pages/main/component'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App>
      <Main />
    </App>
    
  </React.StrictMode>,
)
