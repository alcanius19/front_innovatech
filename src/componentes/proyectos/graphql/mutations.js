import { gql } from "@apollo/client";

export const CREAR_PROYECTO = gql`
  mutation addProyecto(
    $nombre_proyecto: String!
    $presupuesto: Int!
    $objetivo_general: String!
    $objetivo_especifico: String!
    $id_usuario: String
  ) {
    crearProyecto(
      input: {
        nombre_proyecto: $nombre_proyecto
        presupuesto: $presupuesto
        objetivo_general: $objetivo_general
        objetivo_especifico: $objetivo_especifico
        id_usuario: $id_usuario
      }
    ) {
      _id
    }
  }
`;

//  actualizar fase del proyecto
export const ACTUALIZAR_FASE = gql`
  mutation actualizarFase($_id: ID!, $fase_proyecto: String!) {
    actualizarfase_proyecto(
      _id: $_id
      input: { fase_proyecto: $fase_proyecto }
    ) {
      fase_proyecto
    }
  }
`;

export const ACTUALIZAR_ESTADO = gql`
  mutation actualizarEstado($_id: ID!, $estado: String!) {
    actualizarproyecto_estado(_id: $_id, input: { estado: $estado }) {
      estado
    }
  }
`;

export const UPDATE_PROYECTO_USUARIO = gql`
  mutation updateProyectoUsuario(
    $_id: ID!
    $nombre_proyecto: String!
    $objetivo_general: String!
    $objetivo_especifico: String!
    $presupuesto: Int!
  ) {
    updateProyecto(
      _id: $_id
      input: {
        nombre_proyecto: $nombre_proyecto
        objetivo_general: $objetivo_general
        objetivo_especifico: $objetivo_especifico
        presupuesto: $presupuesto
      }
    ) {
      nombre_proyecto
    }
  }
`;

export const INSCRIPCION = gql`
  mutation Inscripcion($id_proyecto: ID!, $id_usuario: ID!, $id_lider: ID!) {
    crearInscripcion(
      input: {
        id_proyecto: $id_proyecto
        id_usuario: $id_usuario
        id_lider: $id_lider
      }
    ) {
      _id
    }
  }
`;
