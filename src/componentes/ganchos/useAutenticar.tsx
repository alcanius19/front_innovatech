import React, { createContext, useState, useContext } from "react";
import PropTypes from "prop-types";
import { useMutation } from "@apollo/client";
import { login, logout } from "../../graphql/consulta_usuarios";
import { useToken } from "./useToken";
import {
  IAutenticacion,
  IAutServer,
  IUsuario,
  IEstadoAutenticacion,
  IAUsuario,
  ILogin,
} from "../usuario/Interfaces/Interfaces";
import { EAutenticacion, EEstados } from "../Enumeraciones/Enumeraciones";

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

// const validarUsuarioJWT: (resultado: object[]) => IEstadoAutenticacion = (
//   resultado: object[]
// ) => {
//   if (resultado.length == 1 && "estado" in resultado[0]) {
//     const datos: { [key: string]: number | IUsuario } = resultado[0] as {
//       [key: string]: number | IUsuario;
//     };
//     if (datos?.estado == 0) {
//       return {
//         autenticado: false,
//         usuario: {} as IUsuario,
//         estado: EAutenticacion.SINDATOS,
//         token: "",
//       };
//     } else if (datos?.estado == 1) {
//       return {
//         autenticado: false,
//         usuario: {} as IUsuario,
//         estado: EAutenticacion.NOAUTENTICADO,
//         token: "",
//       };
//     }
//   } else if (resultado.length == 1 && "token" in resultado[0]) {
//     const datos: { [key: string]: number | IUsuario } = resultado[0] as {
//       [key: string]: number | IUsuario;
//     };
//     const _usuario: IUsuario = datos as unknown as IUsuario;
//     return {
//       autenticado: true,
//       usuario: _usuario,
//       estado: EAutenticacion.AUTENTICADO,
//       token: _usuario.token,
//     };
//   }
//   return {
//     autenticado: false,
//     usuario: {} as IUsuario,
//     estado: EAutenticacion.ERROR,
//     token: "",
//   };
// };

const validarUsuarioJWT: (login: IAutServer) => IEstadoAutenticacion = (
  login: IAutServer
) => {
  try {
    if (
      login &&
      login.token &&
      login.usuario &&
      login.usuario.estado !== EEstados.PENDIENTE
    ) {
      return {
        autenticado: true,
        usuario: login.usuario,
        estado: EAutenticacion.AUTENTICADO,
        token: login.token,
      };
    } else if (login && login.token && login.usuario) {
      return {
        autenticado: true,
        usuario: {} as IUsuario,
        estado: EAutenticacion.PENDIENTE,
        token: "",
      };
    } else {
      return {
        autenticado: false,
        usuario: {} as IUsuario,
        estado: EAutenticacion.NOAUTENTICADO,
        token: "",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      autenticado: false,
      usuario: {} as IUsuario,
      estado: EAutenticacion.ERROR,
      token: "",
    };
  }
};

function useAutenticar(): IAutenticacion {
  const [estadoAutenticacion, setEstadoAutenticacion] =
    useState<IEstadoAutenticacion>({
      autenticado: true,
      usuario: {
        _id: "61714aeba25378969e152f5e", //"619ace06cc23cfe7650c7e3c",
        nombre_completo: "Temp_lider", // "Temp_admin"
        tipo_usuario: "lider", // "administrador"
      } as IUsuario,
      estado: EAutenticacion.AUTENTICADO,
      token: "",
    });

  // 619acf48cc23cfe7650c7e3f
  // estudiante

  // 61714aeba25378969e152f5e
  // "lider"

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [getLogin, { loading, error, data }] = useMutation(login, {
    fetchPolicy: "no-cache",
  });
  const [getLogout, { client }] = useMutation(logout, {
    fetchPolicy: "no-cache",
    onCompleted: () => {
      client.clearStore().then(() => {
        client.resetStore();
      });
    },
  });
  const { setToken } = useToken();
  const ingresar: () => (
    ausuario: IAUsuario
  ) => Promise<IEstadoAutenticacion | void> = () => {
    return async (ausuario: IAUsuario) => {
      // const datos = (await obtenerDatosPost("api/usuario/validar", {
      //   email: ausuario?.email || "",
      //   contrasena: ausuario?.password || "",
      // })) as object[];
      // eslint-disable-next-line @typescript-eslint/no-unused-vars

      const data: Record<string, ILogin> = (await getLogin({
        variables: { email: ausuario?.email, password: ausuario?.password },
      })) as unknown as Record<string, ILogin>;
      const _estadoAutenticacion: IEstadoAutenticacion = validarUsuarioJWT(
        data.data.login
      );
      _estadoAutenticacion.token !== ""
        ? setToken(_estadoAutenticacion.token)
        : null;
      setEstadoAutenticacion(_estadoAutenticacion);
      return _estadoAutenticacion;
    };
  };

  const salir: () => () => Promise<void> = () => {
    return async () => {
      setEstadoAutenticacion({} as IEstadoAutenticacion);
      setToken("");
      await getLogout();
    };
  };

  return {
    estadoAutenticacion,
    ingresar,
    salir,
  };
}

export function AutenticancionProveedor({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) {
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
