import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

export const ProtectedRoute = ({ component: Component, ...rest }) => {
    const auth = useSelector(state => state.auth)
    return (
        <Route {...rest} render={props => auth.isAuth ? <Component {...props} /> : <Redirect to='/login' />} />
    )
} 
