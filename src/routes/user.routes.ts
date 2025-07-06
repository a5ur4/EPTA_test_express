import { Router } from 'express';
import { validateDataMiddleware } from '../middlewares/validateData.middleware';
import { registerSchema, loginSchema, createUserSchema } from '../schemas/user.schema';
import { 
    registerController,
    loginController,
    logoutController,
    getCurrentUserController,
    getAllUsersController,
    getUserByIdController,
    updateUserController,
    deleteUserController
} from '../controllers/user.controller';
import { protect } from '../middlewares/protect.middleware';

const userRoutes = Router();

userRoutes.post(
    '/register',
    validateDataMiddleware(registerSchema) as any,
    registerController
);

userRoutes.post(
    '/login',
    validateDataMiddleware(loginSchema) as any,
    loginController
);

userRoutes.post(
    '/logout',
    protect,
    logoutController
);

userRoutes.get(
    '/me',
    protect,
    getCurrentUserController
);

userRoutes.get(
    '',
    protect,
    getAllUsersController
);

userRoutes.get(
    '/:id',
    protect,
    getUserByIdController
);

userRoutes.put(
    '/:id',
    protect,
    validateDataMiddleware(createUserSchema) as any,
    updateUserController
);

userRoutes.delete(
    '/:id',
    protect,
    deleteUserController
);

export default userRoutes;
