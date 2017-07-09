apis-aliyun [![NPM version](https://badge.fury.io/js/apis-aliyun.png)](http://badge.fury.io/js/apis-aliyun) [![Build Status](https://travis-ci.org/windsome/apis-aliyun.png?branch=master)](https://travis-ci.org/windsome/apis-aliyun) [![Dependencies Status](https://david-dm.org/windsome/apis-aliyun.png)](https://david-dm.org/windsome/apis-aliyun) [![Coverage Status](https://coveralls.io/repos/windsome/apis-aliyun/badge.png)](https://coveralls.io/r/windsome/apis-aliyun)
======

调用阿里大于发送短信

## 功能列表
+ 发送短信验证码接口
+ 其他接口

## Installation

```sh
$ npm install apis-aliyun
```

## Usage
```js
import Dayu from 'apis-aliyun';
// init:
var dayu = new Dayu ('<your accessKeyId>', '<your accessKeySecret>');

// get result:
var result = await dayu.sendSMSCode ('<phone>','<code>','<outId>');
debug ('result:', result);
```
备注：一般建议在koa2或node端使用，注意accessKeySecret是私密信息，不能暴露。

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
<img src="./219668615.jpg" width="300" alt="捐赠" align=center />

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
