/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: { ignoreBuildErrors: true },
    reactStrictMode: true,
    swcMinify: true,
    i18n: {
        locales: ["en", "ar"],
        defaultLocale: "ar",
        localeDetection: false,
    },
    images: { domains: ["localhost"] },
    async redirects() {
        return [
            {
                source: "/admin",
                destination: process.env.BACKEND_DOMAIN,
                permanent: true,
            },
        ];
    },
};

module.exports = nextConfig;
