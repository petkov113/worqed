import React, { FC } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

type Props = {
  title: string
  show: boolean
  onClose: () => void
  onSubmit: () => void
}

const DialogModal: FC<Props> = ({ title, show, onClose, onSubmit }) => {
  return (
    <Modal show={show} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant='secondary' onClick={onClose}>
            Отказ
          </Button>
          <Button variant='primary' onClick={onSubmit}>
            Потвърди
          </Button>
        </Modal.Footer>
    </Modal>
  )
}

export default DialogModal
