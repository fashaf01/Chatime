import type { NextConfig } from "next";

// STATIC_EXPORT=1 emits a plain static bundle to out/, used to produce the
// single-file preview build. Custom headers are a server feature and are not
// available under export, so they are omitted in that mode only.
const isExport = process.env.STATIC_EXPORT === "1";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  // Relative asset paths so the exported bundle works from any sub-path or
  // static host, not just a domain root.
  ...(isExport ? { output: "export" as const, assetPrefix: "./assets" } : {}),
  // Every visual on this site is inline SVG or CSS, so there is no image
  // optimisation pipeline to configure and no external host to allow-list.
  ...(isExport
    ? {}
    : {
        async headers() {
          return [
            {
              source: "/:path*",
              headers: [
                { key: "X-Content-Type-Options", value: "nosniff" },
                { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
                { key: "X-Frame-Options", value: "SAMEORIGIN" },
              ],
            },
          ];
        },
      }),
};

export default nextConfig;
