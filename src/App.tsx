import React, { useEffect } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { autoLogin } from './Redux/profileSlice'
import { RootState } from './Redux/store'
import ServiceForm from './Containers/ServiceForm/ServiceForm'
import Container from 'react-bootstrap/Container'
import Profile from './Containers/Profile/Profile'
import Navbar from './Components/Navbar/Navbar'
import Header from './Components/Header/Header'
import Footer from './Components/Footer/Footer'
import Auth from './Containers/Auth/Auth'
import Ads from './Containers/Ads/Ads'
import './App.scss'

function App() {
  const isAuth = useSelector<RootState, boolean>((state) => state.profile.isAuth)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(autoLogin())
  }, [dispatch])

  const commonRoutes = [
    <Route path='/' exact component={Header} key='header' />,
    <Route path='/form' exact component={ServiceForm} key='form' />,
    <Route path='/ads' exact component={Ads} key='ads' />,
  ]

  const noAuthRoutes = [...commonRoutes, <Route path='/auth' component={Auth} key='auth' />]
  const authRoutes = [...commonRoutes, <Route path='/profile' component={Profile} key='profile' />]

  return (
    <>
      <Container className='d-flex flex-column vh-100 p-0' fluid>
        <Navbar isAuth={isAuth} />
        <Switch>
          {isAuth ? authRoutes : noAuthRoutes}
          <Redirect to='/' />
        </Switch>
        <Footer />
      </Container>
    </>
  )
}

export default App
