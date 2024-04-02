/** @type {import('next').NextConfig} */
module.exports = {
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
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        pathname: "/media/**",
      },
    ],
  },
};
