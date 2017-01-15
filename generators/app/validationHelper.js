const helper = {};

helper.validateContextmenuName = function (str) {
  return str.length > 'context.'.length;
};

helper.validateModuleName = function (str) {
  return str.length > 'script.module.'.length;
};

helper.validatePluginName = function (str) {
  return str.length > 'plugin.'.length;
};

helper.validateResourceName = function (str) {
  return str.length > 'resource.'.length;
};

helper.validateServiceName = function (str) {
  return str.length > 'service.'.length;
};

helper.validateScriptName = function (str) {
  return str.length > 'script.'.length;
};

helper.validateScriptNameLength = function (str) {
  return str.length > 2;
};

module.exports = helper;
