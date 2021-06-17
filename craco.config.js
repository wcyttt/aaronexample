const CracoLessPlugin = require("craco-less");
const { getCSSModuleLocalIdent } = require("./.craco.plugins.js");

/// less 变量覆盖 --- 修改默认主题色、字体等
const lessLoaderOptions = {
  lessOptions: {
    modifyVars: {
      "@primary-color": "#303F9F",
      "@font-family":
        '-apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    },
    javascriptEnabled: true,
  },
};

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: { lessLoaderOptions },
    },
    {
      plugin: CracoLessPlugin,
      lessLoaderOptions: {
        lessOptions: { javascriptEnabled: true },
      },
      options: {
        lessLoaderOptions,
        cssLoaderOptions: {
          modules: {
            localIdentName: "[name]_[local]_[hash:base64:5]",
            getLocalIdent: getCSSModuleLocalIdent,
          },
        },
        modifyLessRule(lessRule, context) {
          lessRule.test = /(\.module\.less|\.less)$/;
          lessRule.exclude = /node_modules/;
          return lessRule;
        },
      },
    },
  ],
  // babel: {
  //   plugins: [["@babel/plugin-proposal-decorators", { legacy: true }]],
  // },
};
