const loaderUtils = require('loader-utils');
const path = require('path');
const fs = require('fs-extra');

/**
 * @name getCSSModuleLocalIdent
 * @description 处理 css module 名称
 * @param {*} context
 * @param {string} localIdentName
 * @param {string} localName
 * @param {object} options
 */
function getCSSModuleLocalIdent(context, localIdentName, localName, options) {
  // Use the filename or folder name, based on some uses the index.js / index.module.(css|scss|sass|less) project style
  const fileNameOrFolder = context.resourcePath.match(/index\.module\.(css|scss|sass|less)$/) ? '[folder]' : '[name]';
  // Create a hash based on a the file location and class name. Will be unique across a project, and close to globally unique.
  const hash = loaderUtils.getHashDigest(
    path.posix.relative(context.rootContext, context.resourcePath) + localName,
    'md5',
    'base64',
    5
  );
  // Use loaderUtils to find the file or folder name
  const className = loaderUtils.interpolateName(context, fileNameOrFolder + '_' + localName + '__' + hash, options);
  // Remove the .module that appears in every classname when based on the file and replace all "." with "_".
  return className.replace('.module_', '_').replace(/\./g, '_');
}

/**
 * @param VersionFile
 * @description 创建版本号文件
 * @param {String} version
 */
function VersionFile(version) {
  this.version = version;
}
VersionFile.prototype.apply = function (compiler) {
  /// 生产环境 生成打包文件
  if (process.env.NODE_ENV === 'production') {
    outputVersionFile(this.version);
  }
  /**
   * @name outputVersionFile
   * @description 输出版本号文件到打包目录
   * @param {string} version
   */
  async function outputVersionFile(version) {
    // 确认版本号文件是否存在，不存在则创建
    const file = path.resolve(__dirname, './build/app_version.txt');
    await fs.ensureFileSync(file);
    // 写入版本号
    await fs.outputFileSync(file, `${version}`);
  }
};

module.exports = { getCSSModuleLocalIdent, VersionFile };
