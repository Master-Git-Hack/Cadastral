import React, { useState } from "react";

function Rents(props: { title: string; columns: Array<any> }): JSX.Element {
  const { title, columns } = props;
  const baseColumns = {
    offer: 1,
    addresses: {
      street: "",
      internal_number: "",
      external_number: "",
      suburb: "",
      city: "",
    },
    rent_price: 1,
    date: new Date().toLocaleDateString(),
    antiquity: 1,
    characteristics: "",
    addNextRow: true,
  };

  return (
    <table className="table table-sm table-hover table-bordered">
      <thead className="table-light text-center align-self-middle align-middle">
        <th colSpan={1} scope="col">
          Oferta
        </th>
        <th colSpan={3} scope="col">
          Calle y Número
        </th>
        <th colSpan={2} scope="col">
          Colonia
        </th>
        <th colSpan={3} scope="col">
          Precio de Renta
        </th>
        <th colSpan={3} scope="col">
          Fecha
        </th>
        <th colSpan={1} scope="col">
          Edad
        </th>
        <th colSpan={3} scope="col">
          Tipo de Contrucción
        </th>
        <th colSpan={10} scope="col">
          Caracteísticas
        </th>
        <th colSpan={6} scope="col">
          Acciones
        </th>
      </thead>
      <tbody />
      <tfoot />
    </table>
  );
}

export default Rents;
