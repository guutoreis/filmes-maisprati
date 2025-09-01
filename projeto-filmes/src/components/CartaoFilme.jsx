import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./CartaoFilme.css";

function CartaoFilme({ filme }) {
  const [favorito, setFavorito] = useState(false);

  useEffect(() => {
    const favoritosSalvos = JSON.parse(localStorage.getItem("favoritos")) || [];
    const estaFavoritado = favoritosSalvos.some((f) => f.id === filme.id);
    setFavorito(estaFavoritado);
  }, [filme.id]);

  const alternarFavorito = (evento) => {
    evento.stopPropagation();
    const favoritosSalvos = JSON.parse(localStorage.getItem("favoritos")) || [];

    if (favorito) {
      const novosFavoritos = favoritosSalvos.filter((f) => f.id !== filme.id);
      localStorage.setItem("favoritos", JSON.stringify(novosFavoritos));
      setFavorito(false);
    } else {
      localStorage.setItem("favoritos", JSON.stringify([...favoritosSalvos, filme]));
      setFavorito(true);
    }
  };

  const renderizarEstrelas = (nota) => {
    const estrelasCheias = Math.floor(nota / 2);
    const temMeiaEstrela = (nota % 2) >= 1;
    const estrelasVazias = 5 - estrelasCheias - (temMeiaEstrela ? 1 : 0);

    return (
      <div className="estrelas-avaliacao">
        {Array(estrelasCheias).fill().map((_, indice) => (
          <span key={`cheia-${indice}`} className="estrela estrela-cheia">★</span>
        ))}
        {temMeiaEstrela && <span className="estrela estrela-meia">★</span>}
        {Array(estrelasVazias).fill().map((_, indice) => (
          <span key={`vazia-${indice}`} className="estrela estrela-vazia">☆</span>
        ))}
      </div>
    );
  };

  return (
    <li className="cartao-filme">
      <button
        className={`botao-favorito-coracao ${favorito ? "favoritado" : ""}`}
        onClick={alternarFavorito}
        aria-label={favorito ? "Remover dos favoritos" : "Adicionar aos favoritos"}
      >
        {favorito ? "❤️" : "🤍"}
      </button>

      <img
        src={`https://image.tmdb.org/t/p/w200${filme.poster_path}`}
        alt={filme.title}
        className="cartao-imagem"
      />

      <h3 className="cartao-titulo">{filme.title}</h3>


      {filme.vote_average > 0 && (
        <div className="cartao-avaliacao">
          {renderizarEstrelas(filme.vote_average)}
        </div>
      )}

      <p className="cartao-ano">{filme.release_date?.slice(0, 4)}</p>

      <Link to={`/filme/${filme.id}`}>
        <button className="botao-detalhes">Ver Detalhes</button>
      </Link>
    </li>
  );
}

export default CartaoFilme;