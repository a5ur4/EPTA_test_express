import { Router } from 'express';
import { validateDataMiddleware } from '../middlewares/validateData.middleware';
import { createVehicleSchema } from '../schemas/vehicle.schema';
import { createVehicleController } from '../controllers/vehicle.controller';
import { protect } from '../middlewares/protect.middleware';
import { getVehicleByIdService, listAllVehiclesService, updateVehicleService, deleteVehicleService } from '../services/vehicle.service';

const vehicleRoutes = Router();

vehicleRoutes.post(
    '',
    protect,
    validateDataMiddleware(createVehicleSchema) as any,
    createVehicleController
)

vehicleRoutes.get(
    '',
    protect,
    async (req, res) => {
        listAllVehiclesService()
            .then(vehicles => {
                res.status(200).json(vehicles);
            })
            .catch(error => {
                res.status(500).json({ error: error instanceof Error ? error.message : 'An unknown error occurred' });
            });
        res.status(200).json({ message: 'Listagem de veículos' });
    }
);


vehicleRoutes.get(
    '/:id',
    protect,
    async (req, res) => {
        const vehicle = await getVehicleByIdService(req.params.id);
        res.status(200).json(vehicle);
    }
);

// PUT
vehicleRoutes.put(
    '/:id',
    protect,
    validateDataMiddleware(createVehicleSchema) as any,
    async (req, res) => {
        const updatedVehicle = await updateVehicleService(req.params.id, req.body);
        res.status(200).json(updatedVehicle);
    }
);

// DELETE
vehicleRoutes.delete(
    '/:id',
    protect,
    async (req, res) => {
        await deleteVehicleService(req.params.id);
        res.status(200).json({ message: `Veículo com ID ${req.params.id} excluído` });
    }
);

export default vehicleRoutes;