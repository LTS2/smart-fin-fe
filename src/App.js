import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from '@pages/Home/Home';
import Header from '@components/Header/Header';
import Footer from '@components/Footer/Footer';
import SignUpForm from "pages/Signup/SignUpForm";
import AdminPage from "@pages/Admin/AdminPage";
import UserPage from "@pages/User/UserPage";
import CarSearch from "@pages/CarSearch/CarSearch";
import CustomerList from "@pages/CustomerList/CustomerList";
import PersonalRecoverySearch from "@pages/PersonalRecoverySearch/PersonalRecoverySearch";
import RealEstateSearch from "@pages/RealEstateSearch/RealEstateSearch";
import UsagePage from "@pages/Usage/UsagePage";
import NoticePage from "@pages/notice/NoticePage";
import SupportPage from "@pages/support/SupportPage";
import LoginPage from "@pages/Login/LoginPage";
import {jwtDecode} from "jwt-decode";

function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0QG5hdmVyLmNvbSIsInJvbGVzIjoiVVNFUiIsImlhdCI6MTcyNDMwNTgyMywiZXhwIjoxNzI0OTEwNjIzfQ.YWWgurmwEUBagLeGo5vFy21YYlHnkWyVQ0uG6HxTGVk';
        const token = localStorage.getItem('accessToken')
        if (token) {
            const decodedToken = jwtDecode(token);
            setUser({email: decodedToken.sub, roles: decodedToken.roles.split(',')});
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        setUser(null);
        window.location.href = '/';
    };

    return (
        <Router>
            <div className="App">
                <Header user={user} onLogout={handleLogout}/>
                <div className="content">
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        {!user && <Route path="/login" element={<LoginPage setUser={setUser}/>}/>}
                        {!user && <Route path="/signup" element={<SignUpForm/>}/>}
                        {user?.roles.includes('ADMIN') && <Route path="/admin" element={<AdminPage/>}/>}
                        {user?.roles.includes('USER') && <Route path="/mypage" element={<UserPage/>}/>}
                        {user?.roles.includes('USER') && <Route path="/customer-list" element={<CustomerList/>}/>}
                        {user?.roles.includes('SEARCH_REAL_ESTATE') &&
                            <Route path="/real-estate-search" element={<RealEstateSearch/>}/>}
                        {user?.roles.includes('SEARCH_CAR') && <Route path="/car-search" element={<CarSearch/>}/>}
                        {user?.roles.includes('SEARCH_PERSONAL_RECOVERY') &&
                            <Route path="/personal-recovery-search" element={<PersonalRecoverySearch/>}/>}
                        {user?.roles.includes('USER') && <Route path="/usage" element={<UsagePage/>}/>}
                        <Route path="/notice" element={<NoticePage/>}/>
                        <Route path="/support" element={<SupportPage/>}/>
                    </Routes>
                </div>
                <Footer/>
            </div>
        </Router>
    );
}

export default App;