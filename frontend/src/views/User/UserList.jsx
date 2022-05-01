import { Link } from 'react-router-dom';

const users = [
    {
        id: 1,
        nickname: 'user1',
        phone_num: '123456'
    },
    {
        id: 2,
        nickname: 'user3',
        phone_num: '123456'
    },
    {
        id: 3,
        nickname: 'donde esta el 2',
        phone_num: '123456'
    }
];


const UserList = () => {
    return(
        <section className='container'>
            <Link to='/'>Inicio</Link>
            <h2>Usuarios</h2>
            {users.map((user) => (
                <div key={user.id}>
                    <Link to={`/users/${user.id}`}>{`${user.nickname}`}</Link>
                </div>
            ))}
        </section>
    )
};

export default UserList;