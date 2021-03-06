import { useHistory } from 'react-router-dom';
import { useEffect } from 'react/cjs/react.development';
import Style from './Reservations.module.scss';

import { doFetch }from '../../Helpers/Fetching';
import { useState } from 'react';

const Reservations = () => {

    const [selectOptions, setSelectOptions] = useState([]);
    const [roomsList, setRoomsList] = useState([]);

    // reservation data
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

    // user data which is stored in sessionStorage
    const userData = JSON.parse(sessionStorage.getItem('token'));

    // redirects the user to the login page
    const history = useHistory();
    const getUserData = () => {
        if(!userData) {
            history.push('/login')
        }
    }

    // converts the selected dates to timestamps
    const convertToTimestamp = (val) => {
        const timestamp = Date.parse(val)
        return timestamp / 1000;
    }

    // gets every city in denmark which has hotels, and then gets every hotel in that city
    // needs to be convertet to countrys also
    const getSelectOptions = async () => {
        let optionsArray = [];

        const url_land = `https://api.mediehuset.net/overlook/countries`;
        const response_land = await doFetch(url_land);

        for (let land of response_land) {
            const getCity = async () => {
                const url_city = `https://api.mediehuset.net/overlook/cities/by_country/${land.id}`;
                const response_city = await doFetch(url_city);

                let hotelsArray = []

                for (let city of response_city) {
                    const getHotel = async () => {
                        const url_hotel = `https://api.mediehuset.net/overlook/hotels/by_city/${city.id}`;
                        const response_hotel = await doFetch(url_hotel);

                        for (let hotel of response_hotel) {
                            hotelsArray.push({print: `${city.name} - ${hotel.title}`,val: hotel.id})
                        }
                    }
                    getHotel();
                }

                optionsArray.push({
                    name: land.name,
                    hotels: hotelsArray,
                })
            }
            getCity();
        }

        setTimeout(() => {
            setSelectOptions(optionsArray)
        }, [500])

    }

    const changeRooms = async (id) => {
        const url = `https://api.mediehuset.net/overlook/rooms/by_hotel/${id}`;
        const response = await doFetch(url);
        setRoomsList(response)
    }

    // runs these functions when the page loads
    // todo: fix when user reloads the page, the options disappear
    useEffect(() => {
        getSelectOptions();
        getUserData();
    }, []);

    const handleSelectChange = (val) => {
        reservationData.destination = val;

        changeRooms(val);
    }

    // handles submit
    const handleSubmit = () => {
        // selects every element with the class required
        const required_fields = [...document.querySelectorAll('.required')];

        let canBeSubmitted = true;
        let errorMessage = '';

        

        // for each element, it checks if there is a value
        // if not, the border will become red
        // todo: let there be a error message 
        for (let item of required_fields) {
            if(!item.value) {
                errorMessage = 'Du skal udfylde feltet';
                item.insertAdjacentHTML('afterend', `<p class="errorText">${errorMessage}</p>`);
                item.style.border = '1px solid red';

                canBeSubmitted = false;
                return
            } else {
                switch(item.dataset.type) {
                    default:
                        break;
                    case 'string':
                        if(!isString(item.value)) {
                            item.style.border = '1px solid red';
                            canBeSubmitted = false;
                            errorMessage = 'Feltet m?? kun indeholde bogstaver';
                            return
                        }
                        break;
                    case 'number':
                        if(!isNumber(item.value)) {
                            item.style.border = '1px solid red';
                            canBeSubmitted = false;
                            errorMessage = 'Feltet m?? kun indeholde tal';
                            return
                        }
                        break;
                    case 'email':
                        if(!isEmail(item.value)) {
                            item.style.border = '1px solid red';
                            canBeSubmitted = false;
                            errorMessage = 'Feltet skal indeholde en mail';
                            return
                        }
                        break;    
                }
            }


        }

        // if not the checkbox is checked then it cant send
        if(!reservationData.accept){
            canBeSubmitted = false;
            return
        }

        // sends the reservation
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

    // patterns for validation
    // For: only letters
    const isNumber = (val) => {
        let pattern = /^[0-9]+$/;
        return pattern.test(val);
    }

    // For: only numbers
    const isString = (val) => {
        let pattern = /^[A-Z??????a-z?????? ]+$/;
        return pattern.test(val);
    }

    // For: email
    const isEmail = (val) => {
        let pattern = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        return pattern.test(val);
    }

    // removes the red border for every element
    const resetErrorMessage = () => {
        const required_fields = [...document.querySelectorAll('.required')];
        required_fields.forEach(element => element.style.border = 'none');

        const errorText = document.querySelector('.errorText');

        if(errorText) {
            errorText.remove();
        }
    };

    return (
        <section className={`section ${Style.reservations}`}>
            <header>
                <h2 className={Style.reservations_h2}>Reservation</h2>
                <p className={Style.reservations_subHeader}>Udfyld nedenst??ende formular for at reservere et af vores v??relser.</p>
            </header>
            <form>
                <div className={Style.reservations_formGroup}>
                    <select className={`${Style.fullWidth} ${Style.reservations_input} required`} onClick={resetErrorMessage} onChange={(e) => {handleSelectChange(e.target.value)}}>
                        <option value="" selected disabled>V??lg destination & hotel</option>
                        {selectOptions.length && selectOptions.map((item, index) => {
                            return (
                                <optgroup key={index} label={item.name}>
                                    {item.hotels.map((hotel, index) => {
                                        return (
                                            <option key={index} value={hotel.val}>{hotel.print}</option>
                                        )
                                    })}
                                </optgroup>
                            )
                        })}
                    </select>
                </div>

                <div className={Style.reservations_formGroup}>
                    <select className={`${Style.halfWidth} ${Style.reservations_input} required`} onClick={resetErrorMessage} onChange={(e) => {reservationData.room = e.target.value}}>
                        <option value="" selected disabled>V??lg v??relsestype</option>
                        {roomsList.length && roomsList.map((item, index) => {
                            return (
                                <option key={index} value={item.id}>{item.room_title}</option>
                            )
                        })}
                    </select>

                    <select className={`${Style.halfWidth} ${Style.reservations_input} required`} onClick={resetErrorMessage} onChange={(e) => {reservationData.number = e.target.value}}>
                        <option value="" selected disabled>V??lg antal personer</option>
                        <option value="1">1</option>
                        <option value="1">2</option>
                        <option value="1">3</option>
                    </select>
                </div>

                <div className={Style.reservations_formGroup}>
                    <p>V??lg prisklasse:</p>
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
                    <input className={`${Style.fullWidth} ${Style.reservations_input} required`} type="text" data-type="string" placeholder="Fornavn" onClick={resetErrorMessage} onKeyUp={(e) => {reservationData.firstName = e.target.value}}/>
                </div>
                
                <div className={Style.reservations_formGroup}>
                    <input className={`${Style.fullWidth} ${Style.reservations_input} required`} type="text" data-type="string" placeholder="Efternavn(e)" onClick={resetErrorMessage} onKeyUp={(e) => {reservationData.lastName = e.target.value}}/>
                </div>

                <div className={Style.reservations_formGroup}>
                    <input className={`${Style.halfWidth} ${Style.reservations_input} required`} type="text" data-type="email" placeholder="Email" onClick={resetErrorMessage} onKeyUp={(e) => {reservationData.mail = e.target.value}}/>
                    <input className={`${Style.halfWidth} ${Style.reservations_input} required`} type="text" data-type="number" placeholder="Telefon" onClick={resetErrorMessage} onKeyUp={(e) => {reservationData.phone = e.target.value}}/>
                </div>

                <div className={Style.reservations_formGroup}>
                    <textarea className={`${Style.fullWidth} ${Style.reservations_input}`} placeholder="Kommentarer" onClick={resetErrorMessage} onKeyUp={(e) => {reservationData.comment = e.target.value}}></textarea>
                </div>

                <div className={Style.reservations_formGroup}>
                    <input type="checkbox" onClick={() => {reservationData.accept = !reservationData.accept}} />
                    <label>Jeg accepterer hermed Overlooks betingelser (s??t kryds)</label>
                </div>

                <div className={Style.reservations_formGroup}>
                    <button className={`${Style.halfWidth} ${Style.reservations_button}`} type="button" onClick={handleSubmit}>Send reservation</button>
                    <button className={`${Style.halfWidth} ${Style.reservations_button}`} type="button" onClick={(e) => {history.go(0)}}>Annuller</button>
                </div>
            </form>
        </section>
    )
}

export default Reservations;