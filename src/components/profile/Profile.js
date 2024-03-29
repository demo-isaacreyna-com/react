import React, { useState } from 'react';
import UserService from '../../services/user-service';

export default function Profile(props) {
    const [user, setUser] = useState({
        username: '',
        first_name: '',
        last_name: '',
        password: '',
    });

    React.useEffect(() => {
        const username = props.match.params.username || 'jsmith';

        UserService.profile(username).then((response) => {
            if (response.data) {
                setUser(response.data);
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <h1>Profile</h1>
            <p>Username: {UserService.getUsername()}</p>
            <p>First Name: {user.first_name}</p>
            <p>Last Name: {user.last_name}</p>
            <p>Password: {user.password}</p>
            <p>Token: {UserService.getToken()}</p>
        </>
    );
}
