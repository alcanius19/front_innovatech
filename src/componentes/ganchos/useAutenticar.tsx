/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { createContext, useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import useExtraerDatos from "../ganchos/extraer_datos";

export interface IAUsuario {
  identificacion: string;
  contrasena: string;
}

export interface IUsuario {
  contrasena: string;
  identificacion: string;
  nombre: string;
  email: string;
  rol: string;
  estado: string;
}

export interface IAutenticacion {
  autenticado: boolean;
  usuario: IUsuario;
  salida: object;
  ingresar: () => ((usuario: IAUsuario) => PromiseLike<object | void>) | null;
  salir: () => (() => PromiseLike<object | void>) | null;
}

const AutenticarContexto = createContext<IAutenticacion>({
  autenticado: false,
  usuario: {} as IUsuario,
  salida: {},
  ingresar: () => null,
  salir: () => null,
});

export const usarAutenticarContexto = () => useContext(AutenticarContexto);

function useAutenticar(): IAutenticacion {
  const [autenticado, setAutenticado] = useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [usuario, setUsuario] = useState<IUsuario>({} as IUsuario);
  const [ausuario, setAusuario] = useState<IAUsuario | null>({} as IAUsuario);
  const [salida, setSalida] = useState({});
  const [datos, setDatos] = useExtraerDatos({
    ruta: "api/login",
    parametros: {},
    items: [],
  });
  // eslint-disable-next-line no-var
  let res: (valor: object | PromiseLike<object>) => void, rej;

  useEffect(() => {
    let id: NodeJS.Timeout;
    if (datos.items.length > 0) {
      const _usuario: IUsuario = datos.items[0] as IUsuario;
      id = setTimeout(() => {
        const fn = async () => {
          console.log(JSON.stringify(_usuario));
          console.log(JSON.stringify(usuario));
          if (
            String(_usuario?.identificacion) ===
            String(ausuario?.identificacion)
          ) {
            if (String(_usuario?.contrasena) === String(ausuario?.contrasena)) {
              setAutenticado(true);
              setUsuario(_usuario);
              console.log("Sí");
            } else {
              setAutenticado(false);
              setUsuario({} as IUsuario);
              console.log("No");
            }
          } else {
            setAutenticado(false);
            setUsuario({} as IUsuario);
            console.log("No User");
          }
        };
        fn();
      }, 1000);
    }
    return () => clearTimeout(id);
  }, [datos]);

  const ingresar: () => (usuario: IAUsuario) => PromiseLike<object | void> =
    () => {
      return (usuario: IAUsuario): Promise<object | void> => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        return new Promise<object>((resolve, reject) => {
          setAusuario(usuario);
          setDatos({
            ...datos,
            parametros: {
              identificacion: usuario?.identificacion || "",
            },
          });
        })
          .then()
          .catch()
          .finally();
      };
    };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const salir: () => () => PromiseLike<object | void> =
    () => (): Promise<object | void> => {
      setUsuario({} as IUsuario);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      return new Promise<object>((resolve, reject) => {
        setAutenticado(false);
      });
    };

  //setSalir(() => _salir);

  return {
    autenticado,
    usuario,
    salida,
    ingresar,
    salir,
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function AutenticancionProveedor({ children }: { children: any }) {
  const autenticar = useAutenticar();

  return (
    <AutenticarContexto.Provider value={autenticar}>
      {children}
    </AutenticarContexto.Provider>
  );
}

export default function AutenticacionConsumidor() {
  return useContext(AutenticarContexto);
}

AutenticancionProveedor.propTypes = {
  children: PropTypes.any,
};
