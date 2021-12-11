import * as React from "react";
import useMensajes from "../ganchos/useMensajes";
import ContenedorMensajes from "../../utilidades/contenedor_mensajes";
import { useEffect } from "react";

const Avances = () => {
  const [alerta, pila, setPila] = useMensajes();
  useEffect(() => {
    alerta({
      titulo: "Bienvenido desde Avances.",
      mensaje: "Prueba Mensaje",
      tiempo: 0,
    });
  }, []);
  return (
    <section className="area-avances">
      <ContenedorMensajes pila={pila} setPila={setPila} />
      <div>Avances</div>
    </section>
  );
};

export default Avances;
