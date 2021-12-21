import { ExecFileSyncOptionsWithBufferEncoding } from "child_process";

export interface I_INSCRIPCION {
  _id: string;
  id_proyecto: I_PROYECTO;
  id_usuario: Iusuario;
  id_lider: string;
  estado: string;
  fecha_ingreso: Date;
  fecha_egreso: Date;
}

export interface I_PROYECTO {
  _id: string;
  nombre_proyecto: string;
}
export interface Iusuario {
  nombre_completo: string;
}
