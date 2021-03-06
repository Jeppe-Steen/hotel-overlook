import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import BurgerMenu from '../BurgerMenu/BurgerMenu';

import Style from './Navigation.module.scss';

const Navigation = () => {
    const [menuActive, setMenuActive] = useState(false);

    const navigationList = [
        {print: 'Forside', path: '/forside'},
        {print: 'Hoteller & Destinationer', path: '/destinationer'},
        {print: 'Værelser', path: '/værelser'},
        {print: 'Reservation', path: '/reservation'},
        {print: 'Login', path: '/login'},
    ]

    const handleClick = () => (
        setMenuActive(false)
    );

    return (
        <header className={Style.pageNavigation}>
            <p className={Style.logo}>HOTEL OVERLOOK</p>
            <nav className={menuActive ? `${Style.pageNavigation_nav} ${Style.active}` : Style.pageNavigation_nav}>
                <ul className={Style.pageNavigation_ul}>
                    {navigationList.map((item, index) => {
                        return (
                            <li key={index} className={Style.pageNavigation_li}>
                                <Link onClick={handleClick} to={item.path} className={Style.pageNavigation_link}>{item.print}</Link>
                            </li>
                        )
                    })}
                </ul>
            </nav>

            <BurgerMenu menuActive={menuActive} setMenuActive={setMenuActive}/>
        </header>    
    )
}

export default Navigation;