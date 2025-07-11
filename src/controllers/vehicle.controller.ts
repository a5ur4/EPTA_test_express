import { Response } from 'express';
import { CreateVehicleInput, UpdateVehicleStatusData } from '../schemas/vehicle.schema';
import { createVehicleService, getAllVehiclesService, getVehicleByIdService, getVehiclesByUserIdService, updateVehicleService, deleteVehicleService, patchVehicleStatusService } from '../services/vehicle.service';
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

export const getVehiclesByUserIdController = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
        const vehicles = await getVehiclesByUserIdService(req.user!.id);
        res.status(200).json({
            success: true,
            data: vehicles
        });
    } catch (error) {
        res.status(404).json({ 
            success: false,
            error: error instanceof Error ? error.message : 'No vehicles found for this user' 
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

export const patchVehicleStatusController = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
        const statusData: UpdateVehicleStatusData = req.body;
        const updatedVehicle = await patchVehicleStatusService(req.params.id, statusData.status);
        res.status(200).json({
            success: true,
            message: 'Vehicle status updated successfully',
            data: updatedVehicle
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error instanceof Error ? error.message : 'Vehicle status update failed'
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