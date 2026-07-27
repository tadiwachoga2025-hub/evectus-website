import type { NextConfig } from "next";

// All site imagery is now self-hosted under public/ (no remote hosts) and no
// component overrides next/image's default quality, so no images config is
// needed. Re-add `images.remotePatterns` here if a remote host returns.
const nextConfig: NextConfig = {};

export default nextConfig;
