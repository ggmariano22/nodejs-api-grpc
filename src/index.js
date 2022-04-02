import express from "express";
import { client } from '../client.js';

const app = express();
const port = 8009;

app.get('/', (req, res) => {
    res.send({
        app: 'nodejs + grpc',
        version: 'v1.0',
        author: 'Guilherme Mariano'
    });
});

app.get('/alive', (req, res) => {
    res.json("It's alive!");
});

app.get('/profile/:id', async (req, res) => {
    client.getProfile({id: req.params.id}, (error, profile) => {
        if (error) res.send(error);
        res.json(profile);
    });
    
});

app.listen(port, () => console.log(`Server is running ${port}`));
