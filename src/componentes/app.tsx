import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
//gancgos
import useAutenticar, {
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
import PaginaNoEncontrada from "./PaginaNoEncontrada";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
library.add(fab);
library.add(fas);
library.add(far);

function RequireAuth({
  children,
  redirectTo,
}: {
  children: React.ReactElement;
  redirectTo: string;
}) {
  const { autenticado } = useAutenticar();
  return autenticado ? children : <Navigate to={redirectTo} />;
}

function App() {
  return (
    <div className="container-fluid px-0 h-100">
      <AutenticancionProveedor>
        <Encabezado />
        <Routes>
          <Route path="/" element={<PaginaInicio />} />
          {/* <Route path="/administracion" element={<PaginaAdministracion />} /> */}
          <Route
            path="/avances"
            element={
              <RequireAuth redirectTo="/">
                <PaginaAvances />
              </RequireAuth>
            }
          />
          <Route
            path="/proyectos"
            element={
              <RequireAuth redirectTo="/">
                <PaginaProyectos />
              </RequireAuth>
            }
          />
          <Route
            path="/estudiantes"
            element={
              <RequireAuth redirectTo="/">
                <PaginaEstudiantes />
              </RequireAuth>
            }
          />
          <Route path="/acercade" element={<PaginaAcercaDe />} />
          <Route path="*" element={<PaginaNoEncontrada />} />
        </Routes>
        <Pie />
      </AutenticancionProveedor>
    </div>
  );
}

export default App;
