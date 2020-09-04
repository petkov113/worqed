import React, { FC } from 'react'
import ModalWindow from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { useHistory } from 'react-router-dom'

type Props = {
  title: string
  show: boolean
  content: string
  backButton?: boolean
  onClose: () => void
}

const Modal: FC<Props> = ({ title, show, onClose, content, backButton }) => {
  const history = useHistory()

  return (
    <ModalWindow
      size='lg'
      show={show}
      onHide={onClose}
      dialogClassName='modal-120w'
      aria-labelledby='example-custom-modal-styling-title'>
      <ModalWindow.Header closeButton>
        <ModalWindow.Title>{title}</ModalWindow.Title>
      </ModalWindow.Header>
      <ModalWindow.Body>
        <p>{content}</p>
      </ModalWindow.Body>
      {backButton && (
        <ModalWindow.Footer>
          <Button variant='primary' onClick={() => history.push('/')}>
            На главната
          </Button>
        </ModalWindow.Footer>
      )}
    </ModalWindow>
  )
}

export default Modal
