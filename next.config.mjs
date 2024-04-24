/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    APP_API_URL: process.env.APP_API_URL,
  },
};;

export default nextConfig;
