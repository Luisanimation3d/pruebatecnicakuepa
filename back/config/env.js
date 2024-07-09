import dotenv from 'dotenv';

dotenv.config();

export default {
    PORT: process.env.PORT || 3000,
    HOST: process.env.HOST || 'localhost',
    DB: {
        URI: process.env.DB_URI,
    },
    JWT: {
        SECRET: process.env.JWT_SECRET || 'secret',
        EXPIRES_IN: process.env.JWT_EXPIRES_IN || '1d'
    }
}