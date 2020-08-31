import React, { useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'
import { Container } from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux'

import { userAction } from '../actions'
import { Login, Signup, Home, Edit } from '../pages'
import { NavBar, ProtectedRoute } from '../components'

export const App = () => {
  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth)

  useEffect(() => {
    if (auth.isAuth === false && localStorage.getItem('APP_TOKEN') !== 'undefined') {
      dispatch(userAction.onLodingSignIn())
    }
    // eslint-disable-next-line
  }, [])

  return (
    <Container>
      <NavBar />
      <Switch>
        <ProtectedRoute path="/" component={Home} exact />
        <ProtectedRoute path="/edit" component={Edit} exact />
      </Switch>
      <Route path="/login" component={Login} exact />
      <Route path="/signup" component={Signup} exact />
    </Container>
  )
}

