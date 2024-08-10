import React, {useState} from 'react';
import Vegetables from './Vegetables';

const Home = () => {
    // 상태 변수 이름을 'vegetables'로 수정하여 혼동을 피합니다.
    const [vegetables, setVegetables] = useState([
        {id: 1, name: '당근'},
        {id: 2, name: '감자'},
        {id: 3, name: '호박'},
        {id: 4, name: '고구마'},
        {id: 5, name: '토마토'}
    ]);

    // 사용자 입력 값을 관리하기 위한 상태
    const [inputValue, setInputValue] = useState(
            ''
        )
    ;

    // 새로운 채소를 추가하는 함수
    const addVegetable = () => {
        const newVegetable = {
            id: vegetables.length + 1, // 새로운 ID
            name: inputValue // 사용자 입력 값
        };
        setVegetables([...vegetables, newVegetable]);
        setInputValue(''); // 입력 필드 초기화
    };

    return (
        <div>
            <h1>Home Page</h1>
            {/* Vegetables 컴포넌트에 data를 props로 전달 */}
            <Vegetables vegetablesList={vegetables}/>

            {/* 입력 필드와 버튼 */}
            <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="새 채소 이름을 입력하세요"
            />
            <button onClick={addVegetable}>채소 추가</button>
        </div>
    );
};

export default Home;
