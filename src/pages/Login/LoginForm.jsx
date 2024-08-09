import React, {useState} from 'react';
import axios from 'axios';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/auth/', {username, password});
            const {token} = response.data;
            // JWT 토큰을 로컬 스토리지에 저장하거나, 다른 방식으로 관리
            localStorage.setItem('token', token);
            // 로그인 성공 시 리다이렉트 또는 다른 동작
            console.log('Login successful');
        } catch (error) {
            setError('Invalid username or password');
        }
    };


    return (
        <div>
            <h1>Login Pagedd</h1>
            <form onSubmit={handleSubmit}>
                <input
                    id="username"
                    type="text"
                    name="username"
                    placeholder="id"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    id="password"
                    type="password"
                    name="password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input type="submit" value="login"/>
            </form>
            {error && <div style={{color: 'red'}}>{error}</div>}
        </div>
    );
};

export default LoginForm;
