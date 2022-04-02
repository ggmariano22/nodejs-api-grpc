import express from "express";
import ProfileController from './controllers/profileController.js';
import AppController from './controllers/appController.js';

const app = express();
const port = 8009;

app.use('/', AppController);
app.use('/profile', ProfileController);

app.listen(port, () => console.log(`Server is running ${port}`));
