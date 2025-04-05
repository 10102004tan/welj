import { Injectable, NestMiddleware } from "@nestjs/common";
import { ModuleRef } from "@nestjs/core";
import { ApiKeyService } from "src/module/apiKey/apiKey.service";

const JWT = require("jsonwebtoken")

const generateToken = async ({
    payload,
    privateKey,
    publicKey
}:any) => {
    const accessToken = await JWT.sign(payload, publicKey, {
        expiresIn: '2 days'
    });

    const refreshToken = await JWT.sign(payload, privateKey, {
        expiresIn: '7 days'
    });

    return {
        accessToken,
        refreshToken
    };
}

@Injectable()
class Authentication implements NestMiddleware {
    private apiKeyService: ApiKeyService;
    constructor(private readonly moduleRef: ModuleRef) {}
    async use(req: any, res: any, next: () => void) {

        if (!this.apiKeyService){
            this.apiKeyService = this.moduleRef.get(ApiKeyService, { strict: false });
        }
        const authorization = req.headers.authorization || req.cookies.Authorization;
        const clientId = req.headers['x-client-id'] || req.cookies['x-client-id'];
        if (!authorization || !clientId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }


        const apiKey = await this.apiKeyService.findByUserId(clientId);
        if (!apiKey) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        await JWT.verify(authorization, apiKey.publicKey, (err: any, decoded: any) => {
            if (err) {
                return res.status(401).json({ message: 'Unauthorized' });
            }
            if (clientId !== decoded.userId) {
                return res.status(401).json({ message: 'Unauthorized' });
            }
            req.user = decoded;
        })

        next();
      }
}

export {
    generateToken,
    Authentication
}