import { gql } from "@apollo/client";


export const LIST_AVANCES = gql`
  query {
   query listaProyectos{
  proyectos{
    _id
    nombre_proyecto
    objetivo_general
    objetivo_especifico
    estado
   
    id_usuario{
      nombre_completo
      tipo_usuario
      email
      estado
    }
  }
}

`;