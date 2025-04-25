import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ['@prisma/client', '@prisma/engines'],
  env: {
    DATABASE_URL: dotenv.config({ 
      path: path.join(__dirname, '../../packages/db/.env') 
    }).parsed?.DATABASE_URL
  }
};

export default nextConfig;
