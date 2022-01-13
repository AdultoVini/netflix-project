import React, {useEffect, useState} from "react";
import MovieRow from "./components/MovieRow";
import FeaturedMovie from "./components/FeaturedMovie";
import Tmdb from "./Tmbd";
import "./App.css"
import Header from "./components/Header";
import Loading from "./imgs/loadgif.gif"

const App = () =>{

    const [movieList, setMovieList] = useState([]);
    const [featuredData, setFeaturedData] = useState(null);
    const [blackHeader, setBlackHeader] = useState(false)

    useEffect( () =>{
    const loadAll = async () =>{
        let list  = await Tmdb.getHomeList();
        setMovieList(list)

        let originals = list.filter(i=>i.slug === 'originals');
        let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1));
        let chosen = originals[0].items.results[randomChosen];
        let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');
        if(chosenInfo.length <= 0){
            let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'movie');
        }
        setFeaturedData(chosenInfo);
    }

    loadAll();
}, []);

    useEffect(()=>{ 
        const scrollListener =  () =>{
            if(window.scrollY > 10){
                setBlackHeader(true);
            }else{
                setBlackHeader(false);
            }
        }
        window.addEventListener('scroll', scrollListener);
        return () =>{
            window.removeEventListener('scroll', scrollListener)
        }
    }, []);
    return(
        <div className="page">
            <Header black={blackHeader}/>
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
            <footer>
                Site feito com o intuíto de estudar<br/>
                Todos os direitos de imagem para Netflix<br/>
                Dados coletados do site Themoviedb.org<br/>
            </footer>
            {!featuredData &&
            <div className="loading">
                <img src={Loading} alt="Carregando"/>
            </div>
            }
        </div>
    );

}
export default App;