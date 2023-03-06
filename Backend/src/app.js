import express from 'express';
import notesRoutes from './routes/notes.routes.js';
import usersRoutes from './routes/users.routes.js';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

let __dirname = path.dirname(__filename);
__dirname = path.join(__dirname, '../../Frontend');

const app = express();


app.use((req, res, next) => {

    // Set the Access-Control-Allow-Origin header to allow requests from any domain (change!)
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });

//middlewares
app.use(express.json())

app.use(express.static(__dirname));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'));
});

app.use(notesRoutes);
app.use(usersRoutes);

export default app;