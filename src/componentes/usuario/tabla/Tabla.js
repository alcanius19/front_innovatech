/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import "react-bootstrap-table-next/style/react-bootstrap-table2.scss";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import paginationFactory from "react-bootstrap-table2-paginator";
import cellEditFactory from "react-bootstrap-table2-editor";
import paginacion from "./Paginacion";
import modelo_seleccion from "./ModeloSeleccion";
import { PropTypes } from "prop-types";
import overlayFactory from "react-bootstrap-table2-overlay";
import { Spinner } from "react-bootstrap";
import filterFactory, {
  FILTER_TYPES,
  Comparator,
} from "react-bootstrap-table2-filter";

const Tabla = ({
  datos,
  setDatos,
  modelo,
  modo,
  metodoSeleccion,
  alGuardarFilas,
  alBorrarFilas,
  datosOriginales,
  cargador,
}) => {
  const [keyid, columnas, filasSeleccionadas, setFilasSeleccionadas] = modelo(
    datos,
    setDatos,
    alBorrarFilas
  );
  // eslint-disable-next-line no-unused-vars
  const [opcionesSeleccion, seleccionar, setSeleccionar] = modelo_seleccion(
    modo,
    keyid,
    [filasSeleccionadas, setFilasSeleccionadas]
  );
  // eslint-disable-next-line no-unused-vars
  const [cargando, setCargando] = cargador;

  useEffect(() => {
    //console.log(filasSeleccionadas);
    if (filasSeleccionadas?.length && filasSeleccionadas.length > 0) {
      metodoSeleccion(filasSeleccionadas);
    }
  }, [filasSeleccionadas]);

  const onTableChange = (
    tipo,
    // eslint-disable-next-line no-unused-vars
    { page, sizePerPage, sortOrder, filters, data, cellEdit }
  ) => {
    /*Edición*/
    if (tipo === "cellEdit") {
      const nuevosDatos = [...datos].map((fila) => {
        const _fila = { ...fila };
        if (_fila[keyid] == cellEdit.rowId) {
          _fila[cellEdit.dataField] = cellEdit.newValue;
          alGuardarFilas(_fila);
        }
        return _fila;
      });
      setDatos([...nuevosDatos]);
    } else {
      // /* Filtro */
      let nuevosDatos = datosOriginales.filter((fila) => {
        let valid = true;
        for (const dataField in filters) {
          const { filterVal, filterType, comparator } = filters[dataField];

          if (filterType === FILTER_TYPES.TEXT) {
            if (comparator === Comparator.LIKE) {
              valid = fila[dataField].toString().indexOf(filterVal) > -1;
            } else {
              valid = fila[dataField] === filterVal;
            }
          } else if (filterType === FILTER_TYPES.SELECT) {
            if (comparator === Comparator.LIKE) {
              valid = fila[dataField].toString().indexOf(filterVal) > -1;
            } else {
              valid = fila[dataField] === filterVal;
            }
          }
          if (!valid) {
            break;
          }
        }
        return valid;
      });
      setDatos([...nuevosDatos]);
    }

    setFilasSeleccionadas(
      [...filasSeleccionadas].filter((fila) => fila[keyid] !== cellEdit.rowId)
    );
    setSeleccionar([...seleccionar].filter((id) => id != cellEdit.rowId));
  };
  // eslint-disable-next-line no-unused-vars
  const handleDataChange = ({ dataSize }) => {};

  const IndicacionSinDatos = () => <div>Sin resultados.</div>;

  return (
    <BootstrapTable
      remote={{ cellEdit: true, filter: true }}
      keyField={keyid}
      loading={cargando}
      data={datos}
      columns={columnas}
      selectRow={opcionesSeleccion}
      cellEdit={cellEditFactory({
        mode: "click",
        blurToSave: true,
      })}
      pagination={paginationFactory(paginacion(datos))}
      filter={filterFactory()}
      onTableChange={onTableChange}
      onDataSizeChange={handleDataChange}
      noDataIndication={() => <IndicacionSinDatos />}
      overlay={overlayFactory({
        spinner: <Spinner animation="border" variant="dark" />,
        styles: {
          overlay: (base) => ({
            ...base,
            background: "rgba(255, 255, 255, 0.9)",
          }),
        },
      })}
      striped
      hover
      condensed
    />
  );
};

Tabla.propTypes = {
  datos: PropTypes.array.isRequired,
  setDatos: PropTypes.func.isRequired,
  modelo: PropTypes.func.isRequired,
  modo: PropTypes.string.isRequired,
  metodoSeleccion: PropTypes.func.isRequired,
  alGuardarFilas: PropTypes.func,
  alBorrarFilas: PropTypes.func,
  datosOriginales: PropTypes.array,
  cargador: PropTypes.array.isRequired,
};

export default Tabla;
