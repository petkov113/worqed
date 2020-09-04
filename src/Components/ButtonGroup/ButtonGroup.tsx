import React, { FC } from 'react'
import { Sort } from '../../Containers/Ads/Ads'
import ButtonGroupB from 'react-bootstrap/ButtonGroup'
import ToggleButton from 'react-bootstrap/ToggleButton'
import Col from 'react-bootstrap/Col'

type Props = {
  label: string
  buttons: { name: string; value: Sort }[]
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  value: null | Sort
}

const ButtonGroup: FC<Props> = ({ label, onChange, value, buttons }) => {
  return (
    <Col sm='auto'>
      <p className='mb-2'>{label}</p>
      <ButtonGroupB toggle className='mb-2'>
        {buttons.map((button, idx) => (
          <ToggleButton
            key={idx}
            type='radio'
            variant='secondary'
            name='radio'
            value={button.value}
            checked={value === button.value}
            onChange={onChange}>
            {button.name}
          </ToggleButton>
        ))}
      </ButtonGroupB>
      <br />
    </Col>
  )
}

export default ButtonGroup
