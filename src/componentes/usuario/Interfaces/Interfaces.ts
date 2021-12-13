import { EAutenticacion } from "../../Enumeraciones/Enumeraciones";

export interface IMensaje {
  id: number;
  titulo: string;
  mensaje: string;
  tiempo: number;
}
export interface IAUsuario {
  email: string;
  password: string;
}

export interface IUsuarioA {
  nombre_completo: string;
  identificacion: number;
  estado: string;
  tipo_usuario: string;
  email: string;
  password: string;
  fecha_ingreso: Date;
  fecha_egreso: Date;
  [x: string]: unknown;
}

export interface IUsuario {
  _id: string;
  password: string;
  identificacion: number;
  nombre_completo: string;
  email: string;
  estado: string;
  tipo_usuario: string;
  fecha_ingreso: Date;
  fecha_egreso: Date;
  token: string;
}

export interface ILogin {
  [x: string]: unknown;
  login: IAutServer;
}
export interface IAutServer {
  token: string;
  usuario: IUsuario;
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

export interface IPropsFormulario {
  botones: { [index: string]: IPropsBotones };
  cerrarForm: () => void;
  mensaje: string;
  textoOpcion: string;
  [x: string]: unknown;
}

export interface IPropsBotones {
  nombre: string;
  click: (usuario: IUsuario) => void;
  claseBoton: string;
}


