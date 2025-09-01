import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../servicos/api";
import "./Detalhes.css";
import Header from "../components/Header";

function Detalhes() {
    const { id } = useParams();
    const [filme, setFilme] = useState(null);
    const [carregando, setCarregando] = useState(true);
    const [diretor, setDiretor] = useState("");
    const [elenco, setElenco] = useState([]);
    const navegar = useNavigate();

    useEffect(() => {
        const carregarDetalhes = async () => {
            try {
                const respostaFilme = await api.get(`/movie/${id}`);
                setFilme(respostaFilme.data);
                const respostaCreditos = await api.get(`/movie/${id}/credits`);
                const equipe = respostaCreditos.data.crew;
                const atores = respostaCreditos.data.cast;
                const diretorEncontrado = equipe.find((pessoa) => pessoa.job === "Director");
                setDiretor(diretorEncontrado ? diretorEncontrado.name : "Não informado");
                setElenco(atores.slice(0, 5).map((ator) => ({
                    nome: ator.name,
                    foto: ator.profile_path
                        ? `https://image.tmdb.org/t/p/w200${ator.profile_path}`
                        : "https://via.placeholder.com/100x150?text=Sem+Foto",
                })));
            } catch (erro) {
                console.error("Erro ao carregar detalhes", erro);
            } finally {
                setCarregando(false);
            }
        };

        carregarDetalhes();
    }, [id]);

    if (carregando) return <p className="mensagem-status">Carregando Detalhes...</p>;
    if (!filme) return <p className="mensagem-status erro">Filme não encontrado.</p>;


    const irParaHome = () => {
        console.log('oi')
        navegar('/');
    };

    const irParaFavoritos = () => {
        console.log('oi')
        navegar('/favoritos');
    };

    return (
        <>
            <Header inicio={irParaHome} favoritos={irParaFavoritos} />
            <div
                className="pagina-detalhes"
                style={{
                    backgroundImage: `url(https://image.tmdb.org/t/p/original${filme.backdrop_path})`,
                }}
            >
                <div className="poster-container">
                    <img
                        src={`https://image.tmdb.org/t/p/w300${filme.poster_path}`}
                        alt={filme.title}
                        className="imagem-detalhes"
                    />
                </div>

                <div className="detalhes-info">
                    <h1 className="titulo-detalhes">{filme.title}</h1>

                    <p><strong>Sinopse:</strong> {filme.overview}</p>
                    <p><strong>Data de Lançamento:</strong> {filme.release_date}</p>
                    <p><strong>Avaliação:</strong> {filme.vote_average}</p>
                    <p><strong>Diretor:</strong> {diretor}</p>

                    <div className="elenco">
                        <strong>Elenco:</strong>
                        <div className="elenco-lista">
                            {elenco.map((ator, index) => (
                                <div key={index} className="ator">
                                    <img src={ator.foto} alt={ator.nome} />
                                    <p>{ator.nome}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Detalhes;
