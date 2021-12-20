import { IMensaje } from "../usuario/Interfaces/Interfaces";
import { useEffect, useState, useRef } from "react";

const useMensajes: () => [
  ({
    titulo,
    mensaje,
    tiempo,
  }: {
    titulo: string;
    mensaje: string;
    tiempo: number;
  }) => void,
  IMensaje[],
  React.Dispatch<React.SetStateAction<IMensaje[]>>
] = () => {
  const [mensajeAlerta, setMensajeAlerta] = useState({} as IMensaje);
  const [pila, setPila] = useState<IMensaje[]>([] as IMensaje[]);

  const renderInicialMensaje = useRef(true);
  const renderInicialPila = useRef(true);

  useEffect(() => {
    if (renderInicialMensaje.current) {
      renderInicialMensaje.current = false;
    } else {
      setPila([...pila, { ...mensajeAlerta, id: mensajeAlerta.id + 1 }]);
    }
  }, [mensajeAlerta]);

  useEffect(() => {
    if (renderInicialPila.current) {
      renderInicialPila.current = false;
    } else {
      console.log(pila);
    }
  }, [pila.length]);

  const alerta = ({
    titulo,
    mensaje,
    tiempo,
  }: {
    titulo: string;
    mensaje: string;
    tiempo: number;
  }) => {
    setMensajeAlerta({
      ...mensajeAlerta,
      titulo,
      mensaje,
      tiempo,
    } as IMensaje);
  };

  return [alerta, pila, setPila];
};

export default useMensajes;
