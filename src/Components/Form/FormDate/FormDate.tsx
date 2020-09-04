import React, { FC } from 'react'
import DayPickerInput from 'react-day-picker/DayPickerInput'
import Col from 'react-bootstrap/Col'
import './DatePicker.scss'

type Props = {
  label: string
  date: Date
  onDateChange: (date: Date) => void
}

const FormDate: FC<Props> = ({ label, date, onDateChange }) => {
  return (
    <Col xs={12} md={4} className='mb-4'>
      <p className='mb-2'>{label}</p>
      <DayPickerInput
        onDayChange={(date) => onDateChange(date)}
        value={date}
        dayPickerProps={{
          disabledDays: [{ before: new Date() }],
        }}
      />
    </Col>
  )
}

export default FormDate
