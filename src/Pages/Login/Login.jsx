import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import LoginForm from "../../Components/LoginForm/LoginForm";
import LoginInformation from '../../Components/LoginInformation/LoginInformation';

const Login = () => {

    const loginData = JSON.parse(sessionStorage.getItem('token'));
    const history = useHistory();

    const checkLoggedIn = () => {
        if(loginData) {
            history.push('/admin');
        }
    };

    useEffect(() => {
        checkLoggedIn()
    }, []);

    return (
        <main className="main_divided">
            <div className="divided_content">
                <section className="section">
                    <p>navigation overview</p>
                    <LoginForm />
                </section>
                <aside className="aside">
                    {/* skal rykkes over på admin siden */}
                    <LoginInformation />
                </aside>
            </div>
        </main>
    )
}

export default Login;