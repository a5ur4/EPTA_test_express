import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { AuthenticatedRequest } from '../interfaces/auth.interface';
import { tokenBlacklist } from '../utils/tokenBlacklist';

export const protect = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    try {
        let token: string | undefined;

        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            res.status(401).json({
                success: false,
                message: 'Acesso negado. Token não fornecido.'
            });
            return;
        }

        if (tokenBlacklist.isTokenBlacklisted(token)) {
            res.status(401).json({
                success: false,
                message: 'Token inválido. Faça login novamente.'
            });
            return;
        }

        const JWT_SECRET = process.env.JWT_SECRET;
        if (!JWT_SECRET) {
            res.status(500).json({
                success: false,
                message: 'Erro interno do servidor: JWT_SECRET não configurado.'
            });
            return;
        }

        const decoded = jwt.verify(token, JWT_SECRET) as {
            id: string;
            email: string;
            iat: number;
            exp: number;
        };

        req.user = {
            id: decoded.id,
            email: decoded.email
        };

        req.token = token;

        next();
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            res.status(401).json({
                success: false,
                message: 'Token inválido.'
            });
            return;
        }

        if (error instanceof jwt.TokenExpiredError) {
            res.status(401).json({
                success: false,
                message: 'Token expirado.'
            });
            return;
        }

        res.status(500).json({
            success: false,
            message: 'Erro interno do servidor.'
        });
    }
};

export const encryptPassword = async (password: string): Promise<string> => {
    const saltRounds = 12;
    return await bcrypt.hash(password, saltRounds);
};

export const comparePassword = async (password: string, hash: string): Promise<boolean> => {
    return await bcrypt.compare(password, hash);
};

export const generateToken = (user: { id: string; email: string }): string => {
    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined');
    }

    return jwt.sign(
        { id: user.id, email: user.email },
        JWT_SECRET,
        { expiresIn: '24h' }
    );
};