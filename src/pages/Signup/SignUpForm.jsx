import React, {useState} from 'react';
import './SignUpForm.css';
import commonRequest from '@common/httpRequestModule/commonRequest';
import {useNavigate} from "react-router-dom";

const SignUpForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isEmailChecked, setIsEmailChecked] = useState(false); // 이메일 중복 검사 여부
    const [emailValidationMessage, setEmailValidationMessage] = useState(''); // 이메일 유효성 검사 메시지
    const [emailValidationMessageColor, setEmailValidationMessageColor] = useState(''); // 메시지 색상
    const navigate = useNavigate();

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleEmailCheck = async () => {
        // 이메일 유효성 검사
        if (!validateEmail(email)) {
            setEmailValidationMessage('올바른 이메일 형식이 아닙니다.');
            setEmailValidationMessageColor('red'); // 실패 시 빨간 글씨
            setIsEmailChecked(false);
            return;
        }

        setEmailValidationMessage(''); // 유효성 검사 통과 시 메시지 초기화

        try {
            // 이메일 중복 확인 API 호출
            const response = await commonRequest.post('/auth/check-email', {email});

            if (response.data.exists) {
                setError('');
                setEmailValidationMessage('이미 존재하는 이메일입니다.');
                setEmailValidationMessageColor('red'); // 실패 시 빨간 글씨
                setIsEmailChecked(false); // 중복된 이메일이 있는 경우
            } else {
                setError('');
                setIsEmailChecked(true); // 중복되지 않는 경우
                setEmailValidationMessage('사용 가능한 이메일입니다.');
                setEmailValidationMessageColor('green'); // 성공 시 초록 글씨
            }
        } catch (error) {
            setEmailValidationMessage('이메일 중복 확인 중 오류가 발생했습니다.');
            setEmailValidationMessageColor('red'); // 실패 시 빨간 글씨
            setIsEmailChecked(false);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // 유효성 검사
        if (name.trim() === '') {
            setError('이름을 입력해 주세요.');
            return;
        }

        if (!validateEmail(email)) {
            setError('올바른 이메일 형식을 입력해 주세요.');
            return;
        }

        if (companyName.trim() === '') {
            setError('회사명을 입력해 주세요.');
            return;
        }

        if (password.trim() === '') {
            setError('비밀번호를 입력해 주세요.');
            return;
        }

        if (password !== confirmPassword) {
            setError('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
            return;
        }

        if (!isEmailChecked) {
            setError('이메일 중복 검사를 완료해 주세요.');
            return;
        }

        try {
            const response = await commonRequest.post('/auth/signup', {
                name,
                email,
                companyName,
                password,
            });
            setSuccess('회원가입이 완료되었습니다.');
            setError('');

            // 회원가입 성공 시 alert 창 띄우고 로그인 페이지로 이동
            alert('회원가입이 완료되었습니다.');
            navigate('/login');
        } catch (error) {
            if (error.response && error.response.status === 409) {
                setError('이미 존재하는 사용자입니다.');
            } else {
                setError('회원가입에 실패했습니다. 입력한 정보를 확인해주세요.');
            }
        }
    };

    return (
        <div className="signup-form">
            <h1>Sign-Up Page</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">이름:</label>
                <input
                    id="name"
                    type="text"
                    name="name"
                    placeholder="이름"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <label htmlFor="email">이메일:</label>
                <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="이메일"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                        setIsEmailChecked(false); // 이메일이 변경되면 중복 검사 상태를 초기화
                        setEmailValidationMessage(''); // 이메일 유효성 검사 메시지 초기화
                    }}
                />
                <button type="button" onClick={handleEmailCheck}>이메일 중복 확인</button>
                {emailValidationMessage && (
                    <div style={{color: emailValidationMessageColor}}>{emailValidationMessage}</div>
                )} {/* 유효성 검사 메시지 출력 */}

                <label htmlFor="companyName">회사명:</label>
                <input
                    id="companyName"
                    type="text"
                    name="companyName"
                    placeholder="회사명"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                />

                <label htmlFor="password">비밀번호:</label>
                <input
                    id="password"
                    type="password"
                    name="password"
                    placeholder="비밀번호"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <label htmlFor="confirmPassword">비밀번호 확인:</label>
                <input
                    id="confirmPassword"
                    type="password"
                    name="confirmPassword"
                    placeholder="비밀번호 확인"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />

                <button type="submit" disabled={!isEmailChecked}>회원가입</button>
            </form>
            {error && <div style={{color: 'red'}}>{error}</div>}
            {success && <div style={{color: 'green'}}>{success}</div>}
        </div>
    );
};

export default SignUpForm;