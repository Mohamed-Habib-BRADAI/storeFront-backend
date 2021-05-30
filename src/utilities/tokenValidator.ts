import express, {Request, Response} from 'express';
import jwt from 'jsonwebtoken';

const verifyAuthToken = (req: Request, res: Response, next: () => void) => {
    try {
        if (process.env.TOKEN_SECRET) {
            const authorizationHeader = (req.headers.authorization as unknown) as string;
            const token = authorizationHeader.split(' ')[1]
            const decoded = jwt.verify(token, process.env.TOKEN_SECRET)
            next()
        }

    } catch (error) {
        res.status(401);
        res.json('Access denied, invalid token');
    }
}
export default verifyAuthToken;
