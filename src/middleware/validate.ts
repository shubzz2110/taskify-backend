import { NextFunction, Request, Response } from "express";
import { ZodObject, ZodSchema, ZodType } from "zod";

type ValidationSchemas = {
  body?: ZodSchema;
  params?: ZodSchema;
  query?: ZodSchema;
};

const validate = (schema: ValidationSchemas) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (schema.body) {
        req.body = await schema.body.parseAsync(req.body);
      }
      if (schema.params) {
        req.params = (await schema.params.parseAsync(req.params)) as any;
      }
      if (schema.query) {
        req.query = (await schema.query.parseAsync(req.query)) as any;
      }
      next();
    } catch (err: any) {
      console.log(err)
      return res.status(400).json({
        errors: err,
      });
    }
  };
};

export default validate;
