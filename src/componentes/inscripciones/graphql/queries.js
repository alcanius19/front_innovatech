import { gql } from "@apollo/client";

export const INSCRIPCIONES_LIDER = gql`
  query incripcionesLider($_idL: ID!) {
    inscripcionesTodoPorIDLider(_idL: $_idL) {
      _id
      id_usuario
      estado
      id_proyecto {
        nombre_proyecto
      }
    }
  }
`;
