import React, {useState} from 'react';
import axios from 'axios';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/auth/', {email, password});
            const {token} = response.data;
            // JWT 토큰을 로컬 스토리지에 저장하거나, 다른 방식으로 관리
            localStorage.setItem('token', token);
            // 로그인 성공 시 리다이렉트 또는 다른 동작
            console.log('Login successful');
        } catch (error) {
            setError('Invalid email or password');
        }
    };

    const alertMethod = () => {
        alert('테스트다');
    };

    const [isHovered, setIsHovered] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [inputValue, setInputValue] = useState('');

    function inputTest(event) {
        setInputValue(event.target.value);
    }

    return (
        <div>
            <div>
                <input
                    type="text"
                    onChange={inputTest}
                    value={inputValue}
                    placeholder={'입력값이 나오는지'}
                />
            </div>
            <p>입력한 값 = {inputValue}</p>
            <div>
                <div
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    style={{width: '200px', height: '200px', backgroundColor: isHovered ? 'lightblue' : 'lightgray'}}
                >
                    Hover over me!
                </div>
            </div>
            <div>
                <input
                    type="text"
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholder={isFocused ? 'Focus is on me!' : 'Click to focus'}
                />
            </div>
            <button onClick={alertMethod}>눌러보렴</button>

            <h1>Sign-Up Page</h1>
            <form onSubmit={handleSubmit}>
                <input
                    id="email"
                    type="text"
                    name="email"
                    placeholder="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
