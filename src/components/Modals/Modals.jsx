import react, { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Modal from "react-bootstrap/Modal";

export const Modals = (props) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div className="loginButtonDesign" onClick={()=> handleShow()}>Login!</div>

      <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Your appointment details
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="show-grid" id="modalBody">
        <Container>
          <Row>
            <Col lg={12} xs={12} md={8}>
              Nombre: nombre falso
            </Col>
            </Row>
            <Row>
            <Col lg={12} xs={12} md={4}>
              Doctor: no tiene licencia
            </Col>
          </Row>

          <Row>
            <Col lg={12} xs={12} md={4}>
              Fecha: ( ͡° ͜ʖ ͡°)
            </Col>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
      </Modal>
    </>
  );
};