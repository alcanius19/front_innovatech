import React, { SetStateAction } from "react";
import PropTypes from "prop-types";
import { ToastContainer } from "react-bootstrap";
import Mensaje from "./mensaje";
import { v4 } from "uuid";
import { IMensaje } from "../componentes/usuario/Interfaces/Interfaces";

const ContenedorMensajes = ({
  pila,
  setPila,
}: {
  pila: IMensaje[];
  setPila: React.Dispatch<SetStateAction<IMensaje[]>>;
}) => (
  <ToastContainer
    position="top-end"
    className="d-flex flex-column p-3"
    style={{ zIndex: 2000 }}
  >
    {pila.length > 0
      ? pila.map((item, i) => {
          return (
            <Mensaje
              key={v4()}
              alerta={item}
              orden={i}
              onCerrar={() => {
                setPila((mensajes) =>
                  mensajes.filter((_mensaje) => _mensaje !== item)
                );
              }}
            />
          );
        })
      : null}
  </ToastContainer>
);

ContenedorMensajes.propTypes = {
  pila: PropTypes.array.isRequired,
  setPila: PropTypes.func.isRequired,
};

// (alerta) => {
//   setPila((pilaAnterior) => {
//     pilaAnterior = pilaAnterior.filter((_alerta) => _alerta.id != alerta.id);
//     return [...pilaAnterior];
//   });
// };

export default ContenedorMensajes;
