import Accordion from 'react-bootstrap/Accordion'
import Container from 'react-bootstrap/Container'
import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import AccordionCard from '../AccordionCard/AccordionCard'

export const Questions = () => {
  return (
    <Container fluid='xl' className='pt-3'>
      <h5 className='mb-3'>Въпроси и отговори</h5>
      <Row>
        <Col>
          <Accordion>
            <AccordionCard
              title='По какъв принцип работи сайтът?'
              text='Вие публикувате обява и чакате някой майстор да се свърже с Вас.'
              eventKey='0'
            />
            <AccordionCard
              title='Как ще се свържат с мен?'
              text='Всичката комуникация между Вас и майстора я осъществявате чрез телефон. Сайтът
                  няма лични съообщения, тъй като те могат да съдържат лична информация, а ние
                  сериозно се отнасяме до Вашата безопасност и не събираме почти никакви лични данни'
              eventKey='1'
            />
            <AccordionCard
              title='Трябва ли да се регистрирам?'
              text='Регистрацията не е задължителна, но е необходима, ако искате да имате възможност
                  да изтривате публикуваните обяви. Иначе те ще се изтирват автоматично след датата, която сте установили.'
              eventKey='2'
            />
            <AccordionCard
              title='Трябва ли да плащам?'
              text='Сайтът е напълно безплатен, но цената на услугите я уговяряте с майстора'
              eventKey='3'
            />
            <AccordionCard
              title='Какви са предимствата на сайта?'
              text='Сайтът не събира никакви лични данни освен телефон, което значи, че Вие сте
                  напълно анонимни.'
              eventKey='4'
            />
          </Accordion>
        </Col>
      </Row>
    </Container>
  )
}
