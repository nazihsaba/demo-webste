import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Photos come from your Supabase Storage bucket. Google's own photo
    // servers are allowed too, as a fallback for rows saved before storage.
    remotePatterns: [
      { protocol: "https", hostname: "*.supabase.co", pathname: "/storage/v1/object/public/**" },
      { protocol: "https", hostname: "*.googleusercontent.com" },
    ],
  },
};

export default nextConfig;
