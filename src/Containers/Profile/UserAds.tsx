import React, { FC } from 'react'
import { animated } from 'react-spring'
import Container from 'react-bootstrap/Container'
import { Ad } from '../../Redux/adsSlice'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import moment from 'moment'
import 'moment/locale/bg'
import { useFadeIn } from '../../utils/utils'

type Props = {
  ads: null | Ad[]
  onDelete: (adId: string) => void
}

const createCard = (ad: Ad, onDelete: (adId: string) => void) => {
  return (
    <Card className="h-100">
      <Card.Body className="d-flex flex-column">
        <Card.Title>{ad.title}</Card.Title>
        {ad.info && <Card.Text className="flex-grow-1">{ad.info}</Card.Text>}
        <span className="text-success font-weight-bold">{ad.price} лв.</span>
      </Card.Body>
      <Card.Footer>
        <small className="text-muted">за {moment(ad.date).locale('bg').format('L')}</small>
        <br />
        <small className="text-muted">
          {ad.city}, {ad.district}
        </small>
        <br />
        <Button
          variant="outline-danger"
          size="sm"
          block
          className="mt-3"
          onClick={() => onDelete(ad.id)}
        >
          Изтрий
        </Button>
      </Card.Footer>
    </Card>
  )
}

const UserAds: FC<Props> = ({ ads, onDelete }) => {
  const fadeIn = useFadeIn()
  return (
    <Container fluid="xl" className="pt-2 flex-grow-1">
      <animated.div style={fadeIn}>
        <Row>
          {ads && ads.length > 0 ? (
            ads.map((ad, index) => (
              <Col sm={12} md={6} lg={4} className="mb-4" key={ad.id || index}>
                {createCard(ad, onDelete)}
              </Col>
            ))
          ) : (
            <h4>Вие още нямате обяви</h4>
          )}
        </Row>
      </animated.div>
    </Container>
  )
}

export default UserAds
