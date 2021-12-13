import { string } from "prop-types";
import { EAutenticacion } from "../Enumeraciones/Enumeraciones";

export interface IAvance {
  _id: string;
  id_usuario: string;
  observacion: Iobservacion[];
  descripcion: string;
  fecha_avances: Date;
}

export interface IState {
  avance: IAvance | null;
  listaAvance: IAvance[];
}

export interface IProps {
  data: IAvance[];
}

export interface Iobservacion {
  observacion: string;
  fecha_observacion: Date;
}
