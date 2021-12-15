// import * as React from "react";
// import { useState } from "react";
// import { useMutation } from "@apollo/client";
// import { CREAR_AVANCE_POR_ID } from "../graphql/mutations";

// export const avanceForm = () => {
//   const [descripcion, setDescripcion] = useState("");
//   const [observacion, setObservacion] = useState("");

//   const handleSubmit = (e: any) => {
//     e.preventDefault();
//     const crear_avances = useMutation(CREAR_AVANCE_POR_ID);
//     // eslint-disable-next-line prettier/prettier
//     crear_avances({variables:{descripcion, observacion}})

//     setDescripcion("");
//     setObservacion("");
//   };
//   return (
//     <div>
//       <h1>Crear Avance</h1>
//       <form onSubmit={handleSubmit}>
//         <header>avanceform</header>
//         <input
//           placeholder="Descripcion"
//           value={descripcion}
//           onChange={(evt) => setDescripcion(evt.target.value)}
//         />
//         <input
//           placeholder="Observacion"
//           value={observacion}
//           onChange={(evt) => setObservacion(evt.target.value)}
//         />
//       </form>
//     </div>
//   );
// };
