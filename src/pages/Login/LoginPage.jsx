import React, {useState} from 'react';
import commonRequest from "@common/httpRequestModule/commonRequest";
import './LoginPage.css';
import {useNavigate} from "react-router-dom";
import {jwtDecode} from "jwt-decode";

const LoginPage = ({setUser}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await commonRequest.post('/auth/login', {email, password});
            console.log(response);
            const token = response.data.accessToken;
            const refreshToken = response.data.refreshToken;

            // 토큰을 로컬 스토리지에 저장
            localStorage.setItem('accessToken', token);
            localStorage.setItem('refreshToken', refreshToken);

            // 사용자 정보 디코딩
            const decodedToken = jwtDecode(token);
            const user = {
                email: decodedToken.sub,
                roles: decodedToken.roles.split(',')
            };
            localStorage.setItem('user', JSON.stringify(user));

            // 로그인한 사용자 상태 업데이트
            setUser(user);

            // 사용자의 권한에 따라 리다이렉트 처리
            if (decodedToken.roles.includes('ADMIN')) {
                console.log('ADMIN 입니다.');
                navigate('/admin');
            } else if (decodedToken.roles.includes('USER')) {
                console.log('USER 입니다.');
                navigate('/mypage');
            } else {
                navigate('/'); // 기타 권한의 경우 홈으로 리다이렉트
            }

        } catch (error) {
            console.log(error);
            setError('Invalid email or password');
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        id="email"
                        type="text"
                        name="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        id="password"
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <input type="submit" value="Login"/>
                </form>
                {error && <div className="error-message">{error}</div>}
            </div>
        </div>
    );
};

export default LoginPage;
// const LoginPage = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState('');
//     const navigate = useNavigate();
//
//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         try {
//             const response = await commonRequest.post('/auth/login', {email, password});
//             console.log(response);
//             const token = response.data.accessToken;
//             const refreshToken = response.data.refreshToken;
//
//             // 토큰을 로컬 스토리지에 저장
//             localStorage.setItem('accessToken', token);
//             localStorage.setItem('refreshToken', refreshToken);
//
//             // 사용자 정보 디코딩
//             const decodedToken = jwtDecode(token);
//             localStorage.setItem('user', JSON.stringify({
//                 email: decodedToken.sub,
//                 roles: decodedToken.roles.split(',')
//             }));
//
//             // 사용자의 권한에 따라 리다이렉트 처리
//             if (decodedToken.roles.includes('ADMIN')) {
//                 console.log('ADMIN 입니다.');
//                 navigate('/admin');
//             } else if (decodedToken.roles.includes('USER')) {
//                 console.log('USER 입니다.');
//                 navigate('/mypage');
//             } else {
//                 navigate('/'); // 기타 권한의 경우 홈으로 리다이렉트
//             }
//
//         } catch (error) {
//             setError('Invalid email or password');
//         }
//     };
//
//     return (
//         <div className="login-container">
//             <div className="login-box">
//                 <h1>Login</h1>
//                 <form onSubmit={handleSubmit}>
//                     <input
//                         id="email"
//                         type="text"
//                         name="email"
//                         placeholder="Email"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                     />
//                     <input
//                         id="password"
//                         type="password"
//                         name="password"
//                         placeholder="Password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                     />
//                     <input type="submit" value="Login"/>
//                 </form>
//                 {error && <div className="error-message">{error}</div>}
//             </div>
//         </div>
//     );
// };
//
// export default LoginPage;