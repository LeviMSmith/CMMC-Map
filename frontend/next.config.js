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
  images: {},
};

if (process.env.NEXT_PUBLIC_BACKEND_URL) {
  const backendUrl = new URL(process.env.NEXT_PUBLIC_BACKEND_URL);

  const backendImageRemote = {
    protocol: backendUrl.protocol.slice(0, -1), // Removes the colon
    hostname: backendUrl.hostname,
    port: backendUrl.port,
    pathname: "/media/**",
  };

  // Add remotePatterns to images config
  nextConfig.images.remotePatterns = [backendImageRemote];
} else {
  console.warn(
    "NEXT_PUBLIC_BACKEND_URL is not defined. Some functionalities might not work as expected.",
  );
}

module.exports = nextConfig;
