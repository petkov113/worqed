import React, { FC } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const Title: FC<{ title: string; subtitle?: string }> = ({ title, subtitle }) => {
  return (
    <Row>
      <Col>
        <h2 className='mb-4'>{title}</h2>
        {subtitle && <p>{subtitle}</p>}
      </Col>
    </Row>
  )
}

export default Title
