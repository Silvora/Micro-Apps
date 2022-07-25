const { name } = require('./package');
const path = require('path')
function resolve(dir) {
    return path.join(__dirname, dir)
}
module.exports = {
    //publicPath: "//localhost:3003",
    devServer: {
        port: 3003,
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
    chainWebpack: config => {
        config.resolve.alias
            .set("@", resolve("src"))
        // .set("@assets", resolve("src/assets"))
        // .set("@components", resolve("src/components"))
        //   .set("@base", resolve("baseConfig"))
        //   .set("@public", resolve("public"));
    },
};