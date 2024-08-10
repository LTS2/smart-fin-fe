import React from 'react';
import {Link} from 'react-router-dom';
import './Header.css'; // 스타일을 정의한 CSS 파일을 추가

const Header = () => {
    return (
        <header className="header">
            <nav>
                <ul className="nav-links">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/vegetables">Vegetables</Link></li>
                    <li><Link to="/login">Login</Link></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
