/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form } from "react-bootstrap";
import { PropTypes } from "prop-types";
import { v4 } from "uuid";
import { EEstados, ETipos } from "../../Enumeraciones/Enumeraciones";
import { textFilter, selectFilter } from "react-bootstrap-table2-filter";
import "react-bootstrap-table-next/style/react-bootstrap-table2.scss";
import { Type } from "react-bootstrap-table2-editor";
import { capitalizar } from "../../../utilidades/utilidades";
import useAutenticarContexto from "../../ganchos/useAutenticar";
import moment from "moment";
const ModeloTabla = (datosTabla, setDatosTabla, alBorrarFilas) => {
  const [filaSeleccionadas, setFilaSeleccionadas] = useState([]);
  const { estadoAutenticacion } = useAutenticarContexto();

  // eslint-disable-next-line no-unused-vars
  const handleOnEdit = (content, row, rowIndex, columnIndex) => {
    return filaSeleccionadas.length > 0 && filaSeleccionadas.includes(row)
      ? true
      : false;
  };

  const handleDelete = (row) => {
    if (filaSeleccionadas.length > 0 && filaSeleccionadas.includes(row)) {
      setDatosTabla([...datosTabla].filter((_row) => _row !== row));
      setFilaSeleccionadas(
        [...filaSeleccionadas].filter((item) => item !== row)
      );
      if (alBorrarFilas) {
        alBorrarFilas(row._id);
      }
    }
  };

  class CmbEstado extends React.Component {
    static estados = [
      EEstados.AUTORIZADO,
      EEstados.NO_AUTORIZADO,
      EEstados.PENDIENTE,
    ];
    static filtro = () => {
      return {
        [EEstados.AUTORIZADO]: capitalizar(EEstados.AUTORIZADO),
        [EEstados.NO_AUTORIZADO]: capitalizar(EEstados.NO_AUTORIZADO),
        [EEstados.PENDIENTE]: capitalizar(EEstados.PENDIENTE),
      };
    };
    static propTypes = {
      value: PropTypes.string,
      onUpdate: PropTypes.func,
    };
    static defaultProps = {
      value: 0,
    };

    getValue = () => {
      return this.dropdown_estado.value;
    };
    render() {
      const { value, onUpdate, ...rest } = this.props;
      return [
        <div
          key="divestado"
          className="d-flex justify-content-center align-items-center"
        >
          <Form.Select
            aria-label="estado"
            id="dropdown-estado"
            key={"dropdown_estado"}
            {...rest}
            ref={(node) => (this.dropdown_estado = node)}
            variant="outline-primary"
            onChange={(e) => {
              onUpdate(e.currentTarget.value);
            }}
            className="fw-bold text-wrap text-break"
            style={{ fontSize: "11px" }}
          >
            {CmbEstado.estados &&
              CmbEstado.estados.map((_estado) => (
                <option key={v4()} value={_estado}>
                  {capitalizar(_estado)}
                </option>
              ))}
          </Form.Select>
        </div>,
      ];
    }
  }

  // eslint-disable-next-line no-unused-vars
  const onFormatoEstado = (cell, row, rowIndex, extraData) => (
    <div
      className={`m-0 fw-bold badge text-wrap w-auto ${
        cell === EEstados.AUTORIZADO
          ? "bg-success"
          : cell === EEstados.PENDIENTE
          ? "bg-primary"
          : cell === EEstados.PENDIENTE
          ? "bg-warning"
          : "bg-danger"
      } text-center`}
    >
      {capitalizar(cell)}
    </div>
  );

  class CmbTipo extends React.Component {
    static tipos = [ETipos.ADMINISTRADOR, ETipos.ESTUDIANTE, ETipos.LIDER];
    static filtro = () => {
      if (estadoAutenticacion?.usuario?.tipo_usuario === ETipos.LIDER) {
        return {
          [ETipos.ESTUDIANTE]: capitalizar(ETipos.ESTUDIANTE),
        };
      } else if (
        estadoAutenticacion?.usuario?.tipo_usuario === ETipos.ADMINISTRADOR
      ) {
        return {
          [ETipos.ADMINISTRADOR]: capitalizar(ETipos.ADMINISTRADOR),
          [ETipos.LIDER]: capitalizar(ETipos.LIDER),
          [ETipos.ESTUDIANTE]: capitalizar(ETipos.ESTUDIANTE),
        };
      }
    };
    static propTypes = {
      value: PropTypes.string,
      onUpdate: PropTypes.func,
    };
    static defaultProps = {
      value: 0,
    };

    getValue = () => {
      return this.dropdown_tipo.value;
    };
    render() {
      const { value, onUpdate, ...rest } = this.props;
      return [
        <div
          key="divtipo"
          className="d-flex justify-content-center align-items-center"
        >
          <Form.Select
            aria-label="tipo"
            id="dropdown-tipo"
            key={"dropdown_tipo"}
            ref={(node) => (this.dropdown_tipo = node)}
            {...rest}
            variant="outline-primary"
            onChange={(e) => onUpdate(e.currentTarget.value)}
            className="fw-bold text-wrap text-break"
            style={{ fontSize: "11px" }}
          >
            {CmbTipo.tipos &&
              CmbTipo.tipos.map((_tipo) => {
                if (
                  estadoAutenticacion?.usuario?.tipo_usuario === ETipos.LIDER &&
                  _tipo === ETipos.ESTUDIANTE
                ) {
                  return (
                    <option key={v4()} value={_tipo}>
                      {capitalizar(_tipo)}
                    </option>
                  );
                } else if (
                  estadoAutenticacion?.usuario?.tipo_usuario ===
                  ETipos.ADMINISTRADOR
                ) {
                  return (
                    <option key={v4()} value={_tipo}>
                      {capitalizar(_tipo)}
                    </option>
                  );
                }
              })}
          </Form.Select>
        </div>,
      ];
    }
  }

  // eslint-disable-next-line no-unused-vars
  const onFormatoTipo = (cell, row, rowIndex, extraData) => (
    <div
      className={`m-0 fw-bold badge text-wrap w-auto ${
        cell === ETipos.ADMINISTRADOR
          ? "bg-success"
          : cell === ETipos.LIDER
          ? "bg-primary"
          : cell === ETipos.ESTUDIANTE
          ? "bg-warning"
          : "bg-danger"
      } text-center`}
    >
      {capitalizar(cell)}
    </div>
  );

  // eslint-disable-next-line no-unused-vars
  const onFormatoAcciones = (cell, row, rowIndex, extraData) => (
    <div className="d-flex justify-content-center align-items-center">
      <button className={"btn btn-Dark"} onClick={() => handleDelete(row)}>
        <FontAwesomeIcon
          icon={["far", "trash-alt"]}
          size="1x"
          style={{ color: "black" }}
        />
      </button>
      {/* <button className={"btn btn-Dark"}>
        <FontAwesomeIcon
          icon={["fas", "edit"]}
          size="1x"
          style={{ color: "black" }}
        />
      </button> */}
    </div>
  );

  const caretaOrden = (order, column) => {
    if (!order) {
      return (
        <div>
          <FontAwesomeIcon
            icon={["fas", "caret-down"]}
            size="1x"
            style={{ color: "black" }}
          />
          <FontAwesomeIcon
            icon={["fas", "caret-up"]}
            size="1x"
            style={{ color: "black" }}
          />
        </div>
      );
    } else if (order === "asc")
      return (
        <div>
          <FontAwesomeIcon
            icon={["fas", "caret-down"]}
            size="1x"
            style={{ color: "black" }}
          />
          <FontAwesomeIcon
            icon={["fas", "caret-up"]}
            size="1x"
            style={{ color: "red" }}
          />
        </div>
      );
    else if (order === "desc")
      return (
        <div>
          <FontAwesomeIcon
            icon={["fas", "caret-down"]}
            size="1x"
            style={{ color: "red" }}
          />
          <FontAwesomeIcon
            icon={["fas", "caret-up"]}
            size="1x"
            style={{ color: "black" }}
          />
        </div>
      );
    return null;
  };

  const onFormatoFecha = (cell) => {
    moment.locale("es");
    return moment(cell, moment.ISO_8601).format("L");
  };

  const keyid = "_id";
  const columnas = [
    {
      dataField: keyid,
      text: "Estudiante ID",
      sort: true,
      sortCaret: caretaOrden,
      headerStyle: {
        textAlign: "center",
      },
      classes: "fw-bold text-break text-wrap",
    },
    {
      dataField: "identificacion",
      text: "Identificación",
      sort: true,
      sortCaret: caretaOrden,
      headerStyle: {
        textAlign: "center",
      },
      classes: "fw-bold text-break text-wrap",
      editable: handleOnEdit,
      filter: textFilter({
        placeholder: "Identificación",
        style: { fontSize: "12px" },
      }),
    },
    {
      dataField: "nombre_completo",
      text: "Nombre",
      sort: true,
      sortCaret: caretaOrden,
      headerStyle: {
        textAlign: "center",
      },
      classes: "fw-bold text-break text-wrap",
      editable: handleOnEdit,
      filter: textFilter({
        placeholder: "Nombres",
        style: { fontSize: "12px" },
      }),
    },
    {
      dataField: "email",
      text: "Correo",
      sort: true,
      sortCaret: caretaOrden,
      headerStyle: {
        textAlign: "center",
      },
      classes: "fw-bold text-break text-wrap",
      editable: handleOnEdit,
      filter: textFilter({
        placeholder: "Correo",
        style: { fontSize: "12px" },
      }),
    },
    {
      dataField: "estado",
      text: "Estado",
      sort: true,
      sortCaret: caretaOrden,
      headerStyle: {
        textAlign: "center",
      },
      classes: "text-center",
      formatter: onFormatoEstado,
      editorRenderer: (
        editorProps,
        value,
        // eslint-disable-next-line no-unused-vars
        row,
        // eslint-disable-next-line no-unused-vars
        column,
        // eslint-disable-next-line no-unused-vars
        rowIndex,
        // eslint-disable-next-line no-unused-vars
        columnIndex
      ) => <CmbEstado {...editorProps} value={value} />,
      editable: handleOnEdit,
      filter: selectFilter({
        options: CmbEstado.filtro(),
        placeholder: "Seleccione",
        style: { fontSize: "12px" },
      }),
    },
    {
      dataField: "tipo_usuario",
      text: "Tipo de Usuario",
      sort: true,
      sortCaret: caretaOrden,
      headerStyle: {
        textAlign: "center",
      },
      classes: "text-center",

      formatter: onFormatoTipo,
      editorRenderer: (
        editorProps,
        value,
        // eslint-disable-next-line no-unused-vars
        row,
        // eslint-disable-next-line no-unused-vars
        column,
        // eslint-disable-next-line no-unused-vars
        rowIndex,
        // eslint-disable-next-line no-unused-vars
        columnIndex
      ) => <CmbTipo {...editorProps} value={value} />,
      editable: handleOnEdit,
      filter: selectFilter({
        options: CmbTipo.filtro(),
        placeholder: "Seleccione",
        style: { fontSize: "12px" },
      }),
    },
    {
      dataField: "fecha_ingreso",
      text: "Fecha ingreso",
      sort: true,
      sortCaret: caretaOrden,
      headerStyle: {
        textAlign: "center",
      },
      classes: "fw-bold text-break text-wrap text-center",
      editable: handleOnEdit,
      filter: textFilter({
        placeholder: "Fecha ingreso",
        style: { fontSize: "12px" },
      }),
      editor: {
        type: Type.DATE,
      },
      formatter: onFormatoFecha,
    },
    {
      dataField: "fecha_egreso",
      text: "Fecha egreso",
      sort: true,
      sortCaret: caretaOrden,
      headerStyle: {
        textAlign: "center",
      },
      classes: "fw-bold text-break text-wrap text-center",
      editable: handleOnEdit,
      filter: textFilter({
        placeholder: "Fecha egreso",
        style: { fontSize: "12px" },
      }),
      editor: {
        type: Type.DATE,
      },
      formatter: onFormatoFecha,
    },
    {
      dataField: "opciones",
      text: "Acciones",
      editable: false,
      formatter: onFormatoAcciones,
      formatExtraData: filaSeleccionadas,
      headerStyle: {
        textAlign: "center",
      },
    },
  ];

  return [keyid, columnas, filaSeleccionadas, setFilaSeleccionadas];
};

export default ModeloTabla;
