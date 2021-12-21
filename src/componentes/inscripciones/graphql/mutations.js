import { gql } from "@apollo/client";

export const ACTUALIZAR_ESTADO = gql`
  mutation estado_Inscripcion($_id: ID!, $estado: String!) {
    actualizarEstadoInscripcionPorID(_id: $_id, estado: $estado) {
      estado
      fecha_ingreso
    }
  }
`;
export const CREAR_AVANCE = gql`
  mutation crearAvance(
    $id_proyecto: ID!
    $id_usuario: ID!
    $descripcion: String!
  ) {
    crearAvancePorId_Proyecto(
      input: {
        id_proyecto: $id_proyecto
        id_usuario: $id_usuario
        descripcion: $descripcion
      }
    ) {
      descripcion
    }
  }
`;
