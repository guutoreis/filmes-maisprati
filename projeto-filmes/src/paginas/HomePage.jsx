import { useEffect, useState } from 'react';
import api from '../servicos/api';
import CartaoFilme from '../components/CartaoFilme';
import Paginacao from '../components/Paginacao';
import "./HomePage.css";
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const [tituloDigitado, setTituloDigitado] = useState('');
  const [filmesBuscados, setFilmesBuscados] = useState([]);
  const [filmesPopulares, setFilmesPopulares] = useState([]);
  const [ehPopular, setEhPopular] = useState(true);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState(null);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);

  useEffect(() => {
    const buscarPopulares = async () => {
      try {
        const resposta = await api.get('/movie/popular');
        setFilmesPopulares(resposta.data.results);
      } catch (erro) {
        console.error('Erro ao buscar filmes populares:', erro);
      }
    };
    buscarPopulares();
  }, []);

  const buscarFilmesPorTitulo = async (tituloBusca, pagina = 1) => {
    if (!tituloBusca) return;
    setCarregando(true);
    setErro(null);
    try {
      const resposta = await api.get('/search/movie', {
        params: {
          query: tituloBusca,
          page: pagina,
        },
      });
      setFilmesBuscados(resposta.data.results);
      setTotalPaginas(resposta.data.total_pages);
    } catch (erro) {
      setErro('Erro ao buscar filmes. Tente novamente.');
    } finally {
      setCarregando(false);
    }
  };

  const aoBuscar = () => {
    setPaginaAtual(1);
    setTituloDigitado(tituloDigitado);
    buscarFilmesPorTitulo(tituloDigitado, 1);
  };

  const mudarPagina = (pagina) => {
    setPaginaAtual(pagina);
    buscarFilmesPorTitulo(tituloDigitado, pagina);
  };

  const navegar = useNavigate();

  const irParaHome = () => {
    console.log('oi')
    setTituloDigitado("");
    setEhPopular(true)
    navegar('/');
  };

  const irParaFavoritos = () => {
    console.log('oi')
    setTituloDigitado("");
    setEhPopular(true)
    navegar('/favoritos');
  };

  return (
    <div className="pagina-busca">
      <Header inicio={irParaHome} favoritos={irParaFavoritos} />

      <div className="barra-pesquisa">
        <input
          type="text"
          placeholder="Digite o nome do filme"
          value={tituloDigitado}
          onChange={(e) => {
            setTituloDigitado(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              aoBuscar();
              setEhPopular(false)
            }
          }}
          className="input-pesquisa"
        />
        <button
          onClick={() => {
            aoBuscar();
            setEhPopular(false);
          }}
          className="botao-pesquisa"
        >
          Procurar
        </button>
      </div>

      {carregando && <p className="mensagem-status">Carregando...</p>}
      {erro && <p className="mensagem-status erro">{erro}</p>}

      {!ehPopular && (
        <>
          <h2 className="subtitulo-busca">Resultados da Busca</h2>
          <ul className="lista-filmes">
            {filmesBuscados.length > 0 ? (
              filmesBuscados.map((filme) => (
                <CartaoFilme key={filme.id} filme={filme} />
              ))
            ) : (
              <p className="mensagem-status">Nenhum filme encontrado.</p>
            )}
          </ul>
          {totalPaginas > 1 && (
            <Paginacao
              paginaAtual={paginaAtual}
              totalPaginas={totalPaginas}
              aoMudarPagina={mudarPagina}
            />
          )}
        </>
      )}

      {ehPopular && (
        <>
          <h2 className="subtitulo-busca">Filmes Populares</h2>
          <ul className="lista-filmes">
            {filmesPopulares.map((filme) => (
              <CartaoFilme key={filme.id} filme={filme} />
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default HomePage;
