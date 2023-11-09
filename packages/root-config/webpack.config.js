const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-ts");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const Dotenv = require("dotenv-webpack");

module.exports = (webpackConfigEnv, argv) => {
  const orgName = "demo";
  const defaultConfig = singleSpaDefaults({
    orgName,
    projectName: "root-config",
    webpackConfigEnv,
    argv,
    disableHtmlGeneration: true,
  });

  const customWebpackConfig = {
    // modify the webpack config however you'd like to by adding to this object
    plugins: [
      new HtmlWebpackPlugin({
        inject: false,
        template: "src/index.ejs",
        templateParameters: {
          isLocal: webpackConfigEnv && webpackConfigEnv.isLocal,
          orgName,
          process
        },
      }),
    ],
    devServer: {
      port: process.env.ROOT_CONFIG_DEV_PORT,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
        "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization",
      },
    },
  }



  // we need to use dotenv only in development mode
  // for production mode, env variables will be from pipeline
  if (process.env.isLocal === "true") {
    customWebpackConfig.plugins.push(
      new Dotenv({
        path: "../../.env",
        expand: true,
      }),
    );
  }

  return merge(defaultConfig, customWebpackConfig);
};
