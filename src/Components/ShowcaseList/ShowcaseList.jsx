import Style from './ShowcaseList.module.scss';

import { doFetch } from '../../Helpers/Fetching';
import { useEffect, useState } from 'react';

const ShowcaseList = (props) => {
    const [fetchedData, setFetchedData] = useState([]);

    const title = props.title;
    const url = props.url;

    const handleFetch = async () => {
        const fetchingdData = await doFetch(url)
        setFetchedData(fetchingdData.slice(0,3))
    };

    useEffect(() => {
        handleFetch();
    }, [])

    return (
        <section className={Style.showcaseList}>
            <header>
                <h2>{title}</h2>
            </header>
            <article className={Style.showcaseList_article}>
                { fetchedData.map((item) => {
                    return (
                        <figure className={Style.showcaseList_figure}>
                            <img className={Style.showcaseList_img} src={item.image || item.images[0].image} alt={item.title || item.room_title} />
                            <figcaption className={Style.showcaseList_figcaption}>
                                <h3 className={Style.showcaseList_h3}>{item.title || item.room_title}</h3>
                                <p className={Style.showcaseList_p}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus</p>
                            </figcaption>
                        </figure>
                    )
                }) }
            </article>
        </section>
    )
}

export default ShowcaseList;