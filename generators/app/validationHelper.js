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

helper.validateSubtitleName = function (str) {
  return str.length > 'service.subtitles.'.length;
};

helper.validateScriptNameLength = function (str) {
  return str.length > 2;
};

helper.validateProvides = function (provides) {
  if (provides.length < 1) {
    return 'You need check at least one.';
  }
  return true;
};

helper.validatePlatforms = function (platforms) {
  if (platforms.indexOf('all') != -1 && platforms.length > 1) {
    return '"All" must be the only platform selected.';
  } else if (platforms.length < 1) {
    return 'You need check at least one.';
  }
  return true;
};

module.exports = helper;
