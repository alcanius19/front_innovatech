import React, { createContext, useState, useContext } from "react";
import PropTypes from "prop-types";
import { obtenerDatosPost } from "./useExtraer";

export interface IAUsuario {
  email: string;
  password: string;
}

export interface IUsuario {
  password: string;
  identificacion: string;
  nombre_completo: string;
  email: string;
  estado: string;
  tipo_usuario: string;
  token: string;
}

export const enum EAutenticacion {
  SINDATOS,
  NOAUTENTICADO,
  ERROR,
  AUTENTICADO,
}

export interface IAutenticacion {
  estadoAutenticacion: IEstadoAutenticacion;
  ingresar: () => (
    usuario: IAUsuario
  ) => PromiseLike<IEstadoAutenticacion | void>;
  salir: () => () => PromiseLike<object | void>;
}

export interface IEstadoAutenticacion {
  autenticado: boolean;
  usuario: IUsuario;
  estado: EAutenticacion;
  token: string;
}
const AutenticarContexto = createContext<IAutenticacion>({} as IAutenticacion);

// const validarUsuario: (
//   ausuario: IAUsuario,
//   usuario: IUsuario
// ) => Promise<IEstadoAutenticacion> = async (
//   ausuario: IAUsuario,
//   usuario: IUsuario
// ): Promise<IEstadoAutenticacion> => {
//   if (String(usuario?.email) === String(ausuario?.email)) {
//     if (String(usuario?.contrasena) === String(ausuario?.contrasena)) {
//       return {
//         autenticado: true,
//         usuario: usuario,
//         estado: EAutenticacion.AUTENTICADO,
//         token: "",
//       };
//     } else {
//       return {
//         autenticado: false,
//         usuario: {} as IUsuario,
//         estado: EAutenticacion.NOAUTENTICADO,
//         token: "",
//       };
//     }
//   } else {
//     return {
//       autenticado: false,
//       usuario: {} as IUsuario,
//       estado: EAutenticacion.SINDATOS,
//       token: "",
//     };
//   }
// };

const validarUsuarioJWT: (resultado: object[]) => IEstadoAutenticacion = (
  resultado: object[]
) => {
  if (resultado.length == 1 && "estado" in resultado[0]) {
    const datos: { [key: string]: number | IUsuario } = resultado[0] as {
      [key: string]: number | IUsuario;
    };
    if (datos?.estado == 0) {
      return {
        autenticado: false,
        usuario: {} as IUsuario,
        estado: EAutenticacion.SINDATOS,
        token: "",
      };
    } else if (datos?.estado == 1) {
      return {
        autenticado: false,
        usuario: {} as IUsuario,
        estado: EAutenticacion.NOAUTENTICADO,
        token: "",
      };
    }
  } else if (resultado.length == 1 && "token" in resultado[0]) {
    const datos: { [key: string]: number | IUsuario } = resultado[0] as {
      [key: string]: number | IUsuario;
    };
    const _usuario: IUsuario = datos as unknown as IUsuario;
    return {
      autenticado: true,
      usuario: _usuario,
      estado: EAutenticacion.AUTENTICADO,
      token: _usuario.token,
    };
  }
  return {
    autenticado: false,
    usuario: {} as IUsuario,
    estado: EAutenticacion.ERROR,
    token: "",
  };
};

function useAutenticar(): IAutenticacion {
  const [estadoAutenticacion, setEstadoAutenticacion] =
    useState<IEstadoAutenticacion>({} as IEstadoAutenticacion);

  const ingresar: () => (
    ausuario: IAUsuario
  ) => Promise<IEstadoAutenticacion | void> = () => {
    return async (ausuario: IAUsuario) => {
      const datos = (await obtenerDatosPost("api/usuario/validar", {
        email: ausuario?.email || "",
        contrasena: ausuario?.password || "",
      })) as object[];
      const estadoAutenticacion: IEstadoAutenticacion = await validarUsuarioJWT(
        datos
      );
      setEstadoAutenticacion(estadoAutenticacion);
      return estadoAutenticacion;
    };
  };

  const salir: () => () => Promise<void> = () => {
    return async () => {
      setEstadoAutenticacion({} as IEstadoAutenticacion);
    };
  };

  return {
    estadoAutenticacion,
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

const useAutenticarContexto = () => useContext(AutenticarContexto);

export default useAutenticarContexto;

AutenticancionProveedor.propTypes = {
  children: PropTypes.any,
};
