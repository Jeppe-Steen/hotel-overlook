import { useEffect, useState } from "react";
import { useParams, useHistory, useRouteMatch } from "react-router-dom";
import { doFetch } from "../../Helpers/Fetching";

import Style from './ShowcaseCitys.module.scss';

const ShowcaseCitys = () => {
    const [cityList, setCityList] = useState([]);
    const [currentContry, setCurrentContry] = useState({});

    let { landId } = useParams();
    const history = useHistory();
    const { url } = useRouteMatch();

    const fetchingData = async () => {
        const url = `https://api.mediehuset.net/overlook/cities/by_country/${landId}`;
        const fetchedData = await doFetch(url);
        setCityList(fetchedData);
    }

    const fetchingContry = async () => {
        const url = `https://api.mediehuset.net/overlook/countries/${landId}`;
        const fetchedData = await doFetch(url);
        setCurrentContry(fetchedData);
    }

    useEffect(() => {
        fetchingData();
        fetchingContry();
    }, [landId])

    const handleClick = (id) => {
        history.push(`${url}/${id}`);
    }

    return (
        <section className={`section ${Style.showcaseCitys}`}>
            <header>
                <h2 className={Style.showcaseCitys_h2}>Byer med vores hoteller i {currentContry.name}</h2>
                <p className={Style.showcaseCitys_subHeader}>{currentContry.description}</p>
            </header>
            <article className={Style.showcaseCitys_article}>
                {cityList && cityList.map((items) => {
                    return (
                        <figure onClick={(e) => {handleClick(items.id)}} className={Style.showcaseCitys_figure}>
                            <img className={Style.showcaseCitys_img} src={items.image} alt={items.name} />
                            <figcaption className={Style.showcaseCitys_figcaption}>
                                <h3 className={Style.showcaseCitys_h3}> {items.name} </h3>
                                <p className={Style.showcaseCitys_p}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fuga inventore ullam sint deserunt natus eveniet voluptatem alias</p>
                            </figcaption>
                        </figure>
                    )
                })}
            </article>
        </section>
    )
}

export default ShowcaseCitys;