import express from 'express';
import {routes} from './routes/routes.js';
var app = express();
routes(app);
app.listen(5000, ()=>{
});