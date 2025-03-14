import React, { useState, useEffect } from 'react';
import Lane from './components/Lane';

function App() {
    const [lanes, setLanes] = useState([[], [], []]);
    const [newKartType, setNewKartType] = useState('fast');
    const [newKartLane, setNewKartLane] = useState(0);

    useEffect(() => {
        fetch('http://localhost:5080/lanes')
            .then((res) => res.json())
            .then((data) => setLanes(data));
    }, []);

    const handleAddKart = () => {
        fetch('http://localhost:5080/lanes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ lane: newKartLane, type: newKartType }),
        }).then(() => {
            fetch('http://localhost:5080/lanes')
                .then((res) => res.json())
                .then((data) => setLanes(data));
        });
    };

    const handleRemoveKart = (lane, index) => {
        fetch(`http://localhost:5080/lanes/${lane}/${index}`, {
            method: 'DELETE',
        }).then(() => {
            fetch('http://localhost:5080/lanes')
                .then((res) => res.json())
                .then((data) => setLanes(data));
        });
    };

    return (
        <div>
            <div>
                <select value={newKartType} onChange={(e) => setNewKartType(e.target.value)}>
                    <option value="fast">Fast</option>
                    <option value="medium">Medium</option>
                    <option value="bad">Bad</option>
                </select>
                <select value={newKartLane} onChange={(e) => setNewKartLane(parseInt(e.target.value))}>
                    <option value={0}>Lane 1</option>
                    <option value={1}>Lane 2</option>
                    <option value={2}>Lane 3</option>
                </select>
                <button onClick={handleAddKart}>Add Kart</button>
            </div>
            {lanes.map((lane, index) => (
                <div key={index}>
                    <h3>Lane {index + 1}</h3>
                    <Lane lane={index} karts={lane} onRemoveKart={handleRemoveKart} />
                </div>
            ))}
        </div>
    );
}

export default App;