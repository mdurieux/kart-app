const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5080;

app.use(cors());
app.use(bodyParser.json());

let lanes = [[], [], []];

app.get('/lanes', (req, res) => {
    res.json(lanes);
});

app.post('/lanes', (req, res) => {
    const { lane, type } = req.body;
    lanes[lane].push(type);
    res.sendStatus(200);
});

app.delete('/lanes/:lane/:index', (req, res) => {
    const lane = parseInt(req.params.lane);
    const index = parseInt(req.params.index);
    lanes[lane].splice(index, 1);
    res.sendStatus(200);
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});