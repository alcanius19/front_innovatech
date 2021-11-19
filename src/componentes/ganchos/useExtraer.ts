import { SetStateAction, useEffect, useState } from "react";
import axios from "axios";

export interface IParametros {
  nombre: string;
  valor: string;
}
export interface IDatos {
  ruta: string;
  parametros: { [index: string]: string };
  items: object[];
}

const api = axios.create({
  baseURL: "http://localhost:4000/",
  //baseURL: process.env.API_URL || "http://localhost:4000/",
});

const devolverItems = (datos: object | object[]) => {
  const resultado = Array.isArray(datos) ? datos : [datos];
  return resultado.length > 0 ? resultado.map((item) => item) : [];
};

const formatoParametros = (parametros: { [index: string]: string }): string => {
  const ruta: string[] = Object.keys(parametros).map((parametro: string) => {
    return parametro + "/" + parametros[parametro];
  });
  return ruta.join("");
};

export const obtenerDatos = async (
  ruta: string,
  parametros: { [index: string]: string }
) => {
  try {
    const res = await api.get(`${ruta}/${formatoParametros(parametros)}`);
    console.log(res);
    let respuesta = res.data;
    if (respuesta) {
      respuesta = devolverItems(res.data);
    } else {
      respuesta = [];
    }
    return respuesta;
  } catch (error) {
    console.error(JSON.stringify(error));
    return [];
  }
};

export const obtenerDatosPost = async (
  ruta: string,
  parametros: { [index: string]: string }
) => {
  try {
    const res = await api.post(`${ruta}`, parametros);
    console.log(res);
    let respuesta = res.data;
    if (respuesta) {
      respuesta = devolverItems(res.data);
    } else {
      respuesta = [];
    }
    return respuesta;
  } catch (error) {
    console.error(JSON.stringify(error));
    return [];
  }
};

const useExtraer = (
  propiedades: IDatos
): [IDatos, React.Dispatch<SetStateAction<IDatos>>] => {
  const [datos, setDatos] = useState<IDatos>({
    ruta: propiedades.ruta,
    parametros: propiedades.parametros,
    items: propiedades.items,
  });

  useEffect(() => {
    if (Object.entries(datos.parametros).length > 0) {
      const timeoutId = setTimeout(() => {
        const extraer = async () => {
          const respuesta = await obtenerDatos(datos.ruta, datos.parametros);
          setDatos((datos) => ({
            ...datos,
            parametros: {},
            items: respuesta,
          }));
        };
        extraer();
      }, 500);
      return () => clearTimeout(timeoutId);
    }
  }, [datos.parametros]);

  return [datos, setDatos];
};

export default useExtraer;
