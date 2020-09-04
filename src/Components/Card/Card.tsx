import React, { FC } from 'react'
import { Ad } from '../../Redux/adsSlice'
import moment from 'moment'
import CardB from 'react-bootstrap/Card'
import 'moment/locale/bg'

type Props = Omit<Ad, 'authorId' | 'terms'>

const Card: FC<Props> = ({ title, city, phone, info, district, price, date, id }) => {
  return (
    <CardB className='h-100' key={id}>
      <CardB.Body className='d-flex flex-column'>
        <CardB.Title>{title}</CardB.Title>
        {info && <CardB.Text className='flex-grow-1'>{info}</CardB.Text>}
        <span className='text-success font-weight-bold'>{price} лв.</span>
        <div title='рейтинг на подателя'>
          
        </div>
      </CardB.Body>
      <CardB.Footer>
        <small className='text-muted'>за {moment(date).locale('bg').format('L')}</small>
        <br />
        <small className='text-muted'>
          {city}, {district}
        </small>
        <br />
        <span>{phone}</span>
      </CardB.Footer>
    </CardB>
  )
}

export default Card
