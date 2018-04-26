'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._sign = exports._genCommonArgs = exports._post = exports._get = exports._request = undefined;

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

require('isomorphic-fetch');

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

var _uuid = require('uuid');

var _uuid2 = _interopRequireDefault(_uuid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _request = exports._request = function _request(url) {
  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  //debug ("_request", url, opts);
  return fetch(url, (0, _extends3.default)({}, opts, { credentials: 'include' })).then(function (data) {
    return data.json();
  }).then(function (retobj) {
    if (!retobj) {
      throw new Error('error! get null from ' + url);
    }
    debug('request:', url, ', result:', retobj);
    return retobj;
  });
};

var _get = exports._get = function _get(url) {
  var opts = {
    //dataType: 'json',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
  };
  return _request(url, opts);
};

var _post = exports._post = function _post(url, data) {
  var opts = {
    //dataType: 'json',
    method: 'POST',
    body: (0, _stringify2.default)(data),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
  };
  return _request(url, opts);
};

/**
 * 阿里云api通用参数，放置于URL中。见：https://help.aliyun.com/document_detail/44432.html?spm=a2c4g.11186623.2.7.xWsXiE
    名称      	类型	是否必选	描述
    Format	   String  	否	返回值的类型，支持JSON与XML，默认为XML。
    Version	   String  	是	API版本号，为日期形式：YYYY-MM-DD，本版本对应为2017-03-21。
    AccessKeyId	String	是	阿里云颁发给用户的访问服务所用的密钥ID。请参见账号权限概述。
    Signature	 String	  是	签名结果串，关于签名的计算方法，参见 API签名机制，代码示例参见 Signature。
    SignatureMethod	String	是	签名方式，目前支持HMAC-SHA1。
    Timestamp	 String	  是	请求的时间戳。
        日期格式按照ISO8601标准表示，并需要使用UTC时间。格式为：YYYY-MM-DDThh:mm:ssZ
        例如，2017-3-29T12:00:00Z 为北京时间2017年3月29日的20点0分0秒。代码示例参见 TimeStamp。
    SignatureVersion	String	是	签名算法版本，目前版本是1.0。
    SignatureNonce	String	是	唯一随机数，用于防止网络重放攻击。用户在不同请求间要使用不同的随机数值。代码示例参见 SignatureNonce。
    SecurityToken	String	否	STS临时授权的Token，默认为空。概念参见 账号权限 的 STS临时AK，生成方式参见 STS临时授权访问。
 * 用来生成URL：
    http://vod.cn-shanghai.aliyuncs.com/
    ?Format=json 
    &Version=2017-03-21
    &Signature=vpEEL0zFHfxXYzSFV0n7%2FZiFL9o%3D 
    &SignatureMethod=Hmac-SHA1
    &SignatureNonce=9166ab59-f445-4005-911d-664c1570df0f
    &SignatureVersion=1.0
    &Action=GetVideoPlayAuth
    &AccessKeyId=tkHh5O7431CgWayx  
    &Timestamp=2017-03-29T09%3A22%3A32Z
 * @param {object} args 
 */
var _genCommonArgs = exports._genCommonArgs = function _genCommonArgs(_ref) {
  var Action = _ref.Action,
      AccessKeyId = _ref.AccessKeyId,
      Version = _ref.Version;

  if (!Action || !AccessKeyId || !Version) {
    throw new Error('missing parameters:Action=' + Action + ', AccessKeyId=' + AccessKeyId + ', Version=' + Version);
  }
  //let Timestamp = moment().format('YYYY-MM-DD HH:mm:ss');
  var Timestamp = (0, _moment2.default)().utc().format('YYYY-MM-DD HH:mm:ss');
  var SignatureNonce = _uuid2.default.v4();
  return {
    Format: 'JSON',
    Version: Version,
    Action: Action,
    AccessKeyId: AccessKeyId,
    SignatureMethod: 'HMAC-SHA1',
    Timestamp: Timestamp,
    SignatureVersion: '1.0',
    SignatureNonce: SignatureNonce
  };
};

var _sign = exports._sign = function _sign(args, _ref2) {
  var AccessKeySecret = _ref2.AccessKeySecret;

  if (!args || !AccessKeySecret) {
    throw new Error('missing parameters:args=' + (0, _stringify2.default)(args) + ', AccessKeySecret=' + AccessKeySecret);
  }
  var nArgs = (0, _extends3.default)({}, args);
  var arr = (0, _keys2.default)(nArgs).sort();
  // update nArgs if exist object.
  arr.map(function (key) {
    if ((0, _typeof3.default)(nArgs[key]) === 'object') {
      nArgs[key] = (0, _stringify2.default)(nArgs[key]);
    }
  });
  var strToSign = arr.map(function (key) {
    //return encodeURIComponent(key +"="+ nArgs[key]);
    return encodeURIComponent(key) + '=' + encodeURIComponent(nArgs[key]);
  }).join('&');
  strToSign = 'GET&%2F&' + encodeURIComponent(strToSign);

  var signature = _crypto2.default.createHmac('sha1', AccessKeySecret + '&').update(strToSign).digest().toString('base64'); //base64
  nArgs.Signature = signature;
  arr = (0, _keys2.default)(nArgs).sort();
  var strQuery = arr.map(function (key) {
    return key + '=' + encodeURIComponent(nArgs[key]);
  }).join('&');
  debug('nArgs=', nArgs, ', query=' + strQuery, ', strToSign=', strToSign, ', AccessKeySecret=', AccessKeySecret);
  return strQuery;
};