import { BrowserRouter,Routes,Route, Navigate } from 'react-router-dom';
import './App.css';
import Login from './pages/login/Login';
import Home from './pages/home/Home';
import CountryList from './pages/countryList/CountryList';

function App() {
  return (
    <div className="App">
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Navigate to="/login" replace />} />
    <Route path='/login' element={<Login />}></Route>
    <Route path='/home' element={<Home />}>
    <Route path='countryList' element={<CountryList />} />
    </Route>
    </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
