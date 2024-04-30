/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    APP_API_URL: process.env.APP_API_URL,
    APP_API_KEY: process.env.APP_API_KEY,
  },
  images: {
    domains: [] ,
  }
};;

export default nextConfig;
