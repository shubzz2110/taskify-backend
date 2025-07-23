import { NextFunction, Request, Response } from "express";
import { ZodType } from "zod";

const validate = (schema: ZodType) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = await schema.parseAsync(req.body);
      next();
    } catch (err: any) {
      return res.status(400).json({
        errors: err.errors,
      });
    }
  };
};

export default validate;
