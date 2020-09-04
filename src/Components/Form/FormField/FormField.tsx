import React, { FC, ChangeEvent, FocusEvent } from 'react'
import { FormikErrors, FormikTouched } from 'formik'
import { AuthFormValues } from '../../../Containers/Auth/Auth'
import { FormValues } from '../../../Containers/ServiceForm/ServiceForm'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'

type Props = {
  name: keyof FormValues | keyof AuthFormValues
  label: string
  type: 'text' | 'number' | 'tel' | 'email' | 'password'
  handleBlur: (e: FocusEvent<any>) => void
  handleChange: (e: ChangeEvent<any>) => void
  errors: FormikErrors<FormValues> & FormikErrors<AuthFormValues>
  touched: FormikTouched<FormValues> & FormikTouched<AuthFormValues>
  id?: string
  placeholder?: string
  size?: number
  disabled?: boolean
  value?: string
}

const FormField: FC<Props> = ({
  size,
  name,
  label,
  type,
  handleBlur,
  handleChange,
  errors,
  touched,
  id,
  placeholder,
  disabled,
  value,
}) => {
  return (
    <Form.Group as={Col} md={size || 4} sm={12} controlId={id || name} className='mx-auto'>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type={type}
        name={name}
        onBlur={handleBlur}
        placeholder={placeholder}
        onChange={handleChange}
        isInvalid={!!errors[name] && touched[name]}
        disabled={disabled}
        value={value}
      />
      <Form.Control.Feedback type='invalid'>{errors[name]}</Form.Control.Feedback>
    </Form.Group>
  )
}

export default FormField
