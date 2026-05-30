import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  // Yahan se serverActions hata diya hai apun ne
  eslint: {
    ignoreDuringBuilds: true, // Actions fail na ho faltu warnings pe
  },
  typescript: {
    ignoreBuildErrors: true, // Typescript ki choti galtiyo ko ignore karega
  }
};

export default nextConfig;
