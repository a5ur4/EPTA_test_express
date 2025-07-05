import { Router } from 'express';
import { validateDataMiddleware } from '../middlewares/validateData.middleware';
import { createVehicleSchema } from '../schemas/vehicle.schema';
import { 
    createVehicleController, 
    getAllVehiclesController,
    getVehicleByIdController,
    getVehiclesByUserIdController,
    updateVehicleController,
    deleteVehicleController
} from '../controllers/vehicle.controller';
import { protect } from '../middlewares/protect.middleware';

const vehicleRoutes = Router();

vehicleRoutes.post(
    '',
    protect,
    validateDataMiddleware(createVehicleSchema) as any,
    createVehicleController
);

vehicleRoutes.get(
    '',
    protect,
    getAllVehiclesController
);

vehicleRoutes.get(
    '/:id',
    protect,
    getVehicleByIdController
);

vehicleRoutes.get(
    '/user/:userid',
    protect,
    getVehiclesByUserIdController
);

vehicleRoutes.put(
    '/:id',
    protect,
    validateDataMiddleware(createVehicleSchema) as any,
    updateVehicleController
);

vehicleRoutes.delete(
    '/:id',
    protect,
    deleteVehicleController
);

export default vehicleRoutes;