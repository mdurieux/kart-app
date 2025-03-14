import React from 'react';

const Kart = ({ kart, onClick, position }) => {
    const colors = {
        fast: 'green',
        medium: 'yellow',
        bad: 'red',
    };

    const style = {
        backgroundColor: kart.type ? colors[kart.type] : '#eee',
        width: '50px',
        height: '30px',
        margin: '5px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'black',
        fontSize: '14px',
    };

    return (
        <div style={style} onClick={onClick}>
            {position ? position : kart.id}
        </div>
    );
};

export default Kart;