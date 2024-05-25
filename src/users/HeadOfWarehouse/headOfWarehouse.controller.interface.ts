import { NextFunction, Request, Response } from "express";

export interface IHeadOfWarehouseController {
	findProducts: (req: Request, res: Response, next: NextFunction) => void;
	newParish: (req: Request, res: Response, next: NextFunction) => void;
}
