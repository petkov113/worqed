import Accordion from 'react-bootstrap/Accordion'
import Button from 'react-bootstrap/Button'
import React, { FC } from 'react'
import Card from 'react-bootstrap/Card'

const AccordionCard: FC<{ title: string; text: string; eventKey: string }> = ({
  title,
  text,
  eventKey,
}) => {
  return (
    <Card>
      <Card.Header>
        <Accordion.Toggle as={Button} variant='link' eventKey={eventKey}>
          {title}
        </Accordion.Toggle>
      </Card.Header>
      <Accordion.Collapse eventKey={eventKey}>
        <Card.Body>{text}</Card.Body>
      </Accordion.Collapse>
    </Card>
  )
}

export default AccordionCard
