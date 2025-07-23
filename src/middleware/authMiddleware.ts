import { NextFunction, Request, Response } from "express";
import admin from "firebase-admin";
import { DecodedIdToken } from "firebase-admin/lib/auth/token-verifier";

declare global {
  namespace Express {
    interface Request {
      user?: DecodedIdToken;
    }
  }
}

const isUserAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid token" });
  }
};

export default isUserAuthenticated;
