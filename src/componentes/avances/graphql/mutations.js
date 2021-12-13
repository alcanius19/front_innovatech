import { gql } from "@apollo/client";

export const CREAR_AVANCE_POR_ID = gql`
mutation HU_22_crearavanceporId{
    crearAvancePorId_Proyecto(input:{
      id_proyecto:"61ac34073f73270a68f4c104"
      id_usuario:"619acf48cc23cfe7650c7e3f"
      descripcion:"probando 7"
      observacion:[{observacion:"Muy buen trabajo"
      fecha_observacion:"12-06-2021"} ]  
      fecha_avances:"12-06-2021"
      }
     
    ){
        _id
        id_proyecto{
        _id
        nombre_proyecto
        objetivo_general
      }
      id_usuario
      descripcion
      observacion {observacion, fecha_observacion}
    }    
  }
`;
