import { Request, Response } from 'express';
import jwt from "jsonwebtoken";

export class auth {
    public auth(req: Request, res: Response, next: any) {
        const token = req.header('key')
        if (!token) {
            return res.status(400).json({ msg: "no hay token" })
        }
        try {
            const { user }: any = jwt.verify(token, "admin");
            req.eventNames = user.id;
            next();
        } catch (error) {
            res.status(401).json({ msg: "error en autenticaion de token" })
        }
    }
}
