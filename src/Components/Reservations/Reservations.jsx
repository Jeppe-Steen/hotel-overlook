import { useHistory } from 'react-router-dom';
import { useEffect } from 'react/cjs/react.development';
import Style from './Reservations.module.scss';

import { doFetch }from '../../Helpers/Fetching';

const Reservations = () => {

    const reservationData = {
        userId: null,
        destination: '',
        room: '',
        number: null,
        isFlex: false,
        checkIn: '',
        checkOut: '',
        firstName: '',
        lastName: '',
        mail: '',
        phone: '',
        comment: '',
        accept: false,
    }

    const userData = JSON.parse(sessionStorage.getItem('token'));

    const history = useHistory();

    const getUserData = () => {
        if(!userData) {
            history.push('/login')
        }
    }

    const convertToTimestamp = (val) => {
        const timestamp = Date.parse(val)
        return timestamp / 1000;
    }

    useEffect(() => {
        getUserData();
    }, [])

    const handleSubmit = () => {
        console.log(reservationData)

        const required_fields = [...document.querySelectorAll('.required')];

        let canBeSubmitted = true;

        for (let item of required_fields) {
            if(!item.value) {
                const errorMessage = document.createElement("p");
                item.appendChild(errorMessage)
                errorMessage.innerHTML = 'heeey';
                item.style.border = '1px solid red';

                canBeSubmitted = false
                return
            }
        }

        if(!reservationData.accept){
            canBeSubmitted = false;
            return
        }

        if(canBeSubmitted) {
            const getUserId = JSON.parse(sessionStorage.getItem('token'));
            reservationData.userId = getUserId.user_id;

            const handleSublit = async () => {
                let formData = new FormData();
                    formData.append('user_id', reservationData.userId);
                    formData.append('hotel_id', reservationData.destination);
                    formData.append('room_id', reservationData.room);
                    formData.append('is_flex', reservationData.isFlex);
                    formData.append('num_persons', reservationData.number);
                    formData.append('checkin', reservationData.checkIn);
                    formData.append('checkout', reservationData.checkOut);
                    formData.append('firstname', reservationData.firstName);
                    formData.append('lastname', reservationData.lastName);
                    formData.append('email', reservationData.mail);
                    formData.append('phone', reservationData.phone);
                    formData.append('comment', reservationData.comment);

                const url = `https://api.mediehuset.net/overlook/reservations`;
                const postReservation = await doFetch(url, 'POST', formData, getUserId.access_token)

                history.push('/admin')
            }

            handleSublit();
        }
    }

    const resetErrorMessage = () => {
        const required_fields = [...document.querySelectorAll('.required')];
        required_fields.forEach(element => element.style.border = 'none');
    };

    return (
        <section className={`section ${Style.reservations}`}>
            <header>
                <h2 className={Style.reservations_h2}>Reservation</h2>
                <p className={Style.reservations_subHeader}>Udfyld nedenstående formular for at reservere et af vores værelser.</p>
            </header>
            <form>
                <div className={Style.reservations_formGroup}>
                    <select className={`${Style.fullWidth} ${Style.reservations_input} required`} onClick={resetErrorMessage} onChange={(e) => {reservationData.destination = e.target.value}}>
                        <option value="" selected disabled>Vælg destination & hotel</option>
                        <option value="1">1</option>
                    </select>
                </div>

                <div className={Style.reservations_formGroup}>
                    <select className={`${Style.halfWidth} ${Style.reservations_input} required`} onClick={resetErrorMessage} onChange={(e) => {reservationData.room = e.target.value}}>
                        <option value="" selected disabled>Vælg værelsestype</option>
                        <option value="1">1</option>
                    </select>

                    <select className={`${Style.halfWidth} ${Style.reservations_input} required`} onClick={resetErrorMessage} onChange={(e) => {reservationData.number = e.target.value}}>
                        <option value="" selected disabled>Vælg antal personer</option>
                        <option value="1">1</option>
                        <option value="1">2</option>
                        <option value="1">3</option>
                    </select>
                </div>

                <div className={Style.reservations_formGroup}>
                    <p>Vælg prisklasse:</p>
                    <label htmlFor="normal">Normal</label>
                        <input type="radio" id="normal" name="isFlex" value="false" checked onClick={(e) => {reservationData.isFlex = e.target.value}}/>
                    <label htmlFor="flex">Flex</label>
                        <input type="radio" id="flex" name="isFlex" value="true" onClick={(e) => {reservationData.isFlex = e.target.value}}/>
                </div>

                <div className={Style.reservations_formGroup}>
                    <input className={`${Style.halfWidth} ${Style.reservations_input} required`} type="date" placeholder="Check-in date" onClick={resetErrorMessage} onChange={(e) => {reservationData.checkIn = convertToTimestamp(e.target.value)}}/>
                    <input className={`${Style.halfWidth} ${Style.reservations_input} required`} type="date" placeholder="Check-out date" onClick={resetErrorMessage} onChange={(e) => {reservationData.checkOut = convertToTimestamp(e.target.value)}}/>
                </div>

                <div className={Style.reservations_formGroup}>
                    <input className={`${Style.fullWidth} ${Style.reservations_input} required`} type="text" placeholder="Fornavn" onClick={resetErrorMessage} onKeyUp={(e) => {reservationData.firstName = e.target.value}}/>
                </div>
                
                <div className={Style.reservations_formGroup}>
                    <input className={`${Style.fullWidth} ${Style.reservations_input} required`} type="text" placeholder="Efternavn(e)" onClick={resetErrorMessage} onKeyUp={(e) => {reservationData.lastName = e.target.value}}/>
                </div>

                <div className={Style.reservations_formGroup}>
                    <input className={`${Style.halfWidth} ${Style.reservations_input} required`} type="text" placeholder="Email" onClick={resetErrorMessage} onKeyUp={(e) => {reservationData.mail = e.target.value}}/>
                    <input className={`${Style.halfWidth} ${Style.reservations_input} required`} type="text" placeholder="Telefon" onClick={resetErrorMessage} onKeyUp={(e) => {reservationData.phone = e.target.value}}/>
                </div>

                <div className={Style.reservations_formGroup}>
                    <textarea className={`${Style.fullWidth} ${Style.reservations_input}`} placeholder="Kommentarer" onClick={resetErrorMessage} onKeyUp={(e) => {reservationData.comment = e.target.value}}></textarea>
                </div>

                <div className={Style.reservations_formGroup}>
                    <input type="checkbox" onClick={() => {reservationData.accept = !reservationData.accept}} />
                    <label>Jeg accepterer hermed Overlooks betingelser (sæt kryds)</label>
                </div>

                <div className={Style.reservations_formGroup}>
                    <button className={`${Style.halfWidth} ${Style.reservations_button}`} type="button" onClick={handleSubmit}>Send reservation</button>
                    <button className={`${Style.halfWidth} ${Style.reservations_button}`} type="button" onClick={(e) => {console.log(reservationData)}}>Annuller</button>
                </div>
            </form>
        </section>
    )
}

export default Reservations;