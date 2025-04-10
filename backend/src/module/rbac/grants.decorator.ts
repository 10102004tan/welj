import { SetMetadata } from '@nestjs/common';

export const GRANT_KEY = 'grants';
export const Grant = (action:string,resource:string) => SetMetadata(GRANT_KEY, { action, resource });