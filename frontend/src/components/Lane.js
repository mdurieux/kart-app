import React from 'react';
import Kart from './Kart';

const Lane = ({ lane, karts, onRemoveKart }) => {
    const laneStyle = {
        display: 'flex',
        border: '2px solid #ccc',
        padding: '10px',
        margin: '10px 0',
        position: 'relative',
    };

    return (
        <div style={laneStyle}>
            {karts.map((kart, index) => (
                <div key={index} onClick={() => onRemoveKart(lane, index)}>
                    <Kart type={kart} position={index + 1} />
                </div>
            ))}
        </div>
    );
};

export default Lane;