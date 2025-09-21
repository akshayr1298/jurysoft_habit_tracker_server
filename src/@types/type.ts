import { Request } from "express";

interface AuthenticatedUser {
  userId: string;
  email: string;
}

export interface AuthenticatedRequest extends Request {
  user: AuthenticatedUser;
}

export interface ParamsRequest extends Request {
  id: string | number;
}

