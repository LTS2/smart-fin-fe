// src/App.js

import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from '@pages/Home/Home';
import LoginForm from '@pages/Login/LoginForm';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/login" element={<LoginForm/>}/>
            </Routes>
        </Router>
    );
}

export default App;
