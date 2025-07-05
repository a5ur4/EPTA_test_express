import { Response } from 'express';
import { CreateVehicleInput } from '../schemas/vehicle.schema';
import { createVehicleService, getAllVehiclesService, getVehicleByIdService, updateVehicleService, deleteVehicleService } from '../services/vehicle.service';
import { AuthenticatedRequest } from '../interfaces/auth.interface';

export const createVehicleController = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
        const vehicleInput: CreateVehicleInput = req.body;
        const vehicleData = {
            ...vehicleInput,
            userId: req.user!.id
        };
        const newVehicle = await createVehicleService(vehicleData);
        res.status(201).json({
            success: true,
            message: 'Vehicle created successfully',
            data: newVehicle
        });
    } catch (error) {
        res.status(400).json({ 
            success: false,
            error: error instanceof Error ? error.message : 'Vehicle creation failed' 
        });
    }
};

export const getAllVehiclesController = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
        const vehicles = await getAllVehiclesService();
        res.status(200).json({
            success: true,
            data: vehicles
        });
    } catch (error) {
        res.status(500).json({ 
            success: false,
            error: error instanceof Error ? error.message : 'Failed to fetch vehicles' 
        });
    }
};

export const getVehicleByIdController = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
        const vehicle = await getVehicleByIdService(req.params.id);
        res.status(200).json({
            success: true,
            data: vehicle
        });
    } catch (error) {
        res.status(404).json({ 
            success: false,
            error: error instanceof Error ? error.message : 'Vehicle not found' 
        });
    }
};

export const updateVehicleController = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
        const updatedVehicle = await updateVehicleService(req.params.id, req.body);
        res.status(200).json({
            success: true,
            message: 'Vehicle updated successfully',
            data: updatedVehicle
        });
    } catch (error) {
        res.status(400).json({ 
            success: false,
            error: error instanceof Error ? error.message : 'Vehicle update failed' 
        });
    }
};

export const deleteVehicleController = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
        await deleteVehicleService(req.params.id);
        res.status(200).json({
            success: true,
            message: `Vehicle with ID ${req.params.id} deleted successfully`
        });
    } catch (error) {
        res.status(404).json({ 
            success: false,
            error: error instanceof Error ? error.message : 'Vehicle not found' 
        });
    }
};