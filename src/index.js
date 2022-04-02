import express from "express";
import fetch from "node-fetch";
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

app.get('/grpc/profile/:id', (req, res) => {
    client.getProfile({id: req.params.id}, (error, profile) => {
        if (error) res.send(error);
        res.status(200).send(profile);
    });
    
});

app.get('/rest/profile/:id', async (req, res) => {
    const results = await fetch(`https://api.github.com/users/${req.params.id}`);
    res.json(await results.json());
})

app.listen(port, () => console.log(`Server is running ${port}`));
