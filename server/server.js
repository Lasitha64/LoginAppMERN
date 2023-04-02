import express from 'express'; // to import like this have to add type : module to package.json
import cors from 'cors';
import morgan from 'morgan';
import connect from './database/conn.js';

const app = express();

// middle wears
app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));        // http logger
app.disable('x-powered-by');    // less hackers know about stack

const port = 8082;

// get request
app.get('/', (req, res) =>{
    res.status(201).json('Home get request');
});

// start server only when we have valid connection
connect().then(() => {
    try {
        app.listen(port, () => {
            console.log('Starting');
        });
    } catch (error) {
        console.log('Cannot connect to the server')
    }
}).catch(error => {
    console.log('Invalid db connection');
})

