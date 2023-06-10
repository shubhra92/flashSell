import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Auth from './Pages/Auth';
import Home from './Pages/Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Auth type='login' />} />
        <Route path='/signup' element={<Auth type='signup' />} />
        <Route path='/*' element={<Home/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
