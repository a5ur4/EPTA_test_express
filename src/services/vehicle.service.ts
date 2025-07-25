import { prisma } from '../config/database';
import { Status } from '../generated/prisma';
import { CreateVehicleData } from '../schemas/vehicle.schema';

export const createVehicleService = async (data: CreateVehicleData) => {
    const newVehicle = await prisma.vehicle.create({
        data: {
            name: data.name,
            plateNumber: data.plateNumber,
            year: data.year,
            type: data.type,
            color: data.color,
            userId: data.userId
        }
    });

    return newVehicle;
};

export const getAllVehiclesService = async () => {
    const vehicles = await prisma.vehicle.findMany({
        include: {
            user: false
        }
    });

    return vehicles;
}

export const getVehicleByIdService = async (id: string) => {
    const vehicle = await prisma.vehicle.findUnique({
        where: { id },
        include: {
            user: false
        }
    });

    if (!vehicle) {
        throw new Error('Vehicle not found');
    }

    return vehicle;
};

export const getVehiclesByUserIdService = async (userId: string) => {
    const vehicles = await prisma.vehicle.findMany({
        where: { userId },
        include: {
            user: false
        }
    });

    if (vehicles.length === 0) {
        throw new Error('No vehicles found for this user');
    }

    return vehicles;
};

export const updateVehicleService = async (id: string, data: CreateVehicleData) => {
    const updatedVehicle = await prisma.vehicle.update({
        where: { id },
        data: {
            name: data.name,
            plateNumber: data.plateNumber,
            year: data.year,
            type: data.type,
            color: data.color
        }
    });

    return updatedVehicle;
};

export const patchVehicleStatusService = async (id: string, status: Status) => {
    if (!Object.values(Status).includes(status)) {
        throw new Error('Invalid status value');
    }
    const updatedVehicle = await prisma.vehicle.update({
        where: { id },
        data: {
            status: status
        }
    });
    return updatedVehicle;
};

export const deleteVehicleService = async (id: string) => {
    const deletedVehicle = await prisma.vehicle.delete({
        where: { id }
    });

    return deletedVehicle;
};