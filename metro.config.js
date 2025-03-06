const { getDefaultConfig } = require("expo/metro-config");
const path = require("path");

module.exports = (async () => {
	const config = await getDefaultConfig(__dirname);
	config.resolver.alias = {
		"@": path.resolve(__dirname, ".")
	};
	return config;
})();
