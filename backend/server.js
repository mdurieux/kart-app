const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5080;

app.use(cors());
app.use(bodyParser.json());

let karts = Array(50)
    .fill(null)
    .map((_, index) => ({
        id: index + 1,
        type: null,
        lane: null,
    }));
let lanes = [[], [], []];

app.get('/karts', (req, res) => {
    res.json({ karts, lanes });
});

app.put('/karts/:id', (req, res) => {
    const { type, lane } = req.body;
    const id = parseInt(req.params.id);
    const kart = karts.find((k) => k.id === id);

    if (kart) {
        kart.type = type;
        kart.lane = lane;
        res.sendStatus(200);
    } else {
        res.sendStatus(404);
    }
});

app.post('/lanes/:lane', (req, res) => {
    const id = parseInt(req.body.id);
    const lane = parseInt(req.params.lane);

    if (karts.find((kart) => kart.id === id)) {
        lanes[lane].push(id);
        res.sendStatus(200);
    } else {
        res.sendStatus(404);
    }
});

app.delete('/lanes/:lane/:index', (req, res) => {
    const lane = parseInt(req.params.lane);
    const index = parseInt(req.params.index);
    lanes[lane].splice(index, 1);
    res.sendStatus(200);
});

app.post('/reset-lanes', (req, res) => {
    lanes = [[], [], []];
    res.sendStatus(200);
});

app.post('/reset-karts', (req, res) => {
    karts = karts.map((kart) => ({ ...kart, type: null, lane: null }));
    res.sendStatus(200);
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});