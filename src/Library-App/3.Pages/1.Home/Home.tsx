
import { Helmet } from 'react-helmet';
import BookShowSection from "./Components/BookShowSection";
import LibraryHeroCarousel from './Components/LibraryHeroCarousel';


const Home = () => {
    return (
        <div>
            <Helmet>
              <meta charSet="utf-8" />
              <title>Home | READORA</title>
            </Helmet>
            <LibraryHeroCarousel></LibraryHeroCarousel>
            <BookShowSection></BookShowSection>
        </div>
    );
};

export default Home;