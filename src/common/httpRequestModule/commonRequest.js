import axios from 'axios';

const commonRequest = axios.create({
    baseURL: 'http://localhost:8080/api',
    timeout: 1000,
    withCredentials: true, // 쿠키 포함 요청 보내기
});

commonRequest.interceptors.request.use(
    config => {
        // 요청 전에 수행할 작업
        return config;
    },
    error => {
        // 요청 에러가 발생했을 때 처리
        return Promise.reject(error);
    }
);

commonRequest.interceptors.response.use(
    response => {
        // 응답 데이터 가공 등
        return response;
    },
    error => {
        // 응답 에러가 발생했을 때 처리
        return Promise.reject(error);
    }
);

export default commonRequest;
