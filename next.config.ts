import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // A stray package-lock.json in a parent folder otherwise makes Turbopack
  // infer the wrong project root.
  turbopack: { root: path.resolve(".") },
};

export default nextConfig;
