import { useEffect, useState } from 'react';
import { useHistory, useParams, useRouteMatch } from 'react-router-dom';
import { doFetch } from '../../Helpers/Fetching';
import Style from './ShowcaseHotels.module.scss';

const ShowcaseHotels = () => {
    const [hotelList, setHotelList] = useState([]);
    const [currentCity, setCurrentCity] = useState({});

    let { cityId } = useParams();
    const history = useHistory();
    const { url } = useRouteMatch();

    const fetchingData = async () => {
        const url = `https://api.mediehuset.net/overlook/hotels/by_city/${cityId}`;
        const fetchedData = await doFetch(url);
        setHotelList(fetchedData);
    }

    const fetchingCity = async () => {
        const url = `https://api.mediehuset.net/overlook/cities/${cityId}`;
        const fetchedData = await doFetch(url);
        setCurrentCity(fetchedData);
    }

    useEffect(() => {
        fetchingData();
        fetchingCity();
    }, [cityId])

    const handleClick = () => {};

    return (
        <section className={`section ${Style.showcaseHotels}`}>
            <header>
                <h2 className={Style.showcaseHotels_h2}>Vores hoteller i {currentCity.name}</h2>
                <p className={Style.showcaseHotels_subHeader}>{currentCity.description}</p>
            </header>
            <article className={Style.showcaseHotels_article}>
                {hotelList && hotelList.map((items) => {
                    return (
                        <figure onClick={(e) => {handleClick(items.id)}} className={Style.showcaseHotels_figure}>
                            <img className={Style.showcaseHotels_img} src={items.image} alt={items.name} />
                            <figcaption className={Style.showcaseHotels_figcaption}>
                                <h3 className={Style.showcaseHotels_h3}> {items.title} </h3>
                                <p className={Style.showcaseHotels_p}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fuga inventore ullam sint deserunt natus eveniet voluptatem alias</p>
                            </figcaption>
                        </figure>
                    )
                })}
            </article>
        </section>
    )
}

export default ShowcaseHotels;