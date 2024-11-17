import * as dotenv from 'dotenv';
dotenv.config();
export const APP_NAME = process.env.APP_NAME || 'NestJS';
export const APP_VERSION = process.env.APP_VERSION || '1.0.0';
export const APP_PORT = process.env.APP_PORT || 3000;
export const APP_DEBUG = process.env.APP_DEBUG === 'true' || false;

export const DATABASE_URL = process.env.DATABASE_URL || '';
