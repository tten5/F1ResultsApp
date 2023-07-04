import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';




export default function ResultTable(props: any) {
    const columns = props.columns
    const rows = props.rows


    return (
        <div>
            <div>
                {Object.keys(props.oneTarget).length === 0 ? <></> :
                    <div>
                        {Object.entries(props.oneTarget).map((item: any, index) => (
                            (index != 0 ?
                                <span key={index}>
                                    {item[0].toLocaleUpperCase()} : {item[1]} | {}
                                </span> : <p></p>
                            )

                        ))}
                    </div>}
            </div>
            <div className="centered-div">

                <Paper sx={{ width: '100%', overflow: 'auto' }}>
                    <TableContainer>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead >
                                <TableRow>
                                    {columns.map((column: any) => (
                                        <TableCell
                                            key={column.id}
                                            style={{
                                                // paddingLeft: "50px",
                                                minWidth: column.minWidth,
                                                background: "lightblue",
                                                fontWeight: "bold",
                                            }}
                                        >
                                            {column.label}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows
                                    .map((row: any) => {
                                        return (
                                            <TableRow hover role="checkbox" tabIndex={-1}>
                                                {columns.map((column: any) => {
                                                    const value = row[column.id];
                                                    return (
                                                        <TableCell key={column.id}>
                                                            {column.format && typeof value === 'number'
                                                                ? column.format(value)
                                                                : value}
                                                        </TableCell>
                                                    );
                                                })}
                                            </TableRow>
                                        );
                                    })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </div>
        </div>
    );
}