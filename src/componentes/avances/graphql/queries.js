/* eslint-disable prettier/prettier */
import { gql } from "@apollo/client";


export const LIST_AVANCES = gql`
query {
  listarAvances{
      _id
    id_proyecto{
      _id
      nombre_proyecto
      objetivo_general
    }
    id_usuario
    fecha_avances
    descripcion
    observacion {observacion, fecha_observacion}
    
  }   
  
}

`;