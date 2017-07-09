'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _debug2 = require('debug');

var _debug3 = _interopRequireDefault(_debug2);

var _base = require('./base');

var _base2 = _interopRequireDefault(_base);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

var _hmacSha = require('crypto-js/hmac-sha1');

var _hmacSha2 = _interopRequireDefault(_hmacSha);

var _encBase = require('crypto-js/enc-base64');

var _encBase2 = _interopRequireDefault(_encBase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var debug = (0, _debug3.default)('app:server:sendsms');

var uuidv4 = require('uuid/v4');

/*
参考地址： https://help.aliyun.com/document_detail/56189.html?spm=5176.doc55288.6.562.VcuXTY

请求:
    GET /?Format=XML&SignName=%E9%98%BF%E9%87%8C%E4%BA%91%E7%9F%AD%E4%BF%A1%E6%B5%8B%E8%AF%95%E4%B8%93%E7%94%A8&SignatureMethod=HMAC-SHA1&TemplateCode=SMS_71390007&Signature=%2BexbambPmgIG1MAYwP%2B7GPwz4RM%3D&Timestamp=2017-06-26T10%3A20%3A09Z&TemplateParam=%7B%22customer%22%3A%22junmu%22%7D&OutId=yourOutId&AccessKeyId=LTAIbGaUjbqB7CdA&Action=SendSms&RegionId=cn-hangzhou&SignatureNonce=81fc25c0-5cf9-4c2c-8fc8-994d8ed772b0&PhoneNumbers=13291835394&Version=2017-05-25&SignatureVersion=1.0 HTTP/1.1
    x-sdk-client: Java/2.0.0
    Accept: application/xml
    Cache-Control: no-cache
    Pragma: no-cache
    User-Agent: Java/1.7.0_80
    Host: dysmsapi.aliyuncs.com
    Connection: keep-alive


响应:
    HTTP/1.1 200 OK
    Date: Mon, 26 Jun 2017 10:20:10 GMT
    Content-Type: text/xml;charset=UTF-8
    Content-Length: 209
    Connection: close
    Access-Control-Allow-Origin: *
    Access-Control-Allow-Methods: POST, GET, OPTIONS
    Access-Control-Allow-Headers: X-Requested-With, X-Sequence, _aop_secret, _aop_signature
    Access-Control-Max-Age: 172800
    Server: Jetty(7.2.2.v20101205)
    <?xml version='1.0' encoding='UTF-8'?><SendSmsResponse><Message>OK</Message><RequestId>E8534574-7381-4810-8F70-65B37BBA8970</RequestId><BizId>108374502347^1111325525761</BizId><Code>OK</Code></SendSmsResponse>

参数:
Format=XML&
SignName=%E9%98%BF%E9%87%8C%E4%BA%91%E7%9F%AD%E4%BF%A1%E6%B5%8B%E8%AF%95%E4%B8%93%E7%94%A8&
SignatureMethod=HMAC-SHA1&
TemplateCode=SMS_71390007&
Signature=%2BexbambPmgIG1MAYwP%2B7GPwz4RM%3D&
Timestamp=2017-06-26T10%3A20%3A09Z&
TemplateParam=%7B%22customer%22%3A%22junmu%22%7D&
OutId=yourOutId&
AccessKeyId=LTAIbGaUjbqB7CdA&
Action=SendSms&
RegionId=cn-hangzhou&
SignatureNonce=81fc25c0-5cf9-4c2c-8fc8-994d8ed772b0&
PhoneNumbers=13291835394&
Version=2017-05-25&
SignatureVersion=1.0
 */
var Dayu = function (_Base) {
    (0, _inherits3.default)(Dayu, _Base);

    function Dayu(accessKeyId, accessKeySecret) {
        (0, _classCallCheck3.default)(this, Dayu);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Dayu.__proto__ || (0, _getPrototypeOf2.default)(Dayu)).call(this));

        _this.accessKeyId = accessKeyId;
        _this.accessKeySecret = accessKeySecret;
        return _this;
    }

    (0, _createClass3.default)(Dayu, [{
        key: 'sendSMS',
        value: function sendSMS(args) {
            /* 
               入参：
               PhoneNumbers 	String 	必须 	15000000000 	短信接收号码。支持以逗号分隔的形式进行批量调用，批量上限为20个手机号码,批量调用相对于单条调用及时性稍有延迟,验证码类型的短信推荐使用单条调用的方式
               SignName 	String 	必须 	云通信 	短信签名
               TemplateCode 	String 	必须 	SMS_0000 	短信模板ID
               TemplateParam 	String 	可选 	{“code”:”1234”,”product”:”ytx”} 	短信模板变量替换JSON串
               OutId 	String 	可选 	abcdefgh 	外部流水扩展字段
                出参：
               RequestId 	String 	8906582E-6722 	请求ID
               Code 	String 	OK 	状态码-返回OK代表请求成功,其他错误码详见错误码列表
               Message 	String 	请求成功 	状态码的描述
               BizId 	String 	134523^4351232 	发送回执ID,可根据该ID查询具体的发送状态
             */
            var timestamp = (0, _moment2.default)().utc().format("YYYY-MM-DD HH:mm:ss");
            var nArgs = {
                Format: 'JSON',
                SignName: args.SignName,
                SignatureMethod: 'HMAC-SHA1',
                TemplateCode: args.TemplateCode,
                Timestamp: timestamp,
                TemplateParam: args.TemplateParam,
                OutId: args.OutId,
                AccessKeyId: this.accessKeyId,
                Action: 'SendSms',
                RegionId: 'cn-hangzhou',
                SignatureNonce: uuidv4(),
                PhoneNumbers: args.PhoneNumbers,
                Version: '2017-05-25',
                SignatureVersion: '1.0'
            };
            var arr = (0, _keys2.default)(nArgs).sort();
            // update nArgs if exist object.
            arr.map(function (key) {
                if ((0, _typeof3.default)(nArgs[key]) === 'object') {
                    nArgs[key] = (0, _stringify2.default)(nArgs[key]);
                }
            });

            var strToSign = arr.map(function (key) {
                //return encodeURIComponent(key +"="+ nArgs[key]);
                return encodeURIComponent(key) + "=" + encodeURIComponent(nArgs[key]);
            }).join('&');
            strToSign = "GET&%2F&" + encodeURIComponent(strToSign);

            var accessKeySecret = this.accessKeySecret + "&";
            var hmacDigest = _encBase2.default.stringify((0, _hmacSha2.default)(strToSign, accessKeySecret));
            var signature = _crypto2.default.createHmac('sha1', accessKeySecret).update(strToSign).digest().toString('base64'); //base64
            debug("crypto-js:", hmacDigest, ", crypto:", signature, ", accessKeySecret:", accessKeySecret);
            nArgs.Signature = signature;
            arr = (0, _keys2.default)(nArgs).sort();
            var strQuery = arr.map(function (key) {
                //return key +"="+ nArgs[key];
                return key + "=" + encodeURIComponent(nArgs[key]);
            }).join('&');
            debug("args=", nArgs, ", strQuery=" + strQuery + ", strToSign=" + strToSign);

            //this._restUrl = 'http://gw.api.taobao.com/router/rest';

            //return this.get ("http://ecs.aliyuncs.com/?"+strQuery)
            return this.get("http://dysmsapi.aliyuncs.com/?" + strQuery).then(function (retobj) {
                debug("sendSMS result:", retobj);
                return retobj;
            });
        }
    }, {
        key: 'sendSMSCode',
        value: function sendSMSCode(phone, number, outId) {
            return this.sendSMS({
                SignName: '帝利文化',
                PhoneNumbers: phone,
                TemplateCode: "SMS_76425078",
                TemplateParam: { number: number },
                OutId: outId
            });
        }
    }]);
    return Dayu;
}(_base2.default);

exports.default = Dayu;