import React from 'react';

const Vegetables = ({vegetablesList}) => {
    return (
        <div>
            <h1>채소 종류</h1>
            <ul>
                {vegetablesList.map(vegetable => {
                    const {id, name} = vegetable;  // 각 vegetable 객체에서 id와 name을 구조 분해 할당
                    return <li key={id}>{name}</li>;
                })}
            </ul>
        </div>
    );
};

export default Vegetables;
