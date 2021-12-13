import React, { Fragment, useState } from "react";
import PaginaProyectos from "../PaginaProyectos";

import { ACTUALIZAR_FASE } from "../graphql/mutations";
import useAutenticarContexto from "../../ganchos/useAutenticar";
import { useMutation } from "@apollo/client";
import { LIST_PROYECTS } from "../graphql/queries";
import { useQuery } from "@apollo/client";
import { Card, CardGroup, Row, Col, Container, Modal } from "react-bootstrap";
import { IPROYECTO } from "../../Interfaces/Interfaces_proyecto";
function ActualizarFase() {
  const [modalEditar, setModalEditar] = React.useState(false);
  const [proyect, setProyect] = useState(null);
  const [updateFase] = useMutation(ACTUALIZAR_FASE);
  const { data, loading, error } = useQuery(LIST_PROYECTS);
  if (error) return <span>{error}</span>;

  const [proyectoSelect, setProyectoSelect] = React.useState({} as IPROYECTO);

  const seleccionarProyecto = (elemento: IPROYECTO, caso: string) => {
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

  const editarProyecto = () => {
    updateFase({
      variables: {
        _id: proyectoSelect._id,
        fase_proyecto: proyectoSelect.fase_proyecto,
      },
    });
    setModalEditar(false);
  };

  if (data == null) return null;
  const { estadoAutenticacion } = useAutenticarContexto();
  const tipo_usuario = estadoAutenticacion.usuario.tipo_usuario;

  return (
    <Fragment>
      <h2>ACTUALIZAR FASE</h2>
      {/* recorro los argumentos que le llegen a la propiedad */}
      {tipo_usuario == "administrador" ? (
        <Container className="container-fluid ">
          <CardGroup>
            {data?.proyectos.map((p: IPROYECTO, i: number) => (
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

                <label>Actualizar Fase</label>
                <input
                  className="form-control"
                  type="text"
                  name="fase_proyecto"
                  value={proyectoSelect && proyectoSelect.fase_proyecto}
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
      ) : (
        <div>
          <h2>PAGINA NO ENCONTRADA ..</h2>
        </div>
      )}
    </Fragment>
  );
}

export default ActualizarFase;
