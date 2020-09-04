import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Spinner from 'react-bootstrap/Spinner'

export default () => {
  return (
    <Row className='row-flex'>
      <Col className='d-flex justify-content-center'>
        <Spinner animation='border' role='status' variant='info'>
          <span className='sr-only'>Loading...</span>
        </Spinner>
      </Col>
    </Row>
  )
}
