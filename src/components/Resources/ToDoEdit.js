import React from 'react'
import { ModalBody } from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal'
import ResourceForm from './ResourceForm'

export default function ToDoEdit(props) {
  return (
    <Modal
      show={props.showEdit}
      onHide={() => props.setShowEdit(false)}
      size='lg'>
        <Modal.Header closeButton>
          <h2>Editing {props.resource.name}</h2>
        </Modal.Header>
        <Modal.Body>
          <ResourceForm
            getResources={props.getResources}
            setShowEdit={props.setShowEdit}
            resource={props.resource}/>
        </Modal.Body>
    </Modal>
  )
}
