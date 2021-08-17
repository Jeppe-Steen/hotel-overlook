import Style from './Destinations.module.scss';

const Destinations = () => {
    return (
        <main>
            <section className={Style.destinations_hero}></section>
            <p className={Style.destinations_filter}>filter</p>
            <div className="divided_content">
                <section className="section">
                    <p>this is a section</p>
                </section>
                <aside className="aside">
                    <p>this is a aside</p>
                </aside>
            </div>
        </main>
    )
}

export default Destinations;