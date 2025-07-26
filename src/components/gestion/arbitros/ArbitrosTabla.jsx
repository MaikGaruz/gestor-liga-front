import { TableContainer, Table, TableHead, TableBody, TableFooter, TableRow, TableCell, Paper, IconButton } from '@mui/material';
import { obtenerArbitrosService } from '../../../services/arbitrosService';
import { useEffect, useState } from 'react';
import TablaSkeleton from '../../tablasSkeleton/TablaSkeleton';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';

/**
 * Renderiza una tabla con la información de los arbitros obtenida desde el servidor.
 * Muestra un esqueleto de carga mientras se obtienen los datos.
 * 
 * @component
 * @returns {JSX.Element} Tabla de árbitros o componente de carga.
 */
const ArbitrosTabla = () => {
    // Estado que almacena la lista de arbitros
    const [arbitros, setArbitros] = useState([]);

    // Estado que indica si los datos aún están cargando
    const [cargando, setCargando] = useState(true);


    /**
     * Solicita los datos de arbitros al servidor y los guarda en el estado.
     * Si la respuesta es exitosa (200), se actualiza el estado y se desactiva la carga.
     */
    async function obtenerArbitros() {
        try {
            const arbitrosResponse = await obtenerArbitrosService();

            if (arbitrosResponse.status === 200) {
                setArbitros(arbitrosResponse.data.content);
                setCargando(false);
            }

        } catch (e) {
            console.log(e)
        }
    }

    /**
     * Hook que obtiene los datos al montar el componente y los actualiza cada 5 segundos.
     * Limpia el intervalo al desmontar el componente.
     */
    useEffect(() => {
        obtenerArbitros();

        const intervalo = setInterval(obtenerArbitros, 5000);

        return () => clearInterval(intervalo);
    }, []);


    return (
        cargando ?
            (
                <TablaSkeleton entidad={"Arbitros"} />
            ) :
            (
                <div>
                    <TableContainer
                        component={Paper}
                        sx={{ width: 1000, margin: '0 auto', opacity: 0.8 }}>
                        <Table aria-label='tabla arbitros'>
                            <TableHead>
                                <TableRow>
                                    <TableCell colSpan={6} align='center'>Arbitros</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align='center'>Nombre</TableCell>
                                    <TableCell align='center'>Edad</TableCell>
                                    <TableCell align='center'>Teléfono</TableCell>
                                    <TableCell align='center'>No. de Partidos</TableCell>
                                    <TableCell align='center'>Género</TableCell>
                                    <TableCell align='center'>Acción</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {arbitros.map((arbitro) => (
                                    <TableRow key={arbitro.idArbitro}>
                                        <TableCell align='center'>{arbitro.nomArbitro}</TableCell>
                                        <TableCell align='center'>{arbitro.edadArbitro}</TableCell>
                                        <TableCell align='center'>{arbitro.numTelArbitro}</TableCell>
                                        <TableCell align='center'>{arbitro.numPartArbitro}</TableCell>
                                        <TableCell align='center'>{arbitro.nomGenero}</TableCell>
                                        <TableCell align='center'>
                                            <IconButton aria-label='eliminar'>
                                                <DeleteForeverIcon color='error' />
                                            </IconButton>
                                            <IconButton aria-label='modificar'>
                                                <EditIcon color='warning' />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                            <TableFooter>
                            </TableFooter>
                        </Table>
                    </TableContainer>
                </div>
            )
    );
}

export default ArbitrosTabla;