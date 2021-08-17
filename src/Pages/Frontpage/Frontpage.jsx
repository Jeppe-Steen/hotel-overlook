import HeroSlider from '../../Components/HeroSlider/HeroSlider';
import ShowcaseList from '../../Components/ShowcaseList/ShowcaseList';

const Frontpage = () => {
    const newsUrl = 'https://api.mediehuset.net/overlook/news';
    const roomsUrl = 'https://api.mediehuset.net/overlook/rooms/by_hotel/1';

    return (
        <main>
            <HeroSlider />
            <ShowcaseList url={newsUrl} title={'Sidste nyt'}/>
            <ShowcaseList url={roomsUrl} title={'Se vores store udvalg af værlser'} />
        </main>
    )
}

export default Frontpage;