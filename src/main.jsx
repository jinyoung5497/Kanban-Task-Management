import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { FetchProvider } from './hooks/UseFetch.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
        <FetchProvider>
            <App />
        </FetchProvider>,
)
