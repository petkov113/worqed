import React, { FC } from 'react'
import Input from '../../Components/Input/Input'

type PropsTypes = {
  phoneValue: string
  nameValue: string
  onNameChange: (name: string) => void
  onPhoneChange: (phone: string) => void
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void
}

const Settings: FC<PropsTypes> = ({
  onNameChange,
  onPhoneChange,
  nameValue,
  phoneValue,
  onBlur,
}) => (
  <>
    <Input name='Име' id='name' value={nameValue} onChange={onNameChange} onBlur={onBlur} />
    <Input name='Телефон' id='phone' value={phoneValue} onChange={onPhoneChange} onBlur={onBlur} />
  </>
)

export default Settings
