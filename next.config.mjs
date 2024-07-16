/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "ui-avatars.com",
			},
		],
	},
	output: "standalone",
};

export default nextConfig;
