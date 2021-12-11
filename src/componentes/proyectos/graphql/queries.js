import { gql } from "@apollo/client";

export const LIST_PROYECTS = gql`
  query {
    proyectos {
      _id
      nombre_proyecto
      objetivo_general
      objetivo_especifico
      presupuesto
      estado
      fase_proyecto
      id_usuario {
        nombre_completo
        tipo_usuario
        email
        estado
      }
    }
  }
`;
// trae los proyectos que estan vinculados a un usuario especifico
export const PROYECTOS_USUARIO = gql`
  query ProyectoUsuario($id_usuario: String!) {
    proyecto_id_usuario(id_usuario: $id_usuario) {
      _id
      nombre_proyecto
      objetivo_general
      objetivo_especifico
      estado
      id_usuario {
        _id
        nombre_completo
        tipo_usuario
      }
    }
  }
`;

export const PROYECTOS_ID = gql`
  query ProyectoId($_id: ID!) {
    proyecto_ID(_id: $_id) {
      _id
      objetivo_general
      objetivo_especifico
      nombre_proyecto
      presupuesto
      estado
      id_usuario {
        _id
        nombre_completo
        tipo_usuario
        email
      }
    }
  }
`;
