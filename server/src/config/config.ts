import dotenv from 'dotenv'

dotenv.config()

export const CONFIG = {
    PORT: process.env.PORT || 8080,
    MONGO_URL: process.env.MONGO_URL || 'MONGO-URL',
    SECRET: process.env.SECRET || 'mysecret'
}