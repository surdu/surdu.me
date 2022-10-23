const fs = require("fs");
const { join } = require("path");

module.exports = {
	siteUrl: "https://surdu.me",
	generateIndexSitemap: false,
	outDir: "out",
	transform: async (config, path) => {
		const metaPath = join(process.cwd(), ".next", "posts-meta.json");
		const postsMeta = JSON.parse(fs.readFileSync(metaPath));

		if (postsMeta[path]) {
			if (postsMeta[path].isDraft) {
				return null;
			}
		}

		return {
			loc: path,
			changefreq: config.changefreq,
			priority: config.priority,
			lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
			alternateRefs: config.alternateRefs ?? [],
		};
	},
};
