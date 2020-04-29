const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WorkerPlugin = require("worker-plugin");
const path = require("path");
const sveltePreprocess = require("svelte-preprocess");
const mode = process.env.NODE_ENV || "development";
const prod = mode === "production";

module.exports = {
	mode,
	devtool: prod ? false : "source-map",
	entry: {
		bundle: ["./src/main.js"]
	},
	resolve: {
		alias: {
			svelte: path.resolve("node_modules", "svelte")
		},
		extensions: [".mjs", ".js", ".svelte"],
		mainFields: ["svelte", "browser", "module", "main"]
	},
	output: {
		path: __dirname + "/public",
		filename: "[name].js",
		chunkFilename: "[name].[id].js"
	},
	module: { rules: [] },
	plugins: [
		new MiniCssExtractPlugin({ filename: "[name].css" }),
		new WorkerPlugin()
	],
};

const svelteRule = {
	test: /\.svelte$/,
	exclude: /node_modules/,
	use: {
		loader: "svelte-loader",
		options: {
			emitCss: true,
			hotReload: true,
			preprocess: sveltePreprocess()
		}
	}
};

const babelRule = {
	test: /\.js$/,
	exclude: /node_modules/,
	loader: "babel-loader"
};

const cssRule = {
	test: /\.s?css$/i,
	use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
};

if (prod) module.exports.module.rules = [svelteRule, babelRule, cssRule];
else module.exports.module.rules = [svelteRule, cssRule];