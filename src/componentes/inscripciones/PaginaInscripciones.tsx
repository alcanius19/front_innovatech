import * as React from "react";
import useMensajes from "../ganchos/useMensajes";
import ContenedorMensajes from "../../utilidades/contenedor_mensajes";
import { useEffect } from "react";

const Inscripciones = () => {
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
      <div>Avances</div>
    </section>
  );
};

export default Inscripciones;
