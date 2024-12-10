import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Item } from '../interface/Item';
import { useEffect, useState } from 'react';
import { MyProp } from "../interface/MyProp";

export default function BasicTable(props: MyProp) {
    const [rows, setRows] = useState<Item[]>([]);

    useEffect(() => {
        setRows(props.itemsIn);
    }, [props]);

    return (
        <TableContainer component={Paper}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Hora de inicio</TableCell>
                        <TableCell>Hora de fin</TableCell>
                        <TableCell>Probabilidad de Precipitación</TableCell>
                        <TableCell>Humedad</TableCell>
                        <TableCell>Nubosidad</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row, idx) => (
                        <TableRow
                            key={idx}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.dateStart}
                            </TableCell>
                            <TableCell component="th" scope="row">
                                {row.dateEnd}
                            </TableCell>
                            <TableCell component="th" scope="row">
                                {row.precipitation} %
                            </TableCell>
                            <TableCell component="th" scope="row">
                                {row.humidity} %
                            </TableCell>
                            <TableCell component="th" scope="row">
                                {row.clouds} %
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
