import { Link, useParams } from 'react-router-dom';
import Locations from '../../components/Positions/Positions';

const UserDetail = () => {
    const { id } = useParams();
    return(
        <section className="container">
            <Link to='/'>Inicio</Link>
            <h2>{`Usuario ${id}`}</h2>
            <h3>Posiciones del Usuario:</h3>
            <Locations />


        </section>
    )
};

export default UserDetail;

