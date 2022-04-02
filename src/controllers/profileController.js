import express from 'express';
import client from '../grpc/client.js';
import fetch from "node-fetch";

const router = express.Router();

router.get('/grpc/:id', (req, res) => {
    client.getProfile({id: req.params.id}, (error, profile) => {
        if (error) res.send(error);
        res.status(200).send(profile);
    });
});

router.get('/rest/:id', async (req, res) => {
    const results = await fetch(`https://api.github.com/users/${req.params.id}`);
    res.json(await results.json());
})

export default router;
