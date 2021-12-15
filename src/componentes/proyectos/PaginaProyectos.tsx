import * as React from "react";
import useMensajes from "../ganchos/useMensajes";
import ContenedorMensajes from "../../utilidades/contenedor_mensajes";
//import { useEffect } from "react";
import { useQuery } from "@apollo/client";
import ListaProyectos from "./ListaProjectos";
import { LIST_PROYECTS, PROYECTOS_USUARIO } from "./graphql/queries";
import useAutenticarContexto from "../ganchos/useAutenticar";
import ListaProyectosUsuario from "./ListaProyectosUsuario";
//import { type } from "os";
const Administracion = () => {
  const { estadoAutenticacion } = useAutenticarContexto();
  const tipo_usuario = estadoAutenticacion.usuario.tipo_usuario;
  const id = estadoAutenticacion.usuario?._id;
  const consulta = useQuery(LIST_PROYECTS);
  const consultaUser = useQuery(PROYECTOS_USUARIO, {
    variables: { id_usuario: id },
  });
  console.log(consultaUser.data);
  console.log(id);
  if (consulta.error) return <span>{consulta.error}</span>;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [alerta, pila, setPila] = useMensajes();
  // useEffect(() => {
  //   consulta.refetch();
  // }, [consulta]);
  return (
    <section className="area-proyectos">
      <ContenedorMensajes pila={pila} setPila={setPila} />

      {(() => {
        if (tipo_usuario == "administrador")
          return <ListaProyectos proyects={consulta.data?.proyectos} />;
        if (tipo_usuario == "líder")
          return (
            <ListaProyectosUsuario
              proyectsUser={consultaUser.data?.proyecto_id_usuario}
            />
          );
        else
          return (
            <ListaProyectosUsuario proyectsUser={consulta.data?.proyectos} />
          );
      })()}
    </section>
  );
};

export default Administracion;
