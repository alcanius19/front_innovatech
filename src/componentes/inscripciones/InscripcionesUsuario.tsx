/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Fragment, useEffect, useState } from "react";
import { Card, CardGroup, Row, Col, Container, Modal } from "react-bootstrap";
import ContenedorMensajes from "../../utilidades/contenedor_mensajes";
import { Iusuario, I_INSCRIPCION } from "../Interfaces/Interfaces_inscripcion";
import { IAvance } from "../Interfaces/interfacesAvance";
import { useMutation, useQuery } from "@apollo/client";
import { INSCRIPCIONES_USUARIO } from "./graphql/queries";
import useAutenticarContexto from "../ganchos/useAutenticar";
import { ACTUALIZAR_ESTADO, CREAR_AVANCE } from "./graphql/mutations";

function InscripcionesUsuario() {
  const [modalEditar, setModalEditar] = React.useState(false);
  const { estadoAutenticacion } = useAutenticarContexto();
  const [estado, setEstado] = React.useState(false);
  const [id_proyecto1, setIdProyecto] = React.useState("");
  const [descripcion1, setDescripcion] = React.useState("");
  const [addAvance] = useMutation(CREAR_AVANCE);
  const consulta = useQuery(INSCRIPCIONES_USUARIO, {
    variables: { _id: estadoAutenticacion.usuario._id },
  });
  console.log("usuario iD", estadoAutenticacion.usuario._id);
  const [updateEstado] = useMutation(ACTUALIZAR_ESTADO);
  const [inscripcionSelect, setInscripcionSelect] =
    React.useState<I_INSCRIPCION>({} as I_INSCRIPCION);
  console.log("respuesta consulta ", consulta.data?.inscripcionesPorIDUsuario);

  const seleccionarInscripcion = (elemento: I_INSCRIPCION, caso: any) => {
    setInscripcionSelect(elemento);
    caso === "Editar" && setModalEditar(true);
  };
  console.group("inscripciones");
  console.log(inscripcionSelect._id);
  console.groupEnd();
  // const handleChange = (e: any) => {
  //   const { name, value } = e.target;
  //   // const { objetivo_especifico } = proyectoSelect.objetivo_especifico[0];
  //   setInscripcionSelect((prevState: I_INSCRIPCION) => ({
  //     ...prevState,
  //     [name]: value,
  //   }));
  //   console.log(inscripcionSelect);
  // };
  console.log("id_proyecto : ", id_proyecto1);
  const crearAvance = () => {
    addAvance({
      variables: {
        id_proyecto: inscripcionSelect._id,
        id_usuario: estadoAutenticacion.usuario._id,
        descripcion: descripcion1,
      },
    }).then((res) => {
      if (res) {
        setEstado(true);
      }
    });
    setModalEditar(false);
  };
  useEffect(() => {
    consulta.data;
  });
  return (
    <Fragment>
      <h2>LISTA AVANACES</h2>
      {/* recorro los argumentos que le llegen a la propiedad */}

      <Container className="container-fluid ">
        <CardGroup>
          {consulta.data?.inscripcionesPorIDUsuario.map(
            (p: I_INSCRIPCION, i: number) => (
              <Row key={i} className="p-4 d-flex justify-content-center">
                {/* {p.estado === "inactivo" && ( */}
                <Col>
                  <Card>
                    <Card.Body>
                      <Card.Text>
                        <span key={i}>
                          nombre: {p.id_proyecto.nombre_proyecto}
                        </span>
                      </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                      {(() => {
                        if (p.estado != "Pendiente")
                          return (
                            <button
                              className="btn btn-warning"
                              onClick={() => {
                                seleccionarInscripcion(p, "Editar");
                              }}
                            >
                              Crear Avance
                            </button>
                          );
                      })()}
                    </Card.Footer>
                  </Card>
                </Col>
                {/* )} */}
              </Row>
            )
          )}
        </CardGroup>

        <Modal show={modalEditar}>
          <Modal.Header>
            <Modal.Title>Crear Avance</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="form-group">
              <label>Crear Descripcion</label>
              <input
                className="form-control"
                type="text"
                name="descripcion"
                value={descripcion1}
                onChange={(evt) => setDescripcion(evt.target.value)}
              />
              <br />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button
              className="btn btn-danger"
              onClick={() => setModalEditar(false)}
            >
              Cancelar
            </button>
            <button className="btn btn-primary" onClick={() => crearAvance()}>
              Crear
            </button>
          </Modal.Footer>
        </Modal>
      </Container>
    </Fragment>
  );
}

export default InscripcionesUsuario;
