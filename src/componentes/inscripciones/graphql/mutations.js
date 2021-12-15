import { gql } from "@apollo/client";

export const ACTUALIZAR_ESTADO = gql`
  mutation estado_Inscripcion($_id: ID!, $estado: String!) {
    actualizarEstadoInscripcionPorID(_id: $_id, estado: $estado) {
      estado
      fecha_ingreso
    }
  }
`;
