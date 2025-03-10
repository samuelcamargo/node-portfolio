export interface ITokenProvider {
    generateToken(userId: string): Promise<string>;
    verifyToken(token: string): Promise<string>;
} 