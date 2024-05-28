import React from 'react'
import ReactDOM from 'react-dom/client'
import Index from './components/index/index'
import './index.css'

import { Provider } from 'react-redux'
import { BrowserRouter } from "react-router-dom";

import store from './Redux/Store.js'

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <Provider store={store} >
            <Index />
        </Provider>
    </BrowserRouter>

)


