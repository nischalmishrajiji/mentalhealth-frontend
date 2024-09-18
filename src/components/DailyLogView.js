// src/components/DailyLogView.js
import React, { useEffect, useState } from 'react';
import { getDailyLogs } from '../api';
import { useTable, useSortBy, usePagination } from 'react-table';
import 'bootstrap/dist/css/bootstrap.min.css';

const DailyLogView = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await getDailyLogs();
        setLogs(response.data);
      } catch (error) {
        console.error(error);
        alert('Failed to fetch daily logs.');
      }
    };

    fetchLogs();
  }, []);

  const data = React.useMemo(() => logs, [logs]);
  const columns = React.useMemo(() => [
    {
      Header: 'Date',
      accessor: 'date', // accessor is the "key" in the data
    },
    {
      Header: 'Mood',
      accessor: 'moodRatings',
    },
    {
      Header: 'Anxiety',
      accessor: 'anxietyLevels',
    },
    {
      Header: 'Sleep Patterns',
      accessor: 'sleepPatterns',
    },
    {
      Header: 'Physical Activity',
      accessor: 'physicalActivity',
    },
    {
      Header: 'Social Interactions',
      accessor: 'socialInteractions',
    },
    {
      Header: 'Stress Levels',
      accessor: 'stressLevels',
    },
    {
      Header: 'Symptoms',
      accessor: 'symptomsOrDepressionOrAnxiety',
    },
  ], []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state: { pageIndex, pageSize },
    canPreviousPage,
    canNextPage,
    page,
    gotoPage,
    previousPage,
    nextPage,
    setPageSize,
    pageOptions,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    useSortBy,
    usePagination
  );

  return (
    <div className="container mt-5">
      <h2 className="text-center">Daily Logs</h2>
      <table {...getTableProps()} className="table table-striped">
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                      : ''}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div>
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>{' '}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </button>{' '}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </button>{' '}
        <button onClick={() => gotoPage(pageOptions.length - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>{' '}
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <select
          value={pageSize}
          onChange={e => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[5, 10, 20].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default DailyLogView;
