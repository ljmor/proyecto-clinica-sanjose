import React from 'react'
import { Provider } from 'react-redux'
import { store } from './store_general/store'
import { BrowserRouter } from 'react-router-dom'
import { AppRouter } from './router/AppRouter'

export const SanJoseSysApp = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <AppRouter/>
            </BrowserRouter>
        </Provider>
    )
}
