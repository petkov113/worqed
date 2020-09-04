import React from 'react'
import { Questions } from '../Questions/Questions'
import { NavLink } from 'react-router-dom'
import background from './home.jpg'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Title from '../Title/Title'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import 'react-day-picker/lib/style.css'

export default () => {
  return (
    <Container
      fluid
      className='p-0 flex-grow-1 d-flex flex-column'
      style={{
        background: `linear-gradient(286deg, rgba(255,255,255,0) 34%, rgba(255,255,255,1) 55%, rgba(255,255,255,1) 100%), url('${background}')`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right top',
      }}>
      <Container fluid='xl' className='pt-5 flex-grow-1'>
        <Title
          title='Имате нужда от услуга?'
          subtitle='Стотици майстори са готови да Ви я предоставят'
        />
        <Row className='Header__inputs'>
          <Col xs={12} md={6} className='mb-3'>
            <NavLink to='/form' exact className='Btn'>
              <Button variant='primary' className='mt-4 mr-3'>
                Намери майстор
              </Button>
            </NavLink>
            <NavLink to='/ads' exact className='Btn'>
              <Button variant='secondary' className='mt-4'>
                Виж обяви
              </Button>
            </NavLink>
          </Col>
        </Row>
      </Container>
      <Questions />
    </Container>
  )
}
