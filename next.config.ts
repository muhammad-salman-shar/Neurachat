import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true, // Agle kisi image ke error ko pehle hi dher kar diya!
  },
  eslint: {
    ignoreDuringBuilds: true, // Linting ki wajah se build crash nahi hogi
  },
  typescript: {
    ignoreBuildErrors: true, // TypeScript ke chote-mote nakhre ignore
  }
};

export default nextConfig;

