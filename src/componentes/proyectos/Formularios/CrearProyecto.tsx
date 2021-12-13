import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import Switch from "react-switch";
import Select from "react-select";
import { CREAR_PROYECTO } from "../graphql/mutations";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import useAutenticarContexto from "../../ganchos/useAutenticar";
import useMensajes from "../../ganchos/useMensajes";
import ContenedorMensajes from "../../../utilidades/contenedor_mensajes";

function CrearProyecto() {
  const { estadoAutenticacion } = useAutenticarContexto();
  const tipo_usuario = estadoAutenticacion.usuario.tipo_usuario;
  const [alerta, pila, setPila] = useMensajes();
  const [estado, setestado] = React.useState(false);
  const [nombre_proyecto, setNombre] = useState("");
  const [presupuesto, setPresupuesto] = useState(0);
  const [objetivo_general, setObjGeneral] = useState("");
  const [objetivo_especifico, setObjEspecifico] = useState("");
  const [createProyect] = useMutation(CREAR_PROYECTO);

  const options = [
    { value: "iniciado", label: "INICIADO", disabled: true },
    { value: "desarrollo", label: "DESARROLLO", disabled: true },
    { value: "terminado", label: "TERMINADO", disabled: true },
  ];

  const handleSubmit = (e: any) => {
    e.preventDefault();

    console.log(typeof presupuesto);
    createProyect({
      variables: {
        nombre_proyecto,
        presupuesto,
        objetivo_general,
        objetivo_especifico,
      },
    }).then((res) => {
      if (res) {
        alerta({
          titulo: "Bienvenido desde Proyectos.",
          mensaje: "Prueba Mensaje",
          tiempo: 0,
        });
      }
    });

    setNombre("");
    setPresupuesto(0);
    setObjGeneral("");
    setObjEspecifico("");
    console.log(nombre_proyecto);
  };

  const handleChange = () => {
    setestado(estado);
  };

  return (
    <div>
      <ContenedorMensajes pila={pila} setPila={setPila} />
      {tipo_usuario != "administrador" ? (
        <Container className="container-fluid mt-4">
          <Row>
            <h1>Crear Proyecto Lider</h1>
          </Row>
          <Form onSubmit={handleSubmit}>
            <Row className="p-2">
              <Col>
                <label>Nombre Proyecto</label>
                <Form.Control
                  placeholder="Nombre Proyecto"
                  value={nombre_proyecto}
                  onChange={(evt) => setNombre(evt.target.value)}
                />
              </Col>
              <Col>
                <label>Presupuesto</label>
                <Form.Control
                  placeholder="presupuesto"
                  value={presupuesto}
                  type="number"
                  onChange={(evt) => setPresupuesto(parseInt(evt.target.value))}
                />
              </Col>
            </Row>
            <Row className="p-2">
              <Col>
                <label>Fase Proyecto</label>
                <Select
                  options={options}
                  isOptionDisabled={(option) => option.disabled}
                />
              </Col>
              <Col>
                <label>Objetivo General</label>
                <Form.Control
                  placeholder="Objetivo General"
                  value={objetivo_general}
                  onChange={(evt) => setObjGeneral(evt.target.value)}
                />
              </Col>
            </Row>
            <Row className="p-2">
              <Col>
                <label>Objetivos Especificos</label>
                <Form.Control
                  placeholder="Objetivos Especificos"
                  value={objetivo_especifico}
                  onChange={(evt) => setObjEspecifico(evt.target.value)}
                />
              </Col>
              <Col>
                <label>Fecha Inicio</label>
                <Form.Control placeholder="fecha Inicio" type="date" readOnly />
              </Col>
            </Row>
            <Row className="p-2">
              <Col>
                <label>Estado</label>
                <Switch checked={estado} onChange={handleChange} />
              </Col>
              <Col>
                <label>Fecha Terminacion</label>
                <Form.Control
                  placeholder="Fecha Terminacion"
                  type="date"
                  readOnly
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Button type="submit">Guardar</Button>
              </Col>
              <Col></Col>
            </Row>
          </Form>
        </Container>
      ) : (
        <h2>Valido Para Lider</h2>
      )}
    </div>
  );
}

export default CrearProyecto;
