// eslint-disable-next-line no-unused-vars

import { useState } from "react";

const ModeloSeleccion = (modo, keyid, ganchoFilaSeleccionada) => {
  const [filaSeleccionada, setFilaSeleccionada] = ganchoFilaSeleccionada;
  const [seleccionarFila, setSeleccionarFila] = useState([]);

  // eslint-disable-next-line no-unused-vars
  const handleOnSelect = (fila, isSelect, _rowIndex, _e) => {
    if (isSelect) {
      setSeleccionarFila([...seleccionarFila, fila[keyid]]);
      setFilaSeleccionada([...filaSeleccionada, fila]);
    } else {
      setFilaSeleccionada(
        [...filaSeleccionada].filter((item) => item !== fila)
      );
      setSeleccionarFila([...seleccionarFila].filter((x) => x !== fila[keyid]));
    }
  };

  // eslint-disable-next-line no-unused-vars
  const handleOnSelectAll = (isSelect, rows, e) => {
    const ids = rows.map((r) => r[keyid]);
    if (isSelect) {
      setSeleccionarFila(ids);
      setFilaSeleccionada(rows);
    } else {
      setSeleccionarFila([]);
      setFilaSeleccionada([]);
    }
  };

  const seleccionar = {
    mode: modo,
    clickToSelect: false,
    clickToEdit: false,
    selected: seleccionarFila,
    onSelect: handleOnSelect,
    onSelectAll: handleOnSelectAll,
  };

  return [seleccionar, seleccionarFila, setSeleccionarFila];
};

export default ModeloSeleccion;
