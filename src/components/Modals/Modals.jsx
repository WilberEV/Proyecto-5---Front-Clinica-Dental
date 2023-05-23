import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Modal from "react-bootstrap/Modal";
import './Modals.css'
import { useNavigate } from "react-router-dom";
import { getTreatment } from "../../services/apiCalls";

export const Modals = (props) => {

  const [details, setDetails] = useState({
    name: '',
    description: ''
  })

  const [show, setShow] = useState(false);

  const navigate = useNavigate()

  useEffect(() => {
    getTreatment('Orthodontics')
      .then((results) => {
        setDetails(results.data);
      })
      .catch((error) => console.log(error));
  }, [details])

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div className="modalButton" onClick={()=> handleShow()}>Details</div>


      {details !== '' && (
        <div>
          {details.name !== "" ? (
            <div>
              {details.map((data) => {
                return (
                  <div key={data._id}>

                    <Modal show={show} onHide={handleClose} centered>
                    <Modal.Header closeButton>
                      <Modal.Title id="contained-modal-title-vcenter">
                      {data.name}
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="show-grid" id="modalBody">
                      <Container>
                        <Row>
                          <Col lg={12} xs={12} md={8}>
                            {data.description}
                          </Col>
                          </Row>
                      </Container>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button onClick={() => navigate("/appointments")}>Create an Appointment</Button>
                    </Modal.Footer>
                    </Modal>



                  </div>
                );
              })}
            </div>
          ) : (
            <div>CARGANDO</div>
          )}
        </div>
      )}



    </>
  );
};