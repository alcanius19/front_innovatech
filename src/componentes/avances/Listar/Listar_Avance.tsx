import * as React from "react";
import { LIST_AVANCES } from "../graphql/queries";
import { useQuery } from "@apollo/client";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import { IAvance, Iobservacion } from "../../Interfaces/interfacesAvance";
import "../../avances/components.css";

const Listar_Avance = () => {
  const listar_avances = useQuery(LIST_AVANCES);
  useEffect(() => {
    console.log(listar_avances.data);
  }, [listar_avances]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleDelete = (_id: string) => {
    console.log("delete");
  };

  return (
    <>
      {listar_avances.loading && <p>Cargando ...</p>}
      {listar_avances.error && <p>Se ha producido un error</p>}
      {listar_avances.data && (
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Id Avance</th>
              <th scope="col">Id Usuario</th>
              <th scope="col">Fecha Avance</th>
              <th scope="col">Descripcion</th>
              <th scope="col">Observacion</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {listar_avances.data?.listarAvances.map(
              (avance: IAvance, index: number) => (
                <tr key={index}>
                  <td scope="row">{index + 1}</td>
                  <td>{avance._id}</td>
                  <td>{avance.id_usuario}</td>
                  <td>{avance.fecha_avances}</td>
                  <td>{avance.descripcion}</td>
                  <td>
                    <ul>
                      {Object.values(avance.observacion).map(
                        (_observacion: Iobservacion, i: number) => (
                          <li key={i}>
                            <span>
                              {_observacion.observacion}:
                              {_observacion.fecha_observacion}
                            </span>
                          </li>
                        )
                      )}
                    </ul>
                  </td>

                  <td>
                    <NavLink
                      className="btn btn-primary mr"
                      to={`/avances/${avance._id}`}
                    >
                      Editar
                    </NavLink>
                    <button
                      type="button"
                      className="btn btn btn-danger mr-3"
                      data-prueba="data de pruebas"
                      onClick={() => handleDelete(avance._id)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      )}
    </>
  );
};

export default Listar_Avance;
