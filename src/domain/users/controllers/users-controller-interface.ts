import { NextFunction, Request, Response } from "express";
export interface IUserController {
	login: (req: Request, res: Response, next: NextFunction) => void;
	changeDataUser: (req: Request, res: Response, next: NextFunction) => void;
	headOfWarehouse: (req: Request, res: Response, next: NextFunction) => void;
	register: (req: Request, res: Response, next: NextFunction) => void;
}
