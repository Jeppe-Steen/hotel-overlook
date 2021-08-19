import { useState } from "react";
import { useEffect } from "react/cjs/react.development";
import LoginInformation from "../../Components/LoginInformation/LoginInformation";
import { doFetch } from "../../Helpers/Fetching";

import Style from './Admin.module.scss';

const Admin = () => {
    const [reservationsList, setReservationsList] = useState([]);

    const fetchingData = async () => {
        const userData = JSON.parse(sessionStorage.getItem('token'))
        const url = `https://api.mediehuset.net/overlook/reservations/list_by_user/${userData.user_id}`;
        const fetchedData = await doFetch(url, 'GET', null, userData.access_token);
        setReservationsList(fetchedData);
    } 


    useEffect(() => {
        fetchingData();
    }, [])


    return (
        <main className="main_divided">
            <div className="divided_content">
                <section className="section">
                    <header>
                        <h2 className={Style.admin_h2}>Administrer reservationer</h2>
                        <p className={Style.admin_p}>Her kan du ændre og afbestille dine reservationer</p>
                    </header>
                    <article className={Style.admin_article}>
                        <header className={Style.admin_article_header}>
                            <p>Hotel- og værelsestype</p>
                            <p>Dato</p>
                            <p>Handling</p>
                        </header>
                        {reservationsList && reservationsList.map((item, index) => {
                            return (
                                <div className={Style.admin_div}>
                                    <p>{item.hotel_title} - {item.room_title}</p>
                                    <p>{item.checkin_date} - {item.checkin_date}</p>
                                    <p>Slet</p>
                                </div>
                            )
                        })}
                    </article>
                </section>
                <aside className="aside">
                    <LoginInformation />
                </aside>
            </div>
        </main>
    )
}

export default Admin;