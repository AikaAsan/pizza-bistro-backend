import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import * as dotenv from 'dotenv';
import { registerValidation } from './validations.js';
import checkAuth from './utils/checkAuth.js';
import { UserController, PizzaController } from './controllers/index.js';

const port = process.env.PORT || 5000;

dotenv.config();

const uri = process.env.URI;

const app = express();
app.use(express.json());
app.use(cors());

mongoose
    .connect(uri)
    .then(() => console.log('successfully connected to database'))
    .catch((err) =>
        console.log('something went wrong during connecting to database', err)
    );

app.post('/auth/register', registerValidation, UserController.register);
app.post('/auth/login', UserController.login);
app.get('/auth/me', checkAuth, UserController.getMe);

//ROUTES for PIZZAS
app.get('/', PizzaController.getPizzas);
app.get('/pizza/:id', PizzaController.getOnePizza);

app.listen(port, (err) => {
    if (err) {
        return console.log(err);
    }

    console.log('Server is running on port 5000');
});
