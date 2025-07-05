import { Request, Response } from 'express';
import { RegisterData, LoginData } from '../schemas/user.schema';
import { 
    registerUserService, 
    loginUserService, 
    getAllUsersService,
    getUserByIdService,
    updateUserService,
    deleteUserService
} from '../services/user.service';

export const registerController = async (req: Request, res: Response): Promise<void> => {
    try {
        const userData: RegisterData = req.body;
        const result = await registerUserService(userData);
        
        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            data: result
        });
    } catch (error) {
        res.status(400).json({ 
            success: false,
            error: error instanceof Error ? error.message : 'Registration failed' 
        });
    }
};

export const loginController = async (req: Request, res: Response): Promise<void> => {
    try {
        const loginData: LoginData = req.body;
        const result = await loginUserService(loginData);
        
        res.status(200).json({
            success: true,
            message: 'Login successful',
            data: result
        });
    } catch (error) {
        res.status(401).json({ 
            success: false,
            error: error instanceof Error ? error.message : 'Login failed' 
        });
    }
};

export const getAllUsersController = async (req: Request, res: Response): Promise<void> => {
    try {
        const users = await getAllUsersService();
        
        res.status(200).json({
            success: true,
            data: users
        });
    } catch (error) {
        res.status(500).json({ 
            success: false,
            error: error instanceof Error ? error.message : 'Failed to fetch users' 
        });
    }
};

export const getUserByIdController = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await getUserByIdService(req.params.id);
        
        res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        res.status(404).json({ 
            success: false,
            error: error instanceof Error ? error.message : 'User not found' 
        });
    }
};

export const updateUserController = async (req: Request, res: Response): Promise<void> => {
    try {
        const updatedUser = await updateUserService(req.params.id, req.body);
        
        res.status(200).json({
            success: true,
            message: 'User updated successfully',
            data: updatedUser
        });
    } catch (error) {
        res.status(400).json({ 
            success: false,
            error: error instanceof Error ? error.message : 'User update failed' 
        });
    }
};

export const deleteUserController = async (req: Request, res: Response): Promise<void> => {
    try {
        await deleteUserService(req.params.id);
        
        res.status(200).json({
            success: true,
            message: `User with ID ${req.params.id} deleted successfully`
        });
    } catch (error) {
        res.status(404).json({ 
            success: false,
            error: error instanceof Error ? error.message : 'User not found' 
        });
    }
};
