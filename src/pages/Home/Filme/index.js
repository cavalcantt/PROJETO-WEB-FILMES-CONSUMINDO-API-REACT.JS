import {useEffect,useState} from "react";
import {useParams, useNavigate}from 'react-router-dom';
import api from "../../../services/api";
import "./filme.css";
import { toast } from "react-toastify";

function Filme(){
    const {id} = useParams();
    const navigate = useNavigate();
    const [filme, setFilmes] = useState ({});
    const [loading, setLoading] = useState (true);


 useEffect(()=>{
async function loadFilmes(){
    await api.get(`/movie/${id}`,{
        params:{
        api_key: "cdd700043a0130e251d6c06691c242e4",
        language: "pt-BR",

    }})
    .then((response)=>{
        setFilmes(response.data);
        setLoading(false)

    })
    .catch(()=>{
        navigate('/',{replace: true});
        return;
      
    })
}
    loadFilmes();

    return () => {
        console.log ("Componente foi desmontado")
    }
    },[navigate,id])


    function salvarFilmes(){
        
       const minhaLista = localStorage.getItem ("@CanttFlix")

       let filmesSalvos = JSON.parse(minhaLista) || [];

       const hasFilme = filmesSalvos.some( ( filmesSalvos)=>filmesSalvos.id === filme.id)

       if(hasFilme){
           toast.warn("Esse filme ja esta na sua lista!")
           return;
       }

       filmesSalvos.push(filme);
       localStorage.setItem("@CanttFlix", JSON.stringify(filmesSalvos));
       toast.success("FILME SALVO COM SUCESSO!")

    }

    if (loading){
        return(
            <div className="filme-info">
                <h1>carregando Detalhes...</h1>
            </div>
        )
    }

    return(
    <div className="filme-info">
        <h1>{filme.title}</h1>
        <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title} />

        <h3>Sinopse</h3>
        <span>{filme.overview}</span>

        <strong> Avaliação:{filme.vote_average} /10</strong>

        <div className="area-buttons">
            <button onClick={salvarFilmes}>Salvar</button>
            <button>
                <a target="blank" rel="external" href={`https://youtube.com/results?search_query=${filme.title} Trailer`}>
                    Trailer
                </a>
            </button>

        </div>
    </div>

    );
    }
    
    export default Filme;