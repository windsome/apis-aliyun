apis-aliyun [![NPM version](https://badge.fury.io/js/apis-aliyun.png)](http://badge.fury.io/js/apis-aliyun) [![Build Status](https://travis-ci.org/windsome/apis-aliyun.png?branch=master)](https://travis-ci.org/windsome/apis-aliyun) [![Dependencies Status](https://david-dm.org/windsome/apis-aliyun.png)](https://david-dm.org/windsome/apis-aliyun) [![Coverage Status](https://coveralls.io/repos/windsome/apis-aliyun/badge.png)](https://coveralls.io/r/windsome/apis-aliyun)
======

调用阿里大于发送短信  
阿里大于管理端：<https://dysms.console.aliyun.com/dysms.htm?spm=5176.2020520153.aliyun_topbar.129.20034945K9sQJK#/overview>  
阿里大于短信服务文档：<https://help.aliyun.com/product/44282.html?spm=5176.sms-account.102.8.fa111cbep1BX5w>  

## 功能列表
+ 发送短信验证码接口
+ 其他接口

## Installation
```sh
$ npm install apis-aliyun --save
```

## Usage
```js
import { dayu } from 'apis-aliyun';
// 或 import * as dayu from 'apis-aliyun/lib/dayu'

let AccessKeyId = '<your_accessKeyId>'; // 替换成您自己的AccessKeyId
let AccessKeySecret = '<your_accessKeySecret>'; // 替换成您自己的AccessKeySecret

// 方法1：promise 方式调用。
const testSendSms = () => {
    let result = dayu.SendSms({
      AccessKeyId,
      AccessKeySecret,
      PhoneNumbers: '13661989491',
      code: '177820',
      OutId: '<111111>'
    }).then(result => {
        console.log ('testSendSms:', result);
    });
};
// 方法2：await/async 方式调用
const testSendSmsAsync = async () => {
    let result = await dayu.SendSms({
      AccessKeyId,
      AccessKeySecret,
      PhoneNumbers: '13661989491',
      code: '177820',
      OutId: '<111111>'
    });
    console.log ('testSendSmsAsync:', result);
};

```
备注：一般建议在koa2或node端使用，注意accessKeySecret是私密信息，不能暴露。  
参数含义：  
1. SignName，必选，字符串类型，短信签名，一般为企业简称。如：云通信。
2. PhoneNumbers，必选，字符串类型，短信接收号码。支持以逗号分隔的形式进行批量调用，批量上限为1000个手机号码,批量调用相对于单条调用及时性稍有延迟,验证码类型的短信推荐使用单条调用的方式。如：13661234567
3. TemplateCode，必选，字符串类型，短信模板ID。可以到阿里云控制台去申请。如：SMS_0000
4. TemplateParam，可选, JSON类型，短信模板变量替换JSON串,友情提示:如果JSON中需要带换行符,请参照标准的JSON协议要求。如：{“code”:”1234”,”product”:”ytx”}
5. OutId，可选，字符串类型，外部流水扩展字段，一般忽略此字段。

## 使用方法
1. 到阿里云平台中找到短信服务，申请接入。
    阿里大于的短信验证码服务已经并入阿里云，通过阿里云的控制台->产品与服务->短信服务（在D字头中）进入。
2. 申请短信签名和短信模板
    直接按照阿里云提示的步骤操作
3. 等待审核通过。
4. 找到自己的accessKeyId和accessKeySecret，如果没有则去创建。可以通过右上角，个人信息图标中的accessKeys进去。
5. 按usage节方法使用

## Show cases
### 艺术品挖宝 <http://mp.zdili.com>
### 公众号演示，搜索 "帝利文化"

## 交流群
nodejs开发QQ群： 573207886

## 捐赠
<img src="./219668615.jpg" width="200" alt="捐赠" align=center />

## License
The MIT license.

## Contributors

## 备注
1. 错误 `InvalidTimeStamp.Expired`，原因为时区问题，Timestamp应该用0时区。
```
错误返回：
{
  Message: 'Specified time stamp or date value is expired.',
  RequestId: 'E6CAD98D-E5DD-486B-BE35-9A32AE001666',
  HostId: 'dysmsapi.aliyuncs.com',
  Code: 'InvalidTimeStamp.Expired' 
}

修改：
    let timestamp = moment().format ("YYYY-MM-DD HH:mm:ss");
为：
    let timestamp = moment().utc().format ("YYYY-MM-DD HH:mm:ss");
```
2. 错误 `SignatureDoesNotMatch`
```
错误返回：
{
  Message: 'Specified signature is not matched with our calculation.',
  RequestId: 'ABAD35BD-CBF6-4EF4-9D70-98C9DA303646',
  HostId: 'dysmsapi.aliyuncs.com',
  Code: 'SignatureDoesNotMatch' 
}
修改：
        let strToSign = arr.map(key => {
            //return encodeURIComponent(key +"="+ nArgs[key]);
            return encodeURIComponent(key) +"="+ encodeURIComponent(nArgs[key]);
        }).join('&');
*        strToSign = "GET&%2F&"+strToSign;
为：
        let strToSign = arr.map(key => {
            //return encodeURIComponent(key +"="+ nArgs[key]);
            return encodeURIComponent(key) +"="+ encodeURIComponent(nArgs[key]);
        }).join('&');
*        strToSign = "GET&%2F&"+encodeURIComponent(strToSign);
```
3. 正确返回
```
{
  Message: 'OK',
  RequestId: '0DDA1848-A16C-4910-AD37-1E04828F8ECF',
  BizId: '108638754257^1111626164850',
  Code: 'OK' 
}
```
