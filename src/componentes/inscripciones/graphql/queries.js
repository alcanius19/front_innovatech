import { gql } from "@apollo/client";

export const INSCRIPCIONES_LIDER = gql`
  query incripcionesLider($_idL: ID!) {
    inscripcionesTodoPorIDLider(_idL: $_idL) {
      _id
      id_usuario {
        _id
        nombre_completo
      }
      estado
      id_proyecto {
        nombre_proyecto
      }
    }
  }
`;

export const INSCRIPCIONES_USUARIO = gql`
  query InscripcionUsuario($_id: ID!) {
    inscripcionesPorIDUsuario(_id: $_id) {
      _id
      id_proyecto {
        _id
        nombre_proyecto
      }
      estado
      id_usuario {
        nombre_completo
      }
    }
  }
`;

export const AVANCES_USUARIO = gql`
  query listarAvancesUsuario($id_usuario: ID!) {
    listarAvancesPorTipo_usuario(id_usuario: $id_usuario) {
      id_proyecto {
        nombre_proyecto
        objetivo_general
      }
      observacion {
        observacion
      }
      descripcion
    }
  }
`;
