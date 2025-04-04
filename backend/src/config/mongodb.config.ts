import { registerAs } from '@nestjs/config';

export default registerAs('database', () => {
    const dev = {
        port: process.env.DB_PORT_DEV || 27017 as number,
        host: process.env.DB_HOST_DEV || 'localhost' as string,
        name: process.env.DB_NAME_DEV || 'nestjs-blog' as string,
    }

    const prod = {
        port: process.env.DB_PORT_PROD || 27017 as number,
        host: process.env.DB_HOST_PROD || 'localhost' as string,
        name: process.env.DB_NAME_PROD || 'nestjs-blog' as string,
    }

    const config = {
        dev,
        prod
    };
    const nodeEnv = (process.env.NODE_ENV || 'dev') as keyof typeof config;
    return config[nodeEnv];
});