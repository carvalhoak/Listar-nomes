import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css';
import AddNome from './pages/AddNome';

function App() {
  return (
      <Router>
        <div>
          <Routes>
            <Route path='/add_usuario' element={AddNome}/>
          </Routes>
        </div>
      </Router>
  );
}

export default App;
