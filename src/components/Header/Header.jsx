import React from 'react';
import {Link} from 'react-router-dom';
import './Header.css'; // 스타일을 정의한 CSS 파일을 추가

const Header = ({user, onLogout}) => {
    return (
        <header className="header">
            <nav>
                <ul className="nav-links">
                    <li><Link to="/">Home</Link></li>
                    {!user && <li><Link to="/login">Login</Link></li>}
                    {!user && <li><Link to="/signup">SignUp</Link></li>}
                    {user && <li><Link to="/mypage">MyPage</Link></li>}
                    {user?.roles.includes('ADMIN') && <li><Link to="/admin">Admin</Link></li>}
                    {user?.roles.includes('USER') && <li><Link to="/customer-list">고객 리스트</Link></li>}
                    {user?.roles.includes('SEARCH_REAL_ESTATE') && <li><Link to="/real-estate-search">부동산조회</Link></li>}
                    {user?.roles.includes('SEARCH_CAR') && <li><Link to="/car-search">자동차조회</Link></li>}
                    {user?.roles.includes('SEARCH_PERSONAL_RECOVERY') &&
                        <li><Link to="/personal-recovery-search">개인회생조회</Link></li>}
                    {user?.roles.includes('USER') && <li><Link to="/usage">사용내역</Link></li>}
                    <li><Link to="/notice">공지사항</Link></li>
                    <li><Link to="/support">문의사항</Link></li>
                    {user && <li>
                        <button onClick={onLogout}>Logout</button>
                    </li>}
                </ul>
            </nav>
        </header>
    );
};

export default Header;

// import React from 'react';
// import {Link} from 'react-router-dom';
// import Cookies from 'js-cookie';
// import './Header.css'; // 스타일을 정의한 CSS 파일을 추가
//
// const Header = ({user, setUser}) => {
//
//     const handleLogout = () => {
//         // JWT 토큰 쿠키 삭제
//         Cookies.remove('token');
//         // 사용자 상태를 null로 설정하여 로그아웃 처리
//         setUser(null);
//         // 홈 페이지로 리다이렉트
//         window.location.href = '/';
//     };
//
//     return (
//         <header className="header">
//             <nav>
//                 <ul className="nav-links">
//                     <li><Link to="/">Home</Link></li>
//                     {!user && <li><Link to="/login">Login</Link></li>}
//                     {!user && <li><Link to="/signup">SignUp</Link></li>}
//                     {user && <li><Link to="/mypage">MyPage</Link></li>}
//                     {user?.roles.includes('ADMIN') && <li><Link to="/admin">Admin</Link></li>}
//                     {user?.roles.includes('USER') && <li><Link to="/customer-list">고객 리스트</Link></li>}
//                     {user?.roles.includes('SEARCH_REAL_ESTATE') && <li><Link to="/real-estate-search">부동산조회</Link></li>}
//                     {user?.roles.includes('SEARCH_CAR') && <li><Link to="/car-search">자동차조회</Link></li>}
//                     {user?.roles.includes('SEARCH_PERSONAL_RECOVERY') &&
//                         <li><Link to="/personal-recovery-search">개인회생조회</Link></li>}
//                     {user?.roles.includes('USER') && <li><Link to="/usage">사용내역</Link></li>}
//                     <li><Link to="/notice">공지사항</Link></li>
//                     <li><Link to="/support">문의사항</Link></li>
//                     {user && <li>
//                         <button onClick={handleLogout}>Logout</button>
//                     </li>}
//                 </ul>
//             </nav>
//         </header>
//     );
// };
//
// export default Header;
