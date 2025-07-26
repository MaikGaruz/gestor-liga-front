import EquiposTabla from "../components/gestion/equipos/EquiposTabla";
import JugadoresTabla from "../components/gestion/jugadores/JugadoresTabla";
import ArbitrosTabla from "../components/gestion/arbitros/ArbitrosTabla";

const Gestion = () =>{
    
    return(
        <>
        <EquiposTabla />       
        <br /> 
        <JugadoresTabla />
        <br />
        <ArbitrosTabla />
        <br />
        </>
    );
}

export default Gestion;