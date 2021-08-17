import { Link } from 'react-router-dom';
import Style from './Footer.module.scss';

const Footer = () => {
    const navigationList = [
        {print: 'Forside', path: '/forside'},
        {print: 'Hoteller & Destinationer', path: '/destinationer'},
        {print: 'Værelser', path: '/værelser'},
        {print: 'Reservation', path: '/reservation'},
        {print: 'Login', path: '/login'},
    ]

    return (
        <footer className={Style.pageFooter}>
            <p>copyright</p>
            <span>
                <p>social icon</p>
                <p>social icon</p>
            </span>
            <nav className={Style.pageFooter_nav}>
                <ul className={Style.pageFooter_ul}>
                    {navigationList.map((item, index) => {
                        return (
                            <li className={Style.pageFooter_li} key={index}>
                                <Link className={Style.pageFooter_link} to={item.path}>
                                    {item.print}
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </nav>
        </footer>
    )
}

export default Footer;