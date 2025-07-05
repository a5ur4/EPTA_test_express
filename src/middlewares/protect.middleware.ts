import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface AuthenticatedRequest extends Request {
    user?: {
        id: string;
        email: string;
    };
}

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
