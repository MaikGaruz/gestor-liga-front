import { TableContainer, Table, TableHead, TableBody, TableFooter, TableRow, TableCell, Paper, IconButton } from '@mui/material';
import { obtenerEquiposService } from '../../../services/equiposService';
import { useEffect, useState } from 'react';
import TablaSkeleton from '../../tablasSkeleton/TablaSkeleton';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';

/**
 * Renderiza una tabla con la información de los equipos obtenida desde el servidor.
 * Muestra un esqueleto de carga mientras se obtienen los datos.
 * 
 * @component
 * @returns {JSX.Element} Tabla de equipos o componente de carga.
 */
const EquiposTabla = () => {

    // Estado que almacena la lista de equipos
    const [equipos, setEquipos] = useState([]);

    // Estado que indica si los datos aún están cargando
    const [cargando, setCargando] = useState(true);


    /**
     * Solicita los datos de equipos al servidor y los guarda en el estado.
     * Si la respuesta es exitosa (200), se actualiza el estado y se desactiva la carga.
     */
    async function obtenerEquipos() {
        try {
            const equiposResponse = await obtenerEquiposService();

            if (equiposResponse.status === 200) {
                setEquipos(equiposResponse.data.content);
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
        obtenerEquipos();

        const intervalo = setInterval(obtenerEquipos, 5000);

        return () => clearInterval(intervalo);
    }, []);


    return (
        cargando ?
            (
                <TablaSkeleton entidad={"Equipos"} />
            ) :
            (
                <div>
                    <TableContainer
                        component={Paper}
                        sx={{ width: 1000, margin: '0 auto', opacity: 0.8}}>
                        <Table aria-label='tabla equipos'>
                            <TableHead>
                                <TableRow>
                                    <TableCell colSpan={5} align='center'>Equipos</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align='center'>Nombre</TableCell>
                                    <TableCell align='center'>Fecha de Ingreso</TableCell>
                                    <TableCell align='center'>Categoria</TableCell>
                                    <TableCell align='center'>Género</TableCell>
                                    <TableCell align='center'>Acción</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {equipos.map((equipo) => (
                                    <TableRow key={equipo.idEquipo}>
                                        <TableCell align='center'>{equipo.nomEquipo}</TableCell>
                                        <TableCell align='center'>{equipo.fechaIngresoEquipo}</TableCell>
                                        <TableCell align='center'>{equipo.nomCategoria}</TableCell>
                                        <TableCell align='center'>{equipo.nomGenero}</TableCell>
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

export default EquiposTabla;