import { ExecFileSyncOptionsWithBufferEncoding } from "child_process";

export interface I_INSCRIPCION {
  _id: string;
  id_proyecto: I_PROYECTO;
  id_usuario: string;
  id_lider: string;
  estado: string;
  fecha_ingreso: Date;
  fecha_egreso: Date;
}

export interface I_PROYECTO {
  nombre_proyecto: string;
}
