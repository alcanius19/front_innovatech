import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { Toast } from "react-bootstrap";

const Mensaje = ({ alerta, onCerrar, orden }) => {
  const renderInicial = useRef(true);
  const estaMontadoRef = useRef(null);
  const [mostrar, setMostrar] = useState(true);

  useEffect(() => {
    estaMontadoRef.current = true;
    if (renderInicial.current) {
      renderInicial.current = false;
    } else {
      if (estaMontadoRef.current) {
        onCerrar();
      }
    }
    return () => {
      estaMontadoRef.current = false;
    };
  }, [mostrar]);

  return (
    <Toast
      show={mostrar}
      onClose={() => {
        setMostrar(false);
      }}
      bg="dark"
      delay={3000}
      className={`order-${orden} mb-2`}
      autohide
    >
      <Toast.Header>
        <svg
          className="bd-placeholder-img rounded me-2"
          width="20"
          height="20"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          preserveAspectRatio="xMidYMid slice"
          focusable="false"
        >
          <rect width="100%" height="100%" fill="#007aff" />
        </svg>
        <strong className="me-auto">{alerta.titulo}</strong>
        <small className="text-muted">{alerta.tiempo}</small>
      </Toast.Header>
      <Toast.Body className={"text-white"}>{alerta.mensaje}</Toast.Body>
    </Toast>
  );
};

Mensaje.propTypes = {
  alerta: PropTypes.object.isRequired,
  onCerrar: PropTypes.func.isRequired,
  orden: PropTypes.number.isRequired,
};

export default Mensaje;
