import React, {useEffect, useState} from "react";
import MovieRow from "./components/MovieRow";
import FeaturedMovie from "./components/FeaturedMovie";
import Tmdb from "./Tmbd";
import "./App.css"

const App = () =>{

    const [movieList, setMovieList] = useState([]);
    const [featuredData, setFeaturedData] = useState(null);

    useEffect( () =>{
    const loadAll = async () =>{
        let list  = await Tmdb.getHomeList();
        setMovieList(list)

        let originals = list.filter(i=>i.slug === 'originals');
        let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1));
        let chosen = originals[0].items.results[randomChosen];
        let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');
        setFeaturedData(chosenInfo);
    }

    loadAll();
}, []);
    return(
        <div className="page">
            {
                featuredData &&
                <FeaturedMovie item={featuredData}/>
            }
            <section className="lists">
                {movieList.map((item, key)=>(
                    // console.log(item.items.results)
                    <MovieRow key={key} title={item.title} items={item.items}/>
                ))}
            </section>
        </div>
    );

}
export default App;