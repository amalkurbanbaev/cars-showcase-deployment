/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['cdn.imagin.studio'],
    },
    experimental: {
        appDir: true,
    },
};

module.exports = nextConfig;
