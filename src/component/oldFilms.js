import axios from 'axios';
import React from 'react';
import { useEffect, useState } from 'react';
import { useTable, useSortBy, useFilters, usePagination } from 'react-table'
import { ColumnFilter } from './ColumnFilter';
import '../styles/films.module.css';

function Films() {

    const [films, setFilms] = useState([]);

    useEffect(() => {
        axios
            .get('http://localhost:8000/films')
            .then((response) => {
                setFilms(response.data);
            });
    }, []);

    const columns = React.useMemo(
        () => [
            {
                Header: 'Title',
                accessor: 'title',
                className: 'title'
            },
            {
                Header: 'Length',
                accessor: 'length',
                disableFilters: true
            },
            {
                Header: 'Rating',
                accessor: 'rating',
                disableFilters: true
            }
        ],
        []
    );
    
    
    const defaultColumn = React.useMemo(
        () => ({
            Filter: ColumnFilter,
        }),
        []
    );
    

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        page,
        pageOptions,
        state: {pageIndex, pageSize},
        previousPage,
        nextPage,
        canPreviousPage,
        canNextPage,
        pageCount,
        gotoPage,
        setPageSize,
    } = useTable(
        {
            columns,
            data: films,
            defaultColumn
        },
        useFilters,
        useSortBy,
        usePagination
    );

    return (
        <div className='films'>
            <div>
                <h1>Left side!</h1>
                <p>This is the section on the left side!</p>
            </div>
            <div>
                <div className='tableDiv'>
                    <table {...getTableProps()}>
                        <thead>
                            {headerGroups.map(headerGroup => (
                                <tr {...headerGroup.getFooterGroupProps()}>
                                    {headerGroup.headers.map(column => (
                                        <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                            {column.render('Header')}
                                            <span>
                                                {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                                            </span>
                                            <div>{column.canFilter ? column.render('Filter') : null}</div>
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        <tbody {...getTableBodyProps()}>
                            {page.map(row => {
                                prepareRow(row)
                                return (
                                    <tr {...row.getRowProps()}>
                                        {row.cells.map(cell => {
                                            return <td {...cell.getCellProps({
                                                className: cell.column.className
                                            })}>{cell.render('Cell')}</td>
                                        })}
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
                <div className='pagination'>
                    <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                        {"<<"}
                    </button>{" "}
                    <button onClick={() => previousPage()} disabled={!canPreviousPage}>
                        {"<"}
                    </button>{" "}
                    <button onClick={() => nextPage()} disabled={!canNextPage}>
                        {">"}
                    </button>{" "}
                    <span>
                        Page{" "}
                        <strong>
                            {pageIndex + 1} of {pageOptions.length}
                        </strong>{" "}
                    </span>
                    <span>
                        | Go to page:{""}
                        <input
                            type="number"
                            defaultValue={pageIndex + 1}
                            onChange={(e) => {
                                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                                gotoPage(page);
                            }}
                            style={{ width: "50px"}}
                        />
                    </span>
                    <select
                        value={pageSize}
                        onChange={(e) => {
                            setPageSize(Number(e.target.value));
                        }}
                    >
                        {[10, 20, 30, 40, 50].map((pageSize) => (
                            <option key={pageSize} value={pageSize}>
                                Show {pageSize}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
}

export default Films;