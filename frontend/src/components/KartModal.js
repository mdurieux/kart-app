import React, { useState } from 'react';

const KartModal = ({ kart, onClose, onUpdate, onAddToLane }) => {
    const [type, setType] = useState(kart.type);
    const lane = kart.lane; // On récupère lane sans useState

    const handleSave = () => {
        onUpdate({ ...kart, type, lane });
        onClose();
    };

    return (
        <div>
            <h3>Kart {kart.id}</h3>
            <select value={type || ''} onChange={(e) => setType(e.target.value)}>
                <option value="">None</option>
                <option value="fast">Fast</option>
                <option value="medium">Medium</option>
                <option value="bad">Bad</option>
            </select>
            <button onClick={handleSave}>Save</button>
            <div>
                <button onClick={() => onAddToLane(0)}>Add to Lane 1</button>
                <button onClick={() => onAddToLane(1)}>Add to Lane 2</button>
                <button onClick={() => onAddToLane(2)}>Add to Lane 3</button>
            </div>
            <button onClick={onClose}>Close</button>
        </div>
    );
};

export default KartModal;