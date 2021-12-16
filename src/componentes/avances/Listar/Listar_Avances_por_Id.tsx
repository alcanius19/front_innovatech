/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Fragment, useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, CardGroup, Row, Col, Container, Modal } from "react-bootstrap";
import { CREAR_AVANCE_POR_ID } from "../graphql/mutations";
import useAutenticarContexto from "../../ganchos/useAutenticar";
import useMensajes from "../../ganchos/useMensajes";
import ContenedorMensajes from "../../../utilidades/contenedor_mensajes";
import { IPROYECTO, IUSUARIO } from "../../Interfaces/Interfaces_proyecto";
//import { PROYECTOS_USUARIO, LISTAR_AVANCES } from "../graphql/queries";
import { IAvance } from "../../Interfaces/interfacesAvance";
function ListaProyectosUsuario({
  proyectsUser,
}: {
  proyectsUser: IPROYECTO[];
}) {
  const [alerta, pila, setPila] = useMensajes();
  const [modalEditar, setModalEditar] = React.useState(false);
  const { estadoAutenticacion } = useAutenticarContexto();
  const tipo_usuario = estadoAutenticacion.usuario._id;
  const [estadoBotton, setEstadoBotton] = React.useState(false);

  const [estado, setEstado] = React.useState(false);
  const [proyectoSelect, setProyectoSelect] = React.useState<IPROYECTO>(
    {} as IPROYECTO
  );
  const [id_proyecto, setIdProyecto] = React.useState("");
  const [id_usuario, setIdUsuario] = React.useState(tipo_usuario);

  // funciones
  const seleccionarProyecto = (elemento: any, caso: any) => {
    setProyectoSelect(elemento);
    caso === "Editar" && setModalEditar(true);
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

  //   const editarProyecto = () => {
  //     updateEstado({
  //       variables: {
  //         _id: proyectoSelect._id,
  //         nombre_proyecto: proyectoSelect.nombre_proyecto,
  //         objetivo_general: proyectoSelect.objetivo_general,
  //         objetivo_especifico: proyectoSelect.objetivo_especifico,
  //         presupuesto: parseInt(proyectoSelect.presupuesto),
  //       },
  //     }).then((res) => {
  //       if (res) {
  //         alerta({
  //           titulo: "Proyecto .",
  //           mensaje: "Actualizado",
  //           tiempo: 0,
  //         });
  //         setEstado(true);
  //       }
  //     });
  //     setModalEditar(false);
  //   };

  //   useEffect(() => {
  //     if (estado) {
  //       proyectos.refetch();
  //       setEstado(false);
  //     }
  //   }, [estado]);

  if (proyectsUser == null) return null;
  return (
    <Fragment>
      <h2>PROYECTOS</h2>
      {/* recorro los argumentos que le llegen a la propiedad */}
      <ContenedorMensajes pila={pila} setPila={setPila} />;
      <Container className="container-fluid ">
        <CardGroup>
          {proyectsUser.map((p: IAvance, i: number) => (
            <Row key={i} className="p-4 d-flex justify-content-center">
              {/* {p.estado === "inactivo" && ( */}
              <Col>
                <Card>
                  <Card.Body>
                    <Card.Title>{p.descripcion}</Card.Title>
                    <Card.Text>
                      <span> obje especifico: {p.fecha_avances}</span>
                      <br />
                      <span> presupuesto: {p.id_usuario}</span>
                    </Card.Text>
                  </Card.Body>
                  <Card.Footer>
                    {(() => {
                      if (
                        p.estado == "activo" &&
                        estadoAutenticacion.usuario.tipo_usuario == "lider"
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
                                  //   onClick={(evt: any) =>
                                  //     crearInscripcion(
                                  //       evt.target.value,
                                  //       _idUsuario._id
                                  //     )
                                  // }
                                >
                                  {estadoBotton == true
                                    ? "Inscrito"
                                    : "Incribirse"}
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
              // onClick={() => editarProyecto()}
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
