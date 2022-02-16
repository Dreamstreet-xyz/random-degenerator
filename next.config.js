module.exports = {
    reactStrictMode: true,
    basepath: '',
    eslint: {
        ignoreDuringBuilds: true,
    },
    typescript: {
        // TODO: REMOVE THIS BEFORE PROD
        // !! WARN !!
        // Dangerously allow production builds to successfully complete even if
        // your project has type errors.
        // !! WARN !!
        ignoreBuildErrors: true,
    },
};
