import React from "react";
import { useQuery } from "@apollo/client";
import useMensajes from "../ganchos/useMensajes";
import ContenedorMensajes from "../../utilidades/contenedor_mensajes";
//import { useEffect } from "react";
import ListaProyectos from "./ListaProjectos";
import { LIST_PROYECTS, PROYECTOS_USUARIO } from "./graphql/queries";
import useAutenticarContexto from "../ganchos/useAutenticar";
import ListaProyectosUsuario from "./ListaProyectosUsuario";
//import { type } from "os";
//fs
const Administracion = () => {
  const consulta = useQuery(LIST_PROYECTS, { fetchPolicy: "no-cache" });
  const { estadoAutenticacion } = useAutenticarContexto();
  const tipo_usuario = estadoAutenticacion?.usuario?.tipo_usuario;
  const id = estadoAutenticacion?.usuario?._id;
  const consultaUser = useQuery(PROYECTOS_USUARIO, {
    variables: { id_usuario: id },
  });
  console.log(consultaUser.data);
  console.log(id);
  if (consulta.error) return <span>{consulta.error}</span>;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [alerta, pila, setPila] = useMensajes();
  React.useEffect(() => {
    if (estadoAutenticacion?.usuario?.tipo_usuario === "administrador") {
      consulta.refetch();
    } else if (estadoAutenticacion?.usuario?.tipo_usuario === "líder") {
      consultaUser.refetch();
    }
  }, [consulta.data, consultaUser.data]);
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
