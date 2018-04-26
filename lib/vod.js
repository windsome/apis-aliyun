'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GetVideoPlayAuth = exports.GetPlayInfo = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _base = require('./_base');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 获取视频信息
 * see also: https://help.aliyun.com/document_detail/56124.html?spm=a2c4g.11186623.6.635.ulIwpp
 * @param {object} param0
 */
var GetPlayInfo = exports.GetPlayInfo = function GetPlayInfo(_ref) {
  var AccessKeyId = _ref.AccessKeyId,
      AccessKeySecret = _ref.AccessKeySecret,
      VideoId = _ref.VideoId,
      Formats = _ref.Formats,
      AuthTimeout = _ref.AuthTimeout,
      StreamType = _ref.StreamType,
      Definition = _ref.Definition;

  var args = (0, _base._genCommonArgs)({
    Action: 'GetPlayInfo',
    Version: '2017-03-21',
    AccessKeyId: AccessKeyId
  });
  var strQuery = (0, _base._sign)((0, _extends3.default)({}, args, {
    VideoId: VideoId,
    Formats: Formats,
    AuthTimeout: AuthTimeout,
    StreamType: StreamType,
    Definition: Definition
  }), { AccessKeySecret: AccessKeySecret });
  return (0, _base._get)('http://vod.cn-shanghai.aliyuncs.com/?' + strQuery);
};

/**
 * 获取视频播放凭证
 * see also: https://help.aliyun.com/document_detail/52833.html?spm=a2c4g.11186623.6.636.VV9vfY
 * @param {object} param0
 */
var GetVideoPlayAuth = exports.GetVideoPlayAuth = function GetVideoPlayAuth(_ref2) {
  var AccessKeyId = _ref2.AccessKeyId,
      AccessKeySecret = _ref2.AccessKeySecret,
      VideoId = _ref2.VideoId,
      AuthInfoTimeout = _ref2.AuthInfoTimeout;

  var args = (0, _base._genCommonArgs)({
    Action: 'GetVideoPlayAuth',
    Version: '2017-03-21',
    AccessKeyId: AccessKeyId
  });
  var strQuery = (0, _base._sign)((0, _extends3.default)({}, args, {
    VideoId: VideoId,
    AuthInfoTimeout: AuthInfoTimeout
  }), { AccessKeySecret: AccessKeySecret });
  return (0, _base._get)('http://vod.cn-shanghai.aliyuncs.com/?' + strQuery);
};