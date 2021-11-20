import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
//gancgos
import useAutenticarContexto, {
  AutenticancionProveedor,
} from "./ganchos/useAutenticar";
// Común
import Encabezado from "./comun/Encabezado";
import Pie from "./comun/Pie";
//paginas
import PaginaInicio from "./inicio/PaginaInicio";
import PaginaAvances from "./avances/PaginaAvances";
import PaginaEstudiantes from "./estudiantes/PaginaEstudiantes";
import PaginaProyectos from "./proyectos/PaginaProyectos";
import PaginaAcercaDe from "./PaginaAcercaDe";
import PaginaContacto from "./PaginaContacto";
import PaginaNoEncontrada from "./PaginaNoEncontrada";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
library.add(fab);
library.add(fas);
library.add(far);

function RequerirAutenticacion({
  children,
  redirectTo,
}: {
  children: React.ReactElement;
  redirectTo: string;
}) {
  const { estadoAutenticacion } = useAutenticarContexto();
  // return estadoAutenticacion.autenticado ? (
  //   children
  // ) : (
  //   <Navigate to={redirectTo} />
  // );
  return children;
}

function App() {
  return (
    <div className="container-fluid px-0 h-100">
      <AutenticancionProveedor>
        <Encabezado />
        <Routes>
          <Route path="/" element={<PaginaInicio />} />
          <Route
            path="/avances"
            element={
              <RequerirAutenticacion redirectTo="/">
                <PaginaAvances />
              </RequerirAutenticacion>
            }
          />
          <Route
            path="/proyectos"
            element={
              <RequerirAutenticacion redirectTo="/">
                <PaginaProyectos />
              </RequerirAutenticacion>
            }
          />
          <Route
            path="/estudiantes"
            element={
              <RequerirAutenticacion redirectTo="/">
                <PaginaEstudiantes />
              </RequerirAutenticacion>
            }
          />
          <Route path="/acercade" element={<PaginaAcercaDe />} />
          <Route path="/contacto" element={<PaginaContacto />} />
          <Route path="*" element={<PaginaNoEncontrada />} />
        </Routes>
        <Pie />
      </AutenticancionProveedor>
    </div>
  );
}

export default App;
