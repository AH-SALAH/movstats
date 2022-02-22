/* eslint-disable import/no-extraneous-dependencies */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
	enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
	eslint: {
		dirs: ['.'],
	},
	poweredByHeader: false,
	trailingSlash: false,
	// basePath: '',
	reactStrictMode: true,
	webpack(config) {
		config.module.rules.push({
			test: /\.svg$/i,
			issuer: /\.[jt]sx?$/,
			use: [{ loader: '@svgr/webpack', options: { typescript: true, icon: true } }],
		})

		return config;
	},
    images: {
        domains: ['api.lorem.space', 'image.tmdb.org', 'https://image.tmdb.org/t/p']
    }
});
