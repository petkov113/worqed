import React, { useState } from 'react'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import Modal from '../Modal/Modal'
import { Button } from 'react-bootstrap'

export const termsContent = `Ipsum molestiae natus adipisci modi eligendi? Debitis amet quae unde commodi aspernatur
enim, consectetur. Cumque deleniti temporibus ipsam atque a dolores quisquam quisquam
adipisci possimus laboriosam. Quibusdam facilis doloribus debitis! Sit quasi quod
accusamus eos quod. Ab quos consequuntur eaque quo rem! Mollitia reiciendis porro quo
magni incidunt dolore amet atque facilis ipsum deleniti rem!`
const contactsContent = 'email: p.petkov@bk.ru'

const Footer = () => {
  const [modal, setModal] = useState(false)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const handleTermsClick = () => {
    setTitle('Общи Условия и Политика за поверителност')
    setContent(termsContent)
    setModal(true)
  }

  const handleContactsClick = () => {
    setTitle('Контакти')
    setContent(contactsContent)
    setModal(true)
  }

  return (
    <>
      <Modal title={title} show={modal} onClose={() => setModal(false)} content={content} />
      <Container fluid='xl' className='pt-5'>
        <hr />
        <Nav className='justify-content-center'>
          <Nav.Item>
            <Button variant='link' onClick={handleTermsClick}>
              Общи Условия и Политика за поверителност
            </Button>
          </Nav.Item>
          <Nav.Item>
            <Button variant='link' onClick={handleContactsClick}>
              Контакти
            </Button>
          </Nav.Item>
        </Nav>
        <p className='text-center mt-4 mb-4'>2020. All rights reserved</p>
      </Container>
    </>
  )
}

export default Footer