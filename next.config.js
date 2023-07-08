/** @type {import('next').NextConfig} */

const env = process.env;

const nextConfig = {
  reactStrictMode: true,
  env: {
    API_COUNTRIES: env.API_COUNTRIES,
    VS_PROJECT_ID: env.VS_PROJECT_ID,
  },
};

module.exports = nextConfig;
