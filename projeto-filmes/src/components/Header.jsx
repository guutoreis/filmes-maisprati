import { BiCameraMovie } from "react-icons/bi";
import "./Header.css";

function Header({ inicio, favoritos }) {
    return (
        <div className="header">
            <div className="posicao-esquerda">
                <button onClick={inicio} className="titulo">
                    <h1>Filmes +PraTi <BiCameraMovie /></h1>
                </button>
            </div>
            <div className="posicao-direita">
                <button onClick={inicio} className="botao">Home</button>
                <button onClick={favoritos} className="botao">Favoritos</button>
            </div>
        </div>
    )
};

export default Header;