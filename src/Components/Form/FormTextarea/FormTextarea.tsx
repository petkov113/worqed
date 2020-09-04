import React, { FC } from 'react'
import Form from 'react-bootstrap/Form'

type FormControlElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

type Props = {
  id: string
  label: string
  onChange: (event: React.ChangeEvent<FormControlElement>) => void
}

const FormTextarea: FC<Props> = ({ id, label, onChange }) => {
  return (
    <Form.Group controlId={id}>
      <Form.Label>{label}</Form.Label>
      <Form.Control as='textarea' onChange={onChange} />
    </Form.Group>
  )
}

export default FormTextarea
