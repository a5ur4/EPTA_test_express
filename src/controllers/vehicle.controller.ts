import { Request, Response } from 'express';
import { CreateVehicleData } from '../schemas/vehicle.schema';
import { createVehicleService } from '../services/vehicle.service';

export const createVehicleController = async (req: Request, res: Response): Promise<void> => {
    try {
        const vehicleData: CreateVehicleData = req.body;
        const newVehicle = await createVehicleService(vehicleData);
        res.status(201).json(newVehicle);
    } catch (error) {
        res.status(400).json({ error: error instanceof Error ? error.message : 'An unknown error occurred' });
    }
};