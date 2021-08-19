import { useEffect, useState } from 'react';
import { Switch, Route, useRouteMatch, Redirect, Link } from 'react-router-dom';
import { doFetch } from '../../Helpers/Fetching';
import ShowcaseCitys from '../../Components/ShowcaseCitys/ShowcaseCitys';
import ShowcaseHotels from '../../Components/ShowcaseHotels/ShowcaseHotels';
import Style from './Destinations.module.scss';

const Destinations = () => {
    const [filterData, setFilterData] = useState([]);

    const fetchFilterData = async () => {
        const url = 'https://api.mediehuset.net/overlook/countries';
        const fetchedData = await doFetch(url);
        setFilterData(fetchedData);
    }

    useEffect(() => {
        fetchFilterData();
    }, [])

    let { url } = useRouteMatch();

    return (
        <main>
            <section className={Style.destinations_hero}></section>
            <div className={Style.destinations_filter}>
                {filterData && filterData.map((items) => {
                    return (
                        <Link className={Style.destinations_filterItem} key={items.id} to={`${url}/${items.id}`}>{items.name}</Link>
                    )
                })}
            </div>
            <div className="divided_content">
                    <Switch>
                        <Route exact path={`${url}`}>
                            <Redirect to={`${url}/1`} /> 
                        </Route>

                        <Route exact path={`${url}/:landId`}>
                            <ShowcaseCitys titel={'Vores hoteller i'} />
                            <aside className="aside"></aside>
                        </Route>

                        <Route exact path={`${url}/:landId/:cityId`}>
                            <ShowcaseHotels titel={'hey'} />
                            <aside className="aside">
                            </aside>
                        </Route>
                    </Switch>
            </div>
        </main>
    )
}

export default Destinations;