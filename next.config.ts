import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Cloud Run runs the app as a container; standalone emits a self-contained
  // server bundle so the image does not need node_modules copied in.
  output: "standalone",

  // A stray package-lock.json in a parent folder otherwise makes Turbopack
  // infer the wrong project root.
  turbopack: { root: path.resolve(".") },

  images: {
    // Photographs and PDFs the manager uploads live in the project's GCS
    // bucket and are served from these hosts.
    remotePatterns: [
      { protocol: "https", hostname: "storage.googleapis.com" },
      { protocol: "https", hostname: "*.storage.googleapis.com" },
      { protocol: "https", hostname: "*.firebasestorage.app" },
    ],
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
