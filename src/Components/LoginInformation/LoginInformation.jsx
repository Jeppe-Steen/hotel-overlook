import { useEffect, useState } from "react";
import { useHistory } from "react-router";

const LoginInformation = () => {
    const [username, setUsername] = useState('');
    const history = useHistory();

    const getInformation = () => {
        const information = JSON.parse(sessionStorage.getItem('token'))
        if(information) {
            setUsername(information.username)
        }
    }

    const logOut = () => {
        sessionStorage.removeItem('token');
        history.push('/forside')
    }


    useEffect(() => {
        getInformation()
    }, [])

    return (
        <div>
            <h2>Dine Oplysninger</h2>
            <p>Du er nu logget ind som: {username ? username : null}</p>
            <button type="button" onClick={logOut}>Log ud</button>
        </div>
    )
}

export default LoginInformation;