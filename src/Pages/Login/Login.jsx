import LoginForm from "../../Components/LoginForm/LoginForm";
import LoginInformation from '../../Components/LoginInformation/LoginInformation';

const Login = () => {
    return (
        <main className="main_divided">
            <div className="divided_content">
                <section className="section">
                    <p>navigation overview</p>
                    <LoginForm />
                </section>
                <aside className="aside">
                    <LoginInformation />
                </aside>
            </div>
        </main>
    )
}

export default Login;