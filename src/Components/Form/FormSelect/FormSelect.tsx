import React, { FC, ChangeEvent } from 'react'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import { cities, City } from '../../../Containers/ServiceForm/ServiceForm'

type Props = {
  label: string
  id: string
  values: typeof cities
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void
  value: undefined | City
  blank?: boolean
}

const FormSelect: FC<Props> = ({ label, id, values, onChange, value, blank}) => {
  return (
    <Form.Group as={Col} md='4' controlId={id}>
      <Form.Label>{label}</Form.Label>
      <Form.Control as='select' onChange={onChange} value={value}>
        {blank && <option key='empthy' value='all'>всички</option>}
        {values.map((value) => (
          <option key={value}>{value}</option>
        ))}
      </Form.Control>
    </Form.Group>
  )
}

export default FormSelect
