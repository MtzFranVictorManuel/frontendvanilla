import { API_URL } from "./App.js";
import getElemento from "./lib/getElemento.js";
import PeliculaCard from "./PeliculaCard.js";


const Detalles = () => {
    let id;
    const { search } = document.location;
    const urlParams = new URLSearchParams(search);

    urlParams.has('id') ? id = urlParams.get('id') || null : id = '';

    const buscarPelicula = async (id) => {
        const response = await fetch(`${API_URL}/${id}`);
        const data = await response.json();

        const resultados = await getElemento('.resultados');
        resultados.innerHTML = dibujaPelicula(data);
    };

    const dibujaPelicula = (pelicula) => {
        return `
           ${(pelicula != null) 
            ? `
                <div class="container">
                    ${PeliculaCard(pelicula)}
                    <div class="movie-desc">${pelicula.sinopsis}</div>
                </div>
            ` 
            : 
            `
                <div class="empty">
                    <h2>No hay detalles de la película.</h2>
                </div>
            `}
        `;
    };

    buscarPelicula(id);

    return `
        <div class="resultados"></div>
    `;
    
};

export default Detalles;