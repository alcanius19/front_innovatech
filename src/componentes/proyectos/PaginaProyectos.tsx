import * as React from "react";
import useMensajes from "../ganchos/useMensajes";
import ContenedorMensajes from "../../utilidades/contenedor_mensajes";
import { useEffect } from "react";

const Administracion = () => {
  const [alerta, pila, setPila] = useMensajes();
  useEffect(() => {
    alerta({
      titulo: "Bienvenido desde Proyectos.",
      mensaje: "Prueba Mensaje",
      tiempo: 0,
    });
  }, []);
  return (
    <section className="area-proyectos">
      <ContenedorMensajes pila={pila} setPila={setPila} />
      <div>Proyectos</div>
    </section>
  );
};

export default Administracion;
