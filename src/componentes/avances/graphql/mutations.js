/* eslint-disable prettier/prettier */
import { gql } from "@apollo/client";

export const CREAR_AVANCE_POR_ID = gql`
  mutation crearAvancePorId_Proyecto(
    $id_proyecto: ID!
    $id_usuario: ID!
    $descripcion: String!
    $fecha_avances: Date
    $observacion: [ObservacionInput]
  ) {
    crearAvancePorId_Proyecto(
      input: {
        id_proyecto: $id_proyecto
        id_usuario: $id_usuario
        descripcion: $descripcion
        fecha_avances: $fecha_avances
        observacion: $observacion
      }
    ) {
      _id
      id_usuario
      id_proyecto {
        _id
        nombre_proyecto
      }
    }
  }
`;
