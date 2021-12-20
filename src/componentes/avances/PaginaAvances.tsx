import * as React from "react";
import useMensajes from "../ganchos/useMensajes";
import ContenedorMensajes from "../../utilidades/contenedor_mensajes";
import { useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import CrearAvance from "./Crear/CrearAvance";
import Listar_Avance from "./Listar/Listar_Avance";
import ActualizarAvance from "./Actualizar/ActualizarAvance";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import Listar_Avances_por_Id from "./Listar/Listar_Avances_por_Id";
import { LISTAR_AVANCES_LIDER } from "./graphql/queries";
import useAutenticarContexto from "../ganchos/useAutenticar";
import { useQuery } from "@apollo/client";

const Avances = () => {
  const { action } = useParams();
  const { estadoAutenticacion } = useAutenticarContexto();
  const consultaUser = useQuery(LISTAR_AVANCES_LIDER, {
    variables: { id_usuario: estadoAutenticacion.usuario._id },
  });
  console.log("avancesUsuario", consultaUser.data);
  const [alerta, pila, setPila] = useMensajes();
  useEffect(() => {
    alerta({
      titulo: "Bienvenido desde Inscripciones.",
      mensaje: "Prueba Mensaje",
      tiempo: 0,
    });
  }, []);
  return (
    <section className="area-inscripciones">
      <ContenedorMensajes pila={pila} setPila={setPila} />
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            <div className="card card-primary card-outline">
              <div className="card-header flex">
                <h5 className="m-0">Avances</h5>
                {action === "crear" ? (
                  <NavLink className="btn btn-danger mr-3" to={`/avances`}>
                    Cancelar
                  </NavLink>
                ) : (
                  <NavLink
                    className="btn btn-primary mr-3"
                    to={`/avances/crear`}
                  >
                    Crear Avance
                  </NavLink>
                )}
              </div>
              {/* el card body es el contenido */}
              <div className="card-body">
                {action === "" || action === undefined ? (
                  <Listar_Avance />
                ) : action === "crear" ? (
                  <CrearAvance />
                ) : (
                  <ActualizarAvance />
                )}
              </div>
              <Listar_Avances_por_Id
                proyectsUser={consultaUser.data?.listarAvancesPorTipo_usuario}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Avances;
