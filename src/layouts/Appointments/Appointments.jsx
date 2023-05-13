import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Appointments.css";
import { bringDentists } from "../../services/apiCalls";
import { useSelector } from "react-redux";
import { userData } from "../userSlice";

//Bootstrap
import Dropdown from "react-bootstrap/Dropdown";

export const Appointments = () => {
  const userRdxData = useSelector(userData);

  const [dentists, setDentists] = useState([]);
  const [orderInfo, setOrderInfo] = useState({
    customerId: userRdxData.credentials.user.id,
    professionalId: "",
  });

  useEffect(() => {
    if (dentists.length === 0) {
      bringDentists()
        .then((results) => {
          setDentists(results.data);
        })
        .catch((error) => console.log(error));
    }
  }, [dentists]);

  useEffect(() => {
    console.log(orderInfo);
  }, [orderInfo]);

  const dropHandler = (pro) => {
    setOrderInfo((prevState) => ({
      ...prevState,
      professionalId: pro._id,
    }));
  };

  return (
    <div className="appointmentsBody">
      <div>
        {dentists.length > 0 && (
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Dropdown Button
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {dentists.map((professional) => {
                return (
                  <Dropdown.Item
                    key={professional._id}
                    href="#/action-1"
                    onClick={() => dropHandler(professional)}
                  >
                    {professional.name}
                  </Dropdown.Item>
                );
              })}
            </Dropdown.Menu>
          </Dropdown>
        )}
      </div>
    </div>
  );
};
