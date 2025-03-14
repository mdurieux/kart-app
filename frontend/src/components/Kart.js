import React from 'react';

const Kart = ({ type, position }) => {
    const colors = {
        fast: 'green',
        medium: 'yellow',
        bad: 'red',
    };

    const style = {
        backgroundColor: colors[type],
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
        <div style={style}>
            {position}
        </div>
    );
};

export default Kart;