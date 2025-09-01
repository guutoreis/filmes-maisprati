import { useEffect, useState } from "react";
import CartaoFilme from "../components/CartaoFilme";
import "./Favoritos.css";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

function Favoritos() {
  const [favoritos, setFavoritos] = useState([]);

  useEffect(() => {
    const favoritosSalvos = JSON.parse(localStorage.getItem("favoritos")) || [];
    setFavoritos(favoritosSalvos);
  }, []);

  const navegar = useNavigate();

  const irParaHome = () => {
    console.log('oi')
    navegar('/');
  };

  const irParaFavoritos = () => {
    console.log('oi')
    navegar('/favoritos');
  };

  return (
    <div className="pagina-favoritos">
      <Header inicio={irParaHome} favoritos={irParaFavoritos} />
      <h1 className="titulo-favoritos">Meus Filmes Favoritos</h1>

      {favoritos.length === 0 ? (
        <p className="mensagem-status">Você ainda não adicionou nenhum filme aos favoritos.</p>
      ) : (
        <ul className="lista-filmes">
          {favoritos.map((filme) => (
            <CartaoFilme key={filme.id} filme={filme} />
          ))}
        </ul>
      )}
    </div>
  );
}

export default Favoritos;