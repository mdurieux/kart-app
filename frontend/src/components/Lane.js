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
            {karts.map((id, index) => {
                const kart = karts.find((k) => k.id === id);
                return kart ? (
                    <div key={kart.id} onClick={() => onRemoveKart(lane, index)}>
                        <Kart kart={kart} position={index + 1} />
                    </div>
                ) : null;
            })}
        </div>
    );
};

export default Lane;