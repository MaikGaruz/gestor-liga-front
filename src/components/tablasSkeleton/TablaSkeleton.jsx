import { TableContainer, Table, TableHead, TableBody, TableFooter, TableRow, TableCell, Paper, Skeleton } from '@mui/material';

/**
 * @param {string} entidad - Nombre de la entidad a mostrar en el esqueleto.
 * 
 * @returns {JSX.Element} Tabla de equipos o componente de carga.
 */
const TablaSkeleton = ({ entidad }) => {

    //Arreglo para que aparezcan filas sombreadas
    
    const skeletonRows = Array.from({ length: 5 });
    return (
        <>
            <TableContainer 
                component={Paper}
                sx={{ width: 800, margin: '0 auto'}}>
                <Table aria-label='tabla de carga'>
                    <TableHead>
                        <TableRow>
                            <TableCell colSpan={5} align='center'>{entidad}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {skeletonRows.map((_, index) => (
                            <TableRow key={index}>
                                <TableCell align='center'><Skeleton variant='rounded' /></TableCell>
                                <TableCell align='center'><Skeleton variant='rounded' /></TableCell>
                                <TableCell align='center'><Skeleton variant='rounded' /></TableCell>
                                <TableCell align='center'><Skeleton variant='rounded' /></TableCell>
                                <TableCell align='center'><Skeleton variant='rounded' /></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TableCell align='center' colSpan={5}><Skeleton variant='text' /></TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        </>
    );
}

export default TablaSkeleton;