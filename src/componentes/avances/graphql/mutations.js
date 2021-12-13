/* eslint-disable prettier/prettier */
import { gql } from "@apollo/client";

export const CREAR_AVANCE_POR_ID = gql`
mutation crearAvancePorId_Proyecto( $descripcion: String!, $observacion: String!){
    crearAvance( 
      descripcion:$descripcion,
      observacion:$observacion
     ) { 
      descripcion
      observacion:[{observacion:observacion
        fecha_observacion:""} ] 
      }
      _id
      id_usuario
      id_proyecto    
    }    
  }
`;
