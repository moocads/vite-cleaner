import type { NextConfig } from "next";

const googleMapsApiKey =
  process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ||
  process.env.google_map_api_key ||
  process.env.GOOGLE_MAPS_API_KEY ||
  "";

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: googleMapsApiKey,
  },
  images: {
    qualities: [75, 90, 100],
  },
};

export default nextConfig;
