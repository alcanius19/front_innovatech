import React, { Fragment, useEffect, useState } from "react";
import { Card, CardGroup, Row, Col, Container, Modal } from "react-bootstrap";
import ContenedorMensajes from "../../utilidades/contenedor_mensajes";
import { I_INSCRIPCION } from "../Interfaces/Interfaces_inscripcion";
import { useMutation, useQuery } from "@apollo/client";
import { INSCRIPCIONES_LIDER } from "./graphql/queries";
import useAutenticarContexto from "../ganchos/useAutenticar";
import { ACTUALIZAR_ESTADO } from "./graphql/mutations";

function ListaInscripciones() {
  const [modalEditar, setModalEditar] = React.useState(false);
  const { estadoAutenticacion } = useAutenticarContexto();
  const [estado, setEstado] = React.useState(false);
  const consulta = useQuery(INSCRIPCIONES_LIDER, {
    variables: { _idL: estadoAutenticacion.usuario._id },
  });
  const [updateEstado] = useMutation(ACTUALIZAR_ESTADO);
  const [inscripcionSelect, setInscripcionSelect] =
    React.useState<I_INSCRIPCION>({} as I_INSCRIPCION);
  console.log(consulta.data?.inscripcionesTodoPorIDLider);

  const seleccionarInscripcion = (elemento: any, caso: any) => {
    setInscripcionSelect(elemento);
    caso === "Editar" && setModalEditar(true);
  };
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    // const { objetivo_especifico } = proyectoSelect.objetivo_especifico[0];
    setInscripcionSelect((prevState: I_INSCRIPCION) => ({
      ...prevState,
      [name]: value,
    }));
    console.log(inscripcionSelect);
  };

  const editarProyecto = () => {
    updateEstado({
      variables: {
        _id: inscripcionSelect._id,
        estado: inscripcionSelect.estado,
      },
    }).then((res) => {
      if (res) {
        setEstado(true);
      }
    });
    setModalEditar(false);
  };
  return (
    <Fragment>
      <h2>LISTA INSCRIPCIONES</h2>
      {/* recorro los argumentos que le llegen a la propiedad */}

      <Container className="container-fluid ">
        <CardGroup>
          {consulta.data?.inscripcionesTodoPorIDLider.map(
            (p: I_INSCRIPCION, i: number) => (
              <Row key={i} className="p-4 d-flex justify-content-center">
                {/* {p.estado === "inactivo" && ( */}
                <Col>
                  <Card>
                    <Card.Body>
                      <Card.Text>
                        <span key={i}>{p.id_proyecto.nombre_proyecto}</span>
                      </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                      <button
                        className="btn btn-warning"
                        onClick={() => {
                          seleccionarInscripcion(p, "Editar");
                        }}
                      >
                        Editar
                      </button>
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
            <Modal.Title>Editar Proyecto</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="form-group">
              <label>Estado</label>
              <input
                className="form-control"
                type="text"
                name="estado"
                value={inscripcionSelect && inscripcionSelect.estado}
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

export default ListaInscripciones;
