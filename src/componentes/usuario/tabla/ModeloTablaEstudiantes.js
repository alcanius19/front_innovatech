/* eslint-disable no-unused-vars */
import React, { useState, useRef, forwardRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form } from "react-bootstrap";
import { PropTypes } from "prop-types";

const ModeloTabla = (datosTabla, setDatosTabla, alBorrarFilas) => {
  const [filaSeleccionadas, setFilaSeleccionadas] = useState([]);

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
        alBorrarFilas();
      }
    }
  };

  // eslint-disable-next-line no-unused-vars
  const alGuardarFilas = (filas) => {
    return filas;
  };

  // eslint-disable-next-line no-unused-vars
  const onFormatoEstado = (cell, row, rowIndex, extraData) => (
    <div
      className={`m-0 fw-bold badge fs-6 ${
        cell == "autorizado"
          ? "bg-success"
          : cell == "pendiente"
          ? "bg-primary"
          : "bg-danger"
      } text-center`}
      style={{ width: "8rem" }}
    >
      {cell === "autorizado"
        ? "Autorizado"
        : cell === "pendiente"
        ? "Pendiente"
        : cell === "inactivo"
        ? "Inactivo"
        : "Otro"}
    </div>
  );
  // eslint-disable-next-line no-unused-vars
  const CheckEstado = forwardRef(({ value, onUpdate, ...rest }, ref) => {
    const toggleRef = useRef(null);
    const getValue = () => {
      return toggleRef.current?.value;
    };
    return (
      <div className="d-flex justify-content-center align-items-center">
        <Form.Select
          aria-label="estado"
          id="dropdown-basic"
          {...rest}
          ref={toggleRef}
          variant="outline-primary"
          value={getValue()}
          onChange={(e) => onUpdate(e.currentTarget.value)}
          className="fw-bold text-break fs-6"
        >
          <option value="autorizado">Autorizado</option>
          <option value="pendiente">Pendiente</option>
          <option value="inactivo">Inactivo</option>
          <option value="Otro">Otro</option>
        </Form.Select>
      </div>
    );
  });
  CheckEstado.displayName = "CheckEstado";
  CheckEstado.propTypes = {
    value: PropTypes.string,
    onUpdate: PropTypes.func,
  };

  // eslint-disable-next-line no-unused-vars
  const onFormato = (cell, row, rowIndex, extraData) => (
    <div className="d-flex justify-content-center align-items-center">
      <button className={"btn btn-Dark"} onClick={() => handleDelete(row)}>
        <FontAwesomeIcon
          icon={["far", "trash-alt"]}
          size="1x"
          style={{ color: "black" }}
        />
      </button>
      <button className={"btn btn-Dark"}>
        <FontAwesomeIcon
          icon={["fas", "edit"]}
          size="1x"
          style={{ color: "black" }}
        />
      </button>
    </div>
  );

  const keyid = "_id";
  const columnas = [
    {
      dataField: keyid,
      text: "Estudiante ID",
      sort: true,
      headerStyle: {
        textAlign: "center",
      },
      classes: "fw-bold text-break text-wrap fs-6",
    },
    {
      dataField: "identificacion",
      text: "Identificación",
      sort: true,
      headerStyle: {
        textAlign: "center",
      },
      classes: "fw-bold text-break text-wrap fs-6",
      editable: handleOnEdit,
    },
    {
      dataField: "nombre_completo",
      text: "Nombre",
      sort: true,
      headerStyle: {
        textAlign: "center",
      },
      classes: "fw-bold text-break text-wrap fs-6",
      editable: handleOnEdit,
    },

    {
      dataField: "email",
      text: "Correo",
      headerStyle: {
        textAlign: "center",
      },
      classes: "fw-bold text-break text-wrap fs-6",
      editable: handleOnEdit,
    },
    {
      dataField: "estado",
      text: "Estado",
      headerStyle: {
        textAlign: "center",
      },
      classes: "text-center",
      formatter: onFormatoEstado,
      editorRenderer: (
        editorProps,
        value,
        row,
        column,
        rowIndex,
        columnIndex
      ) => <CheckEstado {...editorProps} value={value} />,
      editable: handleOnEdit,
    },
    {
      dataField: "opciones",
      text: "...",
      editable: false,
      formatter: onFormato,
      formatExtraData: filaSeleccionadas,
      headerStyle: {
        textAlign: "center",
      },
    },
  ];

  return [
    keyid,
    columnas,
    alGuardarFilas,
    filaSeleccionadas,
    setFilaSeleccionadas,
  ];
};

export default ModeloTabla;
