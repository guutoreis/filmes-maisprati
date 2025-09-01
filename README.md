# 🎬 Aplicação de Busca de Filmes com React

Este projeto é uma aplicação web desenvolvida com **React + Vite**, que consome a API do TMDB para permitir que usuários busquem filmes, visualizem detalhes e montem uma lista de favoritos.

## 🚀 Funcionalidades

- **Página de Busca**: Campo de texto para digitar o termo e exibir resultados com pôster, título, ano e botão de detalhes.
- **Paginação**: Navegação entre páginas de resultados.
- **Página de Detalhes**: Informações completas do filme, incluindo diretor, elenco, sinopse e avaliação.
- **Lista de Favoritos**: Adição/remoção de filmes favoritos com persistência via `localStorage`.
- **Tratamento de Erros & Loading**: Indicadores de carregamento e mensagens de erro amigáveis.

## 🛠️ Tecnologias Utilizadas

- React
- Vite
- Axios
- React Router DOM
- TMDB API
- localStorage

## 📦 Instalação


# Clone o repositório
git clone https://github.com/guutoreis/filmes-maisprati

# Acesse a pasta do projeto
cd nome-do-projeto

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev

🔑 Configuração da API
A chave da API do TMDB já está configurada no arquivo src/services/api.js: (onde você deve inserir a sua chave).

📁 Estrutura de Pastas (exemplo)
src/
├── components/       # Componentes reutilizáveis
├── paginas/          # Páginas como HomePage, Detalhes, Favoritos
├── services/         # Configuração da API (api.js)
├── App.jsx           # Componente principal
└── main.jsx          # Ponto de entrada

📌 Requisitos da Atividade
Este projeto foi desenvolvido como parte da Atividade 5 - Consumo de API com ReactJS, com os seguintes requisitos:

Busca de filmes
Exibição de detalhes com diretor e elenco
Favoritos com localStorage
Paginação
Navbar presente em todas as páginas
Tratamento de erros e loading

🧠 Autor
Augusto Reis
Backoffice | Desenvolvedor em formação

