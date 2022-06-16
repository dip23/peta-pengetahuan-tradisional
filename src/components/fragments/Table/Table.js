import React, { useMemo } from 'react';
import { useTable } from 'react-table';
import style from './styles.module.css';

export default function Table({ columnTable, dataTable }) {
  const columns = useMemo(() => columnTable, [columnTable])
  const data = useMemo(() => dataTable, [dataTable])

  const tableInstance = useTable({
    columns,
    data
  });

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = tableInstance;

  return (
    <table {...getTableProps()} className={style.root}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {data && rows.map((row) => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
