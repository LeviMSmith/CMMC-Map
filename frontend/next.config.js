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
};
