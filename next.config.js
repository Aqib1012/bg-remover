/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { dev }) => {
    config.resolve.extensionAlias = {
      ".js": [".js", ".ts", ".tsx"],
    };
    // The background-removal library ships .mjs model files that Next's
    // production minifier (Terser) can't parse. Skip minification so the
    // build doesn't crash on them.
    if (!dev) {
      config.optimization.minimize = false;
    }
    return config;
  },
  headers: async () => {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Cross-Origin-Embedder-Policy", value: "require-corp" },
          { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
