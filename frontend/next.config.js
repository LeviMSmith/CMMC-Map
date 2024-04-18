/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  async redirects() {
    return [
      {
        source: "/",
        destination: "/sections",
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
