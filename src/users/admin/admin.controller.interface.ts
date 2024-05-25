import { NextFunction, Request, Response } from "express";


export interface IAdminController {
	register: (req: Request, res: Response, next: NextFunction) => void;
	createProduct: (req: Request, res: Response, next: NextFunction) => void;
	updateProduct: (req: Request, res: Response, next: NextFunction) => void;
	findProducts: (req: Request, res: Response, next: NextFunction) => void;
  deleteProduct:(req: Request, res: Response, next: NextFunction) => void;
}
