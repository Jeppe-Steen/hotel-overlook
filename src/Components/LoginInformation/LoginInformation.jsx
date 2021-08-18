import { useEffect, useState } from "react";

const LoginInformation = () => {
    const [username, setUsername] = useState('');

    const getInformation = () => {
        const information = JSON.parse(sessionStorage.getItem('token'))
        if(information) {
            setUsername(information.username)
        }
    }


    useEffect(() => {
        getInformation()
    }, [])

    return (
        <div>
            <h2>Dine Oplysninger</h2>
            <p>Du er nu logget ind som: {username ? username : null}</p>
            <p>Log ud</p>
        </div>
    )
}

export default LoginInformation;