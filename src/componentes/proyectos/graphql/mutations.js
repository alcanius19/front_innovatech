import { gql } from "@apollo/client";

export const CREAR_PROYECTO = gql`
  mutation addProyecto(
    $nombre_proyecto: String!
    $presupuesto: Int!
    $objetivo_general: String!
    $objetivo_especifico: String!
  ) {
    crearProyecto(
      input: {
        nombre_proyecto: $nombre_proyecto
        presupuesto: $presupuesto
        objetivo_general: $objetivo_general
        objetivo_especifico: $objetivo_especifico
        id_usuario: "61714aeba25378969e152f5e"
      }
    ) {
      _id
    }
  }
`;

//  actualizar fase del proyecto
export const ACTUALIZAR_FASE = gql`
  mutation actualizarFase($id: ID!, $fase_proyecto: String!) {
    actualizarface_proyecto(
      _id: $id
      input: { fase_proyecto: $fase_proyecto }
    ) {
      fase_proyecto
    }
  }
`;
