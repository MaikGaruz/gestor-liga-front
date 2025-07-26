import { TableContainer, Table, TableHead, TableBody, TableFooter, TableRow, TableCell, Paper, IconButton } from '@mui/material';
import { obtenerJugadoresService } from '../../../services/jugadoresService';
import { useEffect, useState } from 'react';
import TablaSkeleton from '../../tablasSkeleton/TablaSkeleton';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';

/**
 * Renderiza una tabla con la información de los jugadores obtenida desde el servidor.
 * Muestra un esqueleto de carga mientras se obtienen los datos.
 * 
 * @component
 * @returns {JSX.Element} Tabla de jugadores o componente de carga.
 */
const JugadoresTabla = () => {
    // Estado que almacena la lista de jugadores
    const [jugadores, setJugadores] = useState([]);

    // Estado que indica si los datos aún están cargando
    const [cargando, setCargando] = useState(true);


    /**
     * Solicita los datos de jugadores al servidor y los guarda en el estado.
     * Si la respuesta es exitosa (200), se actualiza el estado y se desactiva la carga.
     */
    async function obtenerJugadores() {
        try {
            const jugadoresResponse = await obtenerJugadoresService();

            if (jugadoresResponse.status === 200) {
                setJugadores(jugadoresResponse.data.content);
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
        obtenerJugadores();

        const intervalo = setInterval(obtenerJugadores, 5000);

        return () => clearInterval(intervalo);
    }, []);


    return (
        cargando ?
            (
                <TablaSkeleton entidad={"Jugadores"} />
            ) :
            (
                <div>
                    <TableContainer 
                        component={Paper}
                        sx={{ width: 1000, margin: '0 auto', opacity: 0.8}}>
                        <Table aria-label='tabla jugadores'>
                            <TableHead>
                                <TableRow>
                                    <TableCell colSpan={7} align='center'>Jugadores</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align='center'>Nombre</TableCell>
                                    <TableCell align='center'>Edad</TableCell>
                                    <TableCell align='center'>Teléfono</TableCell>
                                    <TableCell align='center'>Condición Médica</TableCell>
                                    <TableCell align='center'>Fecha de Nacimiento</TableCell>
                                    <TableCell align='center'>Género</TableCell>
                                    <TableCell align='center'>Acción</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {jugadores.map((jugador) => (
                                    <TableRow key={jugador.idJugador}>
                                        <TableCell align='center'>{jugador.nomJugador}</TableCell>
                                        <TableCell align='center'>{jugador.edadJugador}</TableCell>
                                        <TableCell align='center'>{jugador.numTelJugador}</TableCell>
                                        <TableCell align='center'>{jugador.condMedJugador}</TableCell>
                                        <TableCell align='center'>{jugador.fechaNacJugador}</TableCell>
                                        <TableCell align='center'>{jugador.nomGenero}</TableCell>
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

export default JugadoresTabla;