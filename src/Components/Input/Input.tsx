import React, { FC } from 'react'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'

type Props = {
  name: string
  id: string
  value: string
  onChange: (input: string) => void
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void
  text?: string
}

const Input: FC<Props> = ({ name, id, value, onChange, onBlur, text }) => (
  <Col sm={12} md={6}>
    <InputGroup className='mb-3'>
      <InputGroup.Prepend>
        <InputGroup.Text id={id}>{name}</InputGroup.Text>
      </InputGroup.Prepend>
      <FormControl
        aria-describedby={id}
        onChange={(e) => onChange(e.target.value)}
        value={value}
        onBlur={onBlur}
        id={id}
      />
      {text && (
        <Form.Text id={id} muted>
          {text}
        </Form.Text>
      )}
    </InputGroup>
  </Col>
)

export default Input
