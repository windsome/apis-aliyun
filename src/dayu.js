import {_get, _genCommonArgs, _sign} from './_base';
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
/**
 * 发送短信验证码
 * @param {object} param0
 */
export const SendSms = ({
    AccessKeyId,
    AccessKeySecret,
    PhoneNumbers,
    code,
    OutId
  }) => {
    let args = _genCommonArgs({
      Action: 'SendSms',
      Version: '2017-05-25',
      AccessKeyId
    });
    //let {Version,SignatureVersion, SignatureNonce, ...restArgs} = args;
    let strQuery = _sign(
      {
        ...args,
        PhoneNumbers,
        SignName: '帝利文化',
        TemplateCode: 'SMS_76425078',
        TemplateParam: { number: code },
        OutId,
        RegionId: 'cn-hangzhou'
      },
      { AccessKeySecret }
    );
    //this._restUrl = 'http://gw.api.taobao.com/router/rest';
    return _get('http://dysmsapi.aliyuncs.com/?' + strQuery);
  };
  
