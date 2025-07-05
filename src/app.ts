import 'express-async-errors';
import express, { Application } from 'express';
import cors from 'cors';
/*import { handleErrors } from './errors/handleErrors';
import vehicleRoutes from './routes/vehicle.routes';
import userRoutes from './routes/user.routes';*/

const app: Application = express();

app.use(cors());
app.use(express.json()); 

app.use('/', (req, res) => {
    res.send('Hello, World!');
});

/*app.use('/users', userRoutes);
app.use('/vehicles', vehicleRoutes);

app.use(handleErrors);*/

export default app;