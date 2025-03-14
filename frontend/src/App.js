import React, { useState, useEffect } from 'react';
import Kart from './components/Kart';
import Lane from './components/Lane';
import KartModal from './components/KartModal';

function App() {
    const [karts, setKarts] = useState([]);
    const [lanes, setLanes] = useState([[], [], []]);
    const [selectedKart, setSelectedKart] = useState(null);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/karts`)
            .then((res) => res.json())
            .then((data) => {
                setKarts(data.karts);
                setLanes(data.lanes);
            });
    }, []);

    const handleKartClick = (kart) => {
        setSelectedKart(kart);
    };

    const handleKartUpdate = (updatedKart) => {
        fetch(`<span class="math-inline">\{process\.env\.REACT\_APP\_API\_URL\}/karts/</span>{updatedKart.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ type: updatedKart.type, lane: updatedKart.lane }),
        }).then(() => {
            fetch(`${process.env.REACT_APP_API_URL}/karts`)
                .then((res) => res.json())
                .then((data) => {
                    setKarts(data.karts);
                    setLanes(data.lanes);
                });
        });
    };

    const handleAddKartToLane = (lane) => {
        fetch(`<span class="math-inline">\{process\.env\.REACT\_APP\_API\_URL\}/lanes/</span>{lane}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: selectedKart.id }),
        }).then(() => {
            fetch(`${process.env.REACT_APP_API_URL}/karts`)
                .then((res) => res.json())
                .then((data) => {
                    setKarts(data.karts);
                    setLanes(data.lanes);
                });
        });
    };

    const handleRemoveKartFromLane = (lane, index) => {
        fetch(`<span class="math-inline">\{process\.env\.REACT\_APP\_API\_URL\}/lanes/</span>{lane}/${index}`, {
            method: 'DELETE',
        }).then(() => {
            fetch(`${process.env.REACT_APP_API_URL}/karts`)
                .then((res) => res.json())
                .then((data) => {
                    setKarts(data.karts);
                    setLanes(data.lanes);
                });
        });
    };

    const handleCloseModal = () => {
        setSelectedKart(null);
    };

    const handleResetLanes = () => {
        fetch(`${process.env.REACT_APP_API_URL}/reset-lanes`, { method: 'POST' })
            .then(() => {
                fetch(`${process.env.REACT_APP_API_URL}/karts`)
                    .then((res) => res.json())
                    .then((data) => {
                        setKarts(data.karts);
                        setLanes(data.lanes);
                    });
            });
    };

    const handleResetKarts = () => {
        fetch(`${process.env.REACT_APP_API_URL}/reset-karts`, { method: 'POST' })
            .then(() => {
                fetch(`${process.env.REACT_APP_API_URL}/karts`)
                    .then((res) => res.json())
                    .then((data) => {
                        setKarts(data.karts);
                        setLanes(data.lanes);
                    });
            });
    };

    const kartTableStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gap: '5px',
        marginTop: '20px',
    };

    return (
        <div>
            <div>
                {lanes.map((lane, index) => (
                    <Lane
                        key={index}
                        lane={index}
                        karts={lanes[index].map((id, index) => {
                            const kart = karts.find((kart) => kart.id === id);
                            return kart;
                        })}
                        onRemoveKart={handleRemoveKartFromLane}
                    />
                ))}
            </div>
            <div style={kartTableStyle}>
                {karts.map((kart) => (
                    <Kart key={kart.id} kart={kart} onClick={handleKartClick} />
                ))}
            </div>
            {selectedKart && (
                <KartModal
                    kart={selectedKart}
                    onClose={handleCloseModal}
                    onUpdate={handleKartUpdate}
                    onAddToLane={handleAddKartToLane}
                />
            )}
            <div style={{ marginTop: '20px' }}>
                <button onClick={handleResetLanes}>Reset Lanes</button>
                <button onClick={handleResetKarts}>Reset Karts</button>
            </div>
        </div>
    );
}

export default App;