/** @type {import('next').NextConfig} */
const backendUrl = new URL(process.env.NEXT_PUBLIC_BACKEND_URL);

backendImageRemote = {
  protocol: backendUrl.protocol.slice(0, -1), // Removes the colon
  hostname: backendUrl.hostname,
  port: backendUrl.port,
  pathname: "/media/**",
};

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
    remotePatterns: [backendImageRemote],
  },
};
