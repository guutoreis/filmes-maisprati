import "./Paginacao.css";

function Paginacao({ paginaAtual, totalPaginas, aoMudarPagina }) {
    const paginas = Array.from({ length: Math.min(totalPaginas, 10) }, (_, i) => i + 1);

    return (
        <div className="paginacao-container">
            <div className="paginacao">
                {paginas.map((numero) => (
                    <button
                        key={numero}
                        onClick={() => aoMudarPagina(numero)}
                        disabled={numero === paginaAtual}
                        className={`botao-pagina ${numero === paginaAtual ? "ativo" : ""}`}
                    >
                        {numero}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default Paginacao;