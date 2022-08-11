const { name } = require('./package');
module.exports = {
    //publicPath: "//localhost:3001",
    publicPath: "/app1/",
    devServer: {
        //port: 3001,
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
    },
    configureWebpack: {
        output: {
            library: `${name}-[name]`,
            libraryTarget: 'umd', // 把微应用打包成 umd 库格式
            jsonpFunction: `webpackJsonp_${name}`,
        },
    },
};