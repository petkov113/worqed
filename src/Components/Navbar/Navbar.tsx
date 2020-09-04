import { NavLink, useLocation } from 'react-router-dom'
import Navigationbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'
import { logout } from '../../Redux/profileSlice'
import React from 'react'
import Nav from 'react-bootstrap/Nav'
import { useDispatch } from 'react-redux'

const createLink = (to: string, value: string, exact: boolean = false) => (
  <Nav.Item key={to}>
    <NavLink to={to} exact={exact}>
      <Button variant='info' size='sm'>
        {value}
      </Button>
    </NavLink>
  </Nav.Item>
)

export default ({ isAuth }: { isAuth: boolean }) => {
  let noAuthLinks = [createLink('/auth', 'Влез', true)]
  const authLinks = [createLink('/profile#settings', 'Профил')]
  const location = useLocation()
  const dispatch = useDispatch()

  return (
    <Navigationbar variant='light' className='bg-light justify-content-between logo'>
      <NavLink to='/'>
        <Navigationbar.Brand>Worqed</Navigationbar.Brand>
      </NavLink>
      <Nav>
        {location.pathname === '/auth' || location.pathname === '/profile'
          ? null
          : isAuth
          ? authLinks
          : noAuthLinks}
        {location.pathname === '/profile' && (
          <Nav.Item key='btn'>
            <Button variant='danger' size='sm' block onClick={() => dispatch(logout())}>
              Излез
            </Button>
          </Nav.Item>
        )}
      </Nav>
    </Navigationbar>
  )
}
