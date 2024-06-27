import { NextFunction, Request, Response } from "express";
export interface IProductsController {
	createProduct: (req: Request, res: Response, next: NextFunction) => void;
	deleteProduct: (req: Request, res: Response, next: NextFunction) => void;
	changeCount: (req: Request, res: Response, next: NextFunction) => void;
}
