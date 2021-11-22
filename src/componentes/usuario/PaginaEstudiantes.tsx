import * as React from "react";
import useExtraer from "../ganchos/useExtraer";
import useAutenticarContexto from "../ganchos/useAutenticar";
import { useEffect, useState } from "react";
import Tabla from "./tabla/Tabla";
import modelo_tabla_estudiantes from "./tabla/ModeloTablaEstudiantes";

export interface IEstudiante {
  identificacion: number;
  nombre_completo: string;
  email: string;
  estado: string;
  tipo_usuario: string;
}

const Estudiantes = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { estadoAutenticacion } = useAutenticarContexto();
  const [estudiantes, setEstudiantes] = useState<IEstudiante[]>([]);
  const [datosEstudiantes] = useExtraer({
    ruta: "/api/usuario",
    parametros: { inicio: "todos" },
    items: [],
  });
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    if (datosEstudiantes.items.length > 0) {
      setEstudiantes(datosEstudiantes.items as IEstudiante[]);
    }
  }, [datosEstudiantes]);

  const alBorrarFilas = () => {
    //   alerta({
    //     titulo: "Información",
    //     mensaje: "Se ha eliminado un producto.",
    //     tiempo: 0,
    //   });
  };
  const onSeleccion = () => {
    console.log("seleccion");
  };
  return (
    <section className="area-estudiantes">
      <div
        id="titulo-estudiantes"
        className="container-fluid d-flex rounded-1 d-flex justify-content-center align-items-center p-1 mb-2"
      >
        <h5>Administración de estudiantes</h5>
      </div>
      <div id="opciones estudiante" className="container-fluid bg-light mb-2">
        {/* 0edc8d */}
        <button
          className="btn"
          style={{ backgroundColor: "#0edc8d", color: "white" }}
        >
          Nuevo Usuario
        </button>
      </div>
      <div
        className={"tabla-estudiantes container-fluid overflow-auto"}
        style={{ height: 250 }}
      >
        <Tabla
          datos={estudiantes}
          setDatos={setEstudiantes}
          modelo={modelo_tabla_estudiantes}
          modo={"checkbox"}
          metodoSeleccion={onSeleccion}
          alBorrarFilas={alBorrarFilas}
          cargador={[cargando, setCargando]}
        />
      </div>
      <div id="">
        {estudiantes?.length > 0 &&
          estudiantes.map((estudiante) => estudiante.estado)}
      </div>
    </section>
  );
};

export default Estudiantes;
