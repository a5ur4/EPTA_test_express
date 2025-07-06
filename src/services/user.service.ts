import { prisma } from "../config/database";
import { CreateUserData, LoginData, RegisterData } from "../schemas/user.schema";
import { encryptPassword, comparePassword, generateToken } from "../middlewares/protect.middleware";
import { tokenBlacklist } from "../utils/tokenBlacklist";

export const registerUserService = async (data: RegisterData) => {
    const existingUser = await prisma.user.findUnique({
        where: { email: data.email }
    });

    if (existingUser) {
        throw new Error('User already exists with this email');
    }

    const hashedPassword = await encryptPassword(data.password);

    const newUser = await prisma.user.create({
        data: {
            name: data.name,
            email: data.email,
            password: hashedPassword,
        },
        select: {
            id: true,
            name: true,
            email: true,
            createdAt: true,
            updatedAt: true
        }
    });

    const token = generateToken({ id: newUser.id, email: newUser.email });

    return {
        user: newUser,
        token
    };
};

export const loginUserService = async (data: LoginData) => {
    const user = await prisma.user.findUnique({
        where: { email: data.email }
    });

    if (!user) {
        throw new Error('Invalid email or password');
    }

    const isPasswordValid = await comparePassword(data.password, user.password!);
    if (!isPasswordValid) {
        throw new Error('Invalid email or password');
    }

    const token = generateToken({ id: user.id, email: user.email });

    return {
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        },
        token
    };
};

export const getCurrentUserService = async (userId: string) => {
    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
            id: true,
            name: true,
            email: true,
            createdAt: true,
            updatedAt: true
        },
    });
    if (!user) {
        throw new Error('User not found');
    }
    return user;
};

export const getAllUsersService = async () => {
    const users = await prisma.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            createdAt: true,
            updatedAt: true,
            vehicles: true
        },
    });

    return users;
}

export const getUserByIdService = async (id: string) => {
    const user = await prisma.user.findUnique({
        where: { id },
        select: {
            id: true,
            name: true,
            email: true,
            createdAt: true,
            updatedAt: true,
            vehicles: true
        },
    });

    if (!user) {
        throw new Error('User not found');
    }

    return user;
};

export const updateUserService = async (id: string, data: CreateUserData) => {
    const updateData: any = {
        name: data.name,
        email: data.email,
    };

    if (data.password) {
        updateData.password = await encryptPassword(data.password);
    }

    const updatedUser = await prisma.user.update({
        where: { id },
        data: updateData,
        select: {
            id: true,
            name: true,
            email: true,
            createdAt: true,
            updatedAt: true
        }
    });

    return updatedUser;
};

export const deleteUserService = async (id: string) => {
    const deletedUser = await prisma.user.delete({
        where: { id },
    });

    return deletedUser;
};

export const logoutUserService = async (token: string) => {
    tokenBlacklist.addToken(token);
    
    return {
        message: 'Logout successful'
    };
};