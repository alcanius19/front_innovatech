/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
// import cliente from "../graphql/cliente_apollo";
//gancgos
import useAutenticarContexto, {
  AutenticancionProveedor,
} from "./ganchos/useAutenticar";
import { PersonalTokenProvider } from "./ganchos/useToken";
import CustomApolloProvider from "../graphql/cliente_apollo";
// Común
import Encabezado from "./comun/Encabezado";
import PieInicio from "./comun/Pie_inicio";
import PieApp from "./comun/Pie_app";
//paginas
import PaginaInicio from "./inicio/PaginaInicio";
import PaginaAvances from "./avances/PaginaAvances";
import PaginaUsuarios from "./usuario/PaginaUsuarios";
import PaginaProyectos from "./proyectos/PaginaProyectos";
import CrearProyecto from "./proyectos/Formularios/CrearProyecto";
import PaginaInscripciones from "./inscripciones/PaginaInscripciones";
import PaginaAcercaDe from "./PaginaAcercaDe";
import PaginaContacto from "./PaginaContacto";
import PaginaNoEncontrada from "./PaginaNoEncontrada";
import ActualizarFase from "./proyectos/Formularios/ActualizarFase";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { ETipos } from "../componentes/Enumeraciones/Enumeraciones";

library.add(fab);
library.add(fas);
library.add(far);

const RequerirAutenticacion = ({
  children,
  redirectTo,
  roles,
}: {
  children: React.ReactElement;
  redirectTo: string;
  roles: string;
}) => {
  const { estadoAutenticacion } = useAutenticarContexto();
  return estadoAutenticacion.autenticado &&
    roles.split(",").includes(estadoAutenticacion.usuario.tipo_usuario) ? (
    children
  ) : (
    <Navigate to={redirectTo} />
  );
};

const App = () => {
  return (
    <div className="container-fluid px-0 h-100">
      <PersonalTokenProvider>
        <CustomApolloProvider>
          <AutenticancionProveedor>
            <Encabezado />
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <PaginaInicio />
                    <PieApp />
                  </>
                }
              />
              <Route
                path="/usuarios"
                element={
                  <>
                    <RequerirAutenticacion
                      redirectTo="/"
                      roles={`${ETipos.ADMINISTRADOR},${ETipos.LIDER}`}
                    >
                      <PaginaUsuarios />
                    </RequerirAutenticacion>
                    <PieApp />
                  </>
                }
              />
              <Route
                path="/proyectos"
                element={
                  <>
                    <RequerirAutenticacion
                      redirectTo="/"
                      roles={`${ETipos.ADMINISTRADOR},${ETipos.LIDER},${ETipos.ESTUDIANTE}`}
                    >
                      <PaginaProyectos />
                    </RequerirAutenticacion>
                    <PieApp />
                  </>
                }
              />
              <Route
                path="/crear_proyecto"
                element={
                  <>
                    <RequerirAutenticacion
                      redirectTo="/"
                      roles={`${ETipos.LIDER}`}
                    >
                      <CrearProyecto />
                    </RequerirAutenticacion>
                    <PieApp />
                  </>
                }
              />
              {/* <Route
                path="/avances"
                element={
                  <>
                    <RequerirAutenticacion
                      redirectTo="/"
                      roles={`${ETipos.ESTUDIANTE},${ETipos.LIDER}`}
                    >
                      <PaginaAvances />
                    </RequerirAutenticacion>
                    <PieApp />
                  </>
                }
              /> */}
              {/* <Route
                path="avances/:action"
                element={
                  <>
                    <RequerirAutenticacion
                      redirectTo="/"
                      roles={`${ETipos.ESTUDIANTE},${ETipos.LIDER}`}
                    >
                      <PaginaAvances />
                    </RequerirAutenticacion>
                    <PieApp />
                  </>
                }
              /> */}
              <Route
                path="/actualizar_fase"
                element={
                  <>
                    <RequerirAutenticacion
                      redirectTo="/"
                      roles={`${ETipos.ADMINISTRADOR}`}
                    >
                      <ActualizarFase />
                    </RequerirAutenticacion>
                    <PieApp />
                  </>
                }
              />
              <Route
                path="/inscripciones"
                element={
                  <>
                    <RequerirAutenticacion
                      redirectTo="/"
                      roles={`${ETipos.ESTUDIANTE},${ETipos.LIDER}`}
                    >
                      <PaginaInscripciones />
                    </RequerirAutenticacion>
                    <PieApp />
                  </>
                }
              />

              <Route
                path="/acercade"
                element={
                  <>
                    <PaginaAcercaDe />
                    <PieInicio />
                  </>
                }
              />
              <Route
                path="/contacto"
                element={
                  <>
                    <PaginaContacto />
                    <PieInicio />
                  </>
                }
              />
              <Route
                path="*"
                element={
                  <>
                    <PaginaNoEncontrada />
                  </>
                }
              />
            </Routes>
          </AutenticancionProveedor>
        </CustomApolloProvider>
      </PersonalTokenProvider>
    </div>
  );
};

export default App;
