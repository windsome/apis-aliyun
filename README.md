apis-aliyun [![NPM version](https://badge.fury.io/js/apis-aliyun.png)](http://badge.fury.io/js/apis-aliyun) [![Build Status](https://travis-ci.org/windsome/apis-aliyun.png?branch=master)](https://travis-ci.org/windsome/apis-aliyun) [![Dependencies Status](https://david-dm.org/windsome/apis-aliyun.png)](https://david-dm.org/windsome/apis-aliyun) [![Coverage Status](https://coveralls.io/repos/windsome/apis-aliyun/badge.png)](https://coveralls.io/r/windsome/apis-aliyun)
======

调用阿里大于发送短信

## 功能列表
+ 发送短信接口
+ 其他接口

## Installation

```sh
$ npm install apis-aliyun
```

## Use with koa

```js
import Dayu from 'apis-aliyun';
// init:
var Dayu = new Dayu ();

// get result:
var result = await lottery.getResultAfterTime (new Date(), 'cqssc');
debug ('cqssc result:', result);

```
备注：token在微信平台的开发者中心申请

## 数据来源

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
