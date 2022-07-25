//const { name } = require('./package');

module.exports = {
    webpack: (config) => {
        config.output.library = `reactApp`;
        config.output.libraryTarget = 'umd';
        // config.output.jsonpFunction = `webpackJsonp_${name}`;
        // config.output.globalObject = 'window';
        config.output.publicPath = "//localhost:3002/"

        return config;
    },

    devServer: (_) => {
        const config = _;
        // config.port = 3002;
        config.headers = {
            'Access-Control-Allow-Origin': '*',
        };
        // config.historyApiFallback = true;
        // config.hot = false;
        // config.watchContentBase = false;
        // config.liveReload = false;

        return config;
    },
}