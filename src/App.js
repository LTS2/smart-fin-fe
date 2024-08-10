import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from '@pages/Home/Home';
import LoginForm from '@pages/Login/LoginForm';
import Vegetables from "@pages/Home/Vegetables";
import Header from '@components/Header/Header';
import Footer from '@components/Footer/Footer';

function App() {
    return (
        <Router>
            <div className="App">
                <Header/>
                <div className="content">
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/login" element={<LoginForm/>}/>
                        <Route path="/vegetables" element={<Vegetables/>}/>
                    </Routes>
                </div>
                <Footer/>
            </div>
        </Router>
    );
}

export default App;
