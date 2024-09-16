import { Request, Response } from 'express';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt';
import { UserRepository } from "../repositories/userRepository";
import dotenv from 'dotenv'
import User from '../Dto/userDto';

dotenv.config();

export class userController{
    
    static async register(req:Request, res:Response){
        try {
            const user = req.body;
            await UserRepository.registerUser(user);
            return res.status(201).json({messge: 'Registrado exitosamente'})
        } catch (error) {
            return res.status(500).json({error: (error as Error).message})
        }
    }

    static async login(req:Request, res:Response){
            const { email, pass } = req.body;
        try {
            const user = await UserRepository.loginUser(email, pass);

        if(!user){
            return res.status(401).json({message: 'Credenciales incorrectas'});
        }

        const token = jwt.sign({ email: user.email, rol: user.rol }, process.env.JWT_SECRET as string, { expiresIn: process.env.JWT_EXPIRES})
        
        return res.status(200).json({
            message: 'Usuario autenticado',
            token: token
        }); 
        } catch (error) {
            return res.status(500).json({error: (error as Error).message})
        }
    }
}