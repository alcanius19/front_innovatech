/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/prop-types */
import React, { Fragment, useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, CardGroup, Row, Col, Container, Modal } from "react-bootstrap";
import { UPDATE_PROYECTO_USUARIO, INSCRIPCION } from "./graphql/mutations";
import useAutenticarContexto from "../ganchos/useAutenticar";
//hola
import useMensajes from "../ganchos/useMensajes";
import ContenedorMensajes from "../../utilidades/contenedor_mensajes";
import { IPROYECTO, IUSUARIO } from "../Interfaces/Interfaces_proyecto";
import { PROYECTOS_USUARIO, LISTAR_AVANCES } from "./graphql/queries";

function ListaProyectosUsuario({
  proyectsUser,
}: {
  proyectsUser: IPROYECTO[];
}) {
  const [alerta, pila, setPila] = useMensajes();
  const [modalEditar, setModalEditar] = React.useState(false);
  const [updateEstado] = useMutation(UPDATE_PROYECTO_USUARIO);
  const { estadoAutenticacion } = useAutenticarContexto();
  const tipo_usuario = estadoAutenticacion.usuario._id;
  const proyectos = useQuery(PROYECTOS_USUARIO, {
    variables: { id_usuario: tipo_usuario },
  });
  const [estadoBotton, setEstadoBotton] = React.useState(false);
  const avances = useQuery(LISTAR_AVANCES);
  const [estado, setEstado] = React.useState(false);
  const [proyectoSelect, setProyectoSelect] = React.useState<IPROYECTO>(
    {} as IPROYECTO
  );
  const [id_proyecto, setIdProyecto] = React.useState("");
  const [id_usuario, setIdUsuario] = React.useState(tipo_usuario);
  const [createIns] = useMutation(INSCRIPCION);
  // funciones
  const seleccionarProyecto = (elemento: any, caso: any) => {
    setProyectoSelect(elemento);
    caso === "Editar" && setModalEditar(true);
  };

  const crearInscripcion = (e: any, id_lider: string) => {
    const lider_id = id_lider;
    createIns({
      variables: {
        id_usuario: tipo_usuario,
        id_proyecto: e,
        id_lider: lider_id,
      },
    }).then((e) => {
      if (e) {
        setEstadoBotton(true);
        const boton: HTMLButtonElement | null = document.getElementById(
          "btnEstado"
        ) as HTMLButtonElement;
        if (boton) {
          boton.disabled = true;
        }
      }
    });
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    // const { objetivo_especifico } = proyectoSelect.objetivo_especifico[0];
    setProyectoSelect((prevState: IPROYECTO) => ({
      ...prevState,
      [name]: value,
    }));
    console.log(proyectoSelect);
  };

  const editarProyecto = () => {
    updateEstado({
      variables: {
        _id: proyectoSelect._id,
        nombre_proyecto: proyectoSelect.nombre_proyecto,
        objetivo_general: proyectoSelect.objetivo_general,
        objetivo_especifico: proyectoSelect.objetivo_especifico,
        presupuesto: parseInt(proyectoSelect.presupuesto),
      },
    }).then((res) => {
      if (res) {
        alerta({
          titulo: "Proyecto .",
          mensaje: "Actualizado",
          tiempo: 0,
        });
        setEstado(true);
      }
    });
    setModalEditar(false);
  };

  useEffect(() => {
    if (estado) {
      proyectos.refetch();
      setEstado(false);
    }
  }, [estado]);

  if (proyectsUser == null) return null;
  return (
    <Fragment>
      <h2>PROYECTOS</h2>
      {/* recorro los argumentos que le llegen a la propiedad */}
      <ContenedorMensajes pila={pila} setPila={setPila} />;
      <Container className="container-fluid ">
        <CardGroup>
          {proyectsUser.map((p: IPROYECTO, i: number) => (
            <Row key={i} className="p-4 d-flex justify-content-center">
              {/* {p.estado === "inactivo" && ( */}
              <Col>
                <Card>
                  <Card.Body>
                    <Card.Title>{p.nombre_proyecto}</Card.Title>
                    <Card.Text>
                      <span>obje general : {p.objetivo_general}</span>
                      <br />
                      <span> obje especifico: {p.objetivo_especifico}</span>
                      <br />
                      <span> presupuesto: {p.presupuesto}</span>
                    </Card.Text>
                  </Card.Body>
                  <Card.Footer>
                    {(() => {
                      if (
                        p.estado == "activo" &&
                        estadoAutenticacion.usuario.tipo_usuario == "líder"
                      )
                        return (
                          <>
                            <button
                              className="btn btn-warning"
                              onClick={() => {
                                seleccionarProyecto(p, "Editar");
                              }}
                            >
                              Editar
                            </button>
                          </>
                        );
                      if (
                        p.estado == "activo" &&
                        estadoAutenticacion.usuario.tipo_usuario == "estudiante"
                      )
                        return (
                          <>
                            {p.id_usuario.map(
                              (_idUsuario: IUSUARIO, index: number) => (
                                <button
                                  key={index}
                                  id="btnEstado"
                                  className="btn btn-primary"
                                  value={p._id}
                                  onClick={(evt: any) =>
                                    crearInscripcion(
                                      evt.target.value,
                                      _idUsuario._id
                                    )
                                  }
                                >
                                  Inscribirse
                                </button>
                              )
                            )}
                          </>
                        );
                    })()}
                  </Card.Footer>
                </Card>
              </Col>
              {/* )} */}
            </Row>
          ))}
        </CardGroup>

        <Modal show={modalEditar}>
          <Modal.Header>
            <Modal.Title>Editar Producto</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="form-group">
              <label>ID</label>
              <input
                className="form-control"
                readOnly
                type="text"
                name="_id"
                value={proyectoSelect && proyectoSelect._id}
                onChange={handleChange}
              />
              <br />

              <label>Nombre Proyecto</label>
              <input
                className="form-control"
                type="text"
                name="nombre_proyecto"
                value={proyectoSelect && proyectoSelect.nombre_proyecto}
                onChange={handleChange}
              />
              <br />
              <label>Objetivo General</label>
              <input
                className="form-control"
                type="text"
                name="objetivo_general"
                value={proyectoSelect && proyectoSelect.objetivo_general}
                onChange={handleChange}
              />
              <br />
              <label>Nombre Proyecto</label>
              <input
                className="form-control"
                type="text"
                name="objetivo_especifico"
                value={proyectoSelect && proyectoSelect.objetivo_especifico}
                onChange={handleChange}
              />
              <br />
              <label>Nombre Proyecto</label>
              <input
                className="form-control"
                type="number"
                name="presupuesto"
                value={proyectoSelect && proyectoSelect.presupuesto}
                onChange={handleChange}
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
            <button
              className="btn btn-primary"
              onClick={() => editarProyecto()}
            >
              Editar
            </button>
          </Modal.Footer>
        </Modal>
      </Container>
    </Fragment>
  );
}

export default ListaProyectosUsuario;
