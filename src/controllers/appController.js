import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
    res.send({
        app: 'nodejs + grpc',
        version: 'v1.0',
        author: 'Guilherme Mariano'
    });
});

router.get('/alive', (req, res) => {
    res.send("It's alive!");
});

export default router;
