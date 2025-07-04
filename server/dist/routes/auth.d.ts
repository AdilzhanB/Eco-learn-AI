import { Request, Response } from 'express';
export declare const authRouter: import("express-serve-static-core").Router;
interface AuthRequest extends Request {
    user?: {
        id: number;
        email: string;
    };
}
export declare function authenticateToken(req: AuthRequest, res: Response, next: any): Response<any, Record<string, any>> | undefined;
export {};
//# sourceMappingURL=auth.d.ts.map