import React, { useMemo } from 'react';
import { useTable } from 'react-table';
import Loader from '../../elements/Loader';
import style from './styles.module.css';

export default function Table({ columnTable, dataTable, isLoading }) {
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
        {data.length > 0 ? (
          rows.map((row) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            );
          })
        ) : isLoading ? (
          <tr>
            <td className={style.oneRow} colSpan={columns.length}>
              <Loader/>
            </td>
          </tr>
        ) : (
          <tr>
            <td className={style.oneRow} colSpan={columns.length}>
              Data Belum Ada
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
