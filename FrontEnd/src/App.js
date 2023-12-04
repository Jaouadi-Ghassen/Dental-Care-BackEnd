

import './App.css';
import Home from './pages/home'
import Users from './pages/users'
import Clinicals from './pages/clinicals'
import Visits from './pages/visits'

import {Routes, Route,BrowserRouter} from 'react-router-dom'


function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>

        <Route path='' exact element={<Home></Home>}></Route>
        <Route path='/users' exact element={<Users></Users>}></Route>
        <Route path='/clinicals' exact element={<Clinicals></Clinicals>}></Route>
        <Route path='/visits' exact element={<Visits></Visits>}></Route>


      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
