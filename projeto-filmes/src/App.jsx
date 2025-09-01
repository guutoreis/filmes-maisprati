import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import Detalhes from './paginas/Detalhes';
import Favoritos from './paginas/Favoritos';
import './App.css'
import HomePage from './paginas/HomePage';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/filme/:id" element={<Detalhes />} />
        <Route path="/favoritos" element={<Favoritos />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;