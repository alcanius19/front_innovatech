import React, { useState, useRef } from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import Modal, { RenderModalBackdropProps } from "react-overlays/Modal";
import styled from "styled-components";
import PropTypes from "prop-types";
import { v4 } from "uuid";
import { IPropsFormulario } from "../Interfaces/Interfaces";
import useAutenticarContexto from "../../ganchos/useAutenticar";

const Backdrop = styled("div")`
  position: absolute;
  z-index: 2000;
  display: flex;
  justify-content: center;
  align-items: center;
  right: 0;
  top: 0;
  left: 0;
  bottom: 0;
  background-color: #0edc8d;
  opacity: 0.3;
`;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const OverlayCargando = styled(Modal)`
  position: absolute;
  z-index: 2020;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
  opacity: 1;
`;

const renderBackdrop = (props: RenderModalBackdropProps) => (
  <Backdrop {...props} />
);
const FormularioEliminarUsuarios = ({
  formulario,
}: {
  formulario: IPropsFormulario;
}) => {
  const [cargando, setCargando] = useState(false);
  const contenedor = useRef(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { estadoAutenticacion } = useAutenticarContexto();

  const manejarEliminarUsuario = async () => {
    setCargando(true);
    setTimeout(async () => {
      formulario.cerrarForm();
      setCargando(false);
    }, 2000);
  };
  return (
    <Form className="Eliminar" ref={contenedor}>
      <Form.Group className="mb-1" controlId="formEliminar">
        <Form.Label>{formulario.mensaje}</Form.Label>
        {formulario?.textoOpcion && (
          <>
            <div className="clearfix"></div>
            <Form.Text className="text-muted text-dark">
              {formulario.textoOpcion}
            </Form.Text>
          </>
        )}
      </Form.Group>
      <div className={"d-flex justify-content-center mt-3"}>
        <Button
          variant={"outline-success"}
          key={v4()}
          onClick={() => manejarEliminarUsuario()}
        >
          Eliminar Usuarios
        </Button>
      </div>
      <OverlayCargando
        show={cargando}
        onHide={() => setCargando(false)}
        renderBackdrop={renderBackdrop}
        aria-labelledby="modal-label"
        className="overlayLogin"
        container={contenedor.current}
      >
        <Spinner animation="grow" variant="dark" role="status">
          <span className="visually-hidden">Cargando...</span>
        </Spinner>
      </OverlayCargando>
    </Form>
  );
};
FormularioEliminarUsuarios.propTypes = {
  formulario: PropTypes.object.isRequired,
};

export default FormularioEliminarUsuarios;
