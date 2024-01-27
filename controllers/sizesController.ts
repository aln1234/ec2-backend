import { NextFunction, Request, Response } from "express";

// services
import SizeService from "../services/sizeService";

// error builder
import { ApiError } from "../errors/ApiError";

//type
import { TSizeSchema } from "../types/size";

export async function findAllSize(
  _: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const sizes = await SizeService.findAll();
    res.json(sizes);
  } catch (error) {
    next(ApiError.internal("Internal server error"));
  }
}

export async function createOneSize(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const sizeData: TSizeSchema = req.body;
    const size = await SizeService.createOne(sizeData);
    res.status(201).json(size);
  } catch (error) {
    next(ApiError.internal("Internal server error"));
  }
}

export async function findSingleSize(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const sizeId = req.params.sizeId;
    const size = await SizeService.findOne(sizeId);
    if (!size) {
      const notFoundError = ApiError.resourceNotFound("Size not found.");
      return next(notFoundError);
    }
    res.json(size);
  } catch (error) {
    const internalServerError = ApiError.internal("Internal server error.");
    next(internalServerError);
  }
}

export async function updateSize(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const sizeId = req.params.sizeId;
    const sizeData: TSizeSchema = req.body;
    const size = await SizeService.updateSize(sizeId, sizeData);
    res.json(size);
  } catch (error) {
    next(ApiError.internal("Internal server error"));
  }
}

export async function deleteSize(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const sizeId = req.params.sizeId;
    const size = await SizeService.deleteSize(sizeId);
    res.status(204).send();
  } catch (error) {
    next(ApiError.internal("Internal server error"));
  }
}
