import React, { FC } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { FormikErrors } from 'formik'
import { FormValues } from '../../../Containers/ServiceForm/ServiceForm'

type Props = {
  id: string
  label: string
  errors: FormikErrors<FormValues>
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onLinkClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void
  link?: string
}

const FormCheckbox: FC<Props> = ({ id, label, errors, onChange, onLinkClick, link }) => {
  return (
    <Form.Group controlId={id} className='d-flex'>
      <Form.Label className='d-flex align-items-center flex-row-reverse'>
        <span className='d-flex flex-wrap align-items-center justify-content-center'>
          {label}
          {link && (
            <Button variant='link' onClick={onLinkClick}>
              {link}
            </Button>
          )}
        </span>
        <Form.Check name='terms' onChange={onChange} isInvalid={!!errors.terms} id='terms' />
      </Form.Label>
    </Form.Group>
  )
}

export default FormCheckbox
