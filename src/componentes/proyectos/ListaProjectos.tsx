/* eslint-disable react/prop-types */
import React, { Fragment, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, CardGroup, Row, Col, Container, Modal } from "react-bootstrap";
import { ACTUALIZAR_ESTADO } from "./graphql/mutations";
import useAutenticarContexto from "../ganchos/useAutenticar";
import { useMutation } from "@apollo/client";
import useMensajes from "../ganchos/useMensajes";
import ContenedorMensajes from "../../utilidades/contenedor_mensajes";
import { IPROYECTO } from "../Interfaces/Interfaces_proyecto";
import { LIST_PROYECTS } from "./graphql/queries";
import { useQuery } from "@apollo/client";
// eslint-disable-next-line react/prop-types
function ListaProyectos({ proyects }: { proyects: IPROYECTO[] }) {
  const [alerta, pila, setPila] = useMensajes();
  const [modalEditar, setModalEditar] = React.useState(false);
  const [proyect, setProyect] = useState(null);
  const [updateEstado] = useMutation(ACTUALIZAR_ESTADO);
  const proyectos = useQuery(LIST_PROYECTS);
  const [estado, setEstado] = React.useState(false);
  const [proyectoSelect, setProyectoSelect] = React.useState<IPROYECTO>(
    {} as IPROYECTO
  );

  const seleccionarProyecto = (elemento: any, caso: any) => {
    setProyectoSelect(elemento);
    caso === "Editar" && setModalEditar(true);
  };

  // trae los datos al modal
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
        estado: proyectoSelect.estado,
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

  if (proyects == null) return null;
  const { estadoAutenticacion } = useAutenticarContexto();
  const tipo_usuario = estadoAutenticacion.usuario.tipo_usuario;
  return (
    <Fragment>
      <h2>PROYECTOS</h2>
      {/* recorro los argumentos que le llegen a la propiedad */}
      <ContenedorMensajes pila={pila} setPila={setPila} />;
      <Container className="container-fluid ">
        <CardGroup>
          {proyects.map((p: IPROYECTO, i: number) => (
            <Row key={i} className="p-4 d-flex justify-content-center">
              {/* {p.estado === "inactivo" && ( */}
              <Col>
                <Card>
                  <Card.Body>
                    <Card.Title>{p.nombre_proyecto}</Card.Title>
                    <Card.Text>
                      <span>obje general : {p.objetivo_general}</span>
                      <br />
                      <span> estado: {p.estado}</span>
                      <br />
                      <span> fase: {p.fase_proyecto}</span>
                    </Card.Text>
                  </Card.Body>
                  <Card.Footer>
                    <button
                      className="btn btn-warning"
                      onClick={() => {
                        seleccionarProyecto(p, "Editar");
                      }}
                    >
                      Editar
                    </button>
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

              <label>Actualizar Estado</label>
              <input
                className="form-control"
                type="text"
                name="estado"
                value={proyectoSelect && proyectoSelect.estado}
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

export default ListaProyectos;
