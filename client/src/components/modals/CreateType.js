import React, { useState } from 'react';
import Modal from "react-bootstrap/Modal"
import {Form, Button} from "react-bootstrap";
import { createType } from '../../http/deviceAPI';

const CreateType = ({show, onHide}) => {
    const [value, setValue] = useState('') // оживляем Placeholder передавая ему состояние
   
    const addType = () => {
      createType({name: value}).then(data => { //обнуляем value
          setValue('') // обнуляем
          onHide() // закрываем
      })
  }

    return (
        <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Добавить тип
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
            <Form>
                <Form.Control
                    value={value}
                    onChange={e => setValue(e.target.value)} //слушатель изменяет то что находится в input
                    placeholder={"Введите название типа"}
                />
            </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
        <Button onClick={addType}>Add</Button>
      </Modal.Footer>
    </Modal>
    );
};

export default CreateType;