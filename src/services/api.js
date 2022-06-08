import axios from "axios";

//base da URL: https://api.themoviedb.org/3/
//URL DA API (ROTAS): movie/now_playing?api_key=cdd700043a0130e251d6c06691c242e4&language=pt-BR

const api = axios.create({
    baseURL:'https://api.themoviedb.org/3/'
});
export default api;