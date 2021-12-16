import React from "react";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";

const mostrarPaginacion = (from, to, size) => (
  <span className="react-bootstrap-table-pagination-total text-dark ps-2">
    Mostrando {from} a {to} de {size} resultados
  </span>
);

const paginacion = (datos) => ({
  paginationSize: 4,
  pageStartIndex: 0,
  // alwaysShowAllBtns: true, // Always show next and previous button
  // withFirstAndLast: false, // Hide the going to First and Last page button
  // hideSizePerPage: true, // Hide the sizePerPage dropdown always
  // hidePageListOnlyOnePage: true, // Hide the pagination list when only one page
  firstPageText: "Primera",
  prePageText: "Anterior",
  nextPageText: "Siguiente",
  lastPageText: "Última",
  nextPageTitle: "Primera",
  prePageTitle: "Página anterior",
  firstPageTitle: "Primera página",
  lastPageTitle: "Última página",
  showTotal: true,
  paginationTotalRenderer: mostrarPaginacion,
  disablePageTitle: true,
  sizePerPageList: [
    {
      text: "5",
      value: 5,
    },
    {
      text: "10",
      value: 10,
    },
    {
      text: "Todos",
      value: datos.length,
    },
  ],
});

export default paginacion;
