const path = require('path');
const nodeExternals = require('webpack-node-externals');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const mode = process.env.NODE_ENV || 'development';
const dist = path.join(__dirname, 'dist');

module.exports = {
    mode,
    target: 'node',
    externals: [nodeExternals()],
    devtool: "source-map",
    entry: "./src/index.ts",
    plugins: [
        new CleanWebpackPlugin(dist, {}),
    ],
    output: {
        path: dist,
        filename: "server.js"
    },
    resolve: {
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: [".ts", ".js"],
        alias: {
            helpers: path.resolve(__dirname, 'src/helpers/'),
            api: path.resolve(__dirname, 'src/api/'),
            src: path.resolve(__dirname, 'src/')
        }
    },
    module: {
        rules: [
            // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
            {test: /\.ts$/, loader: "ts-loader"}
        ]
    }
};