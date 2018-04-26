'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AssumeRole = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _base = require('./_base');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var URL_API = 'https://sts.aliyuncs.com/';
/**
 * 获取STS临时凭据
  accessKeyId: 'LTAIgqA3WBiLMu8Q',
  accessKeySecret: 'uHPQpYGXHYcqOCcfsQfVRfoz9mD3jP',
  arn: 'acs:ram::1459759790853733:role/vod-upload'
 * @param {object} param0 
 */
var AssumeRole = exports.AssumeRole = function AssumeRole(_ref) {
  var AccessKeyId = _ref.AccessKeyId,
      AccessKeySecret = _ref.AccessKeySecret,
      RoleArn = _ref.RoleArn,
      RoleSessionName = _ref.RoleSessionName;

  var args = (0, _base._genCommonArgs)({
    Action: 'AssumeRole',
    Version: '2015-04-01',
    AccessKeyId: AccessKeyId
  });
  var strQuery = (0, _base._sign)((0, _extends3.default)({}, args, {
    RoleArn: RoleArn,
    RoleSessionName: RoleSessionName
  }), { AccessKeySecret: AccessKeySecret });

  return (0, _base._get)(URL_API + '?' + strQuery);
};