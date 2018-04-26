///////////////////////////////////////////////////
// koa web server for all APPs.
///////////////////////////////////////////////////

//let {dayu} = require('../src/');
import { dayu } from '../src';

let AccessKeyId = '<your_accessKeyId>'; // 替换成您自己的AccessKeyId
let AccessKeySecret = '<your_accessKeySecret>'; // 替换成您自己的AccessKeySecret

export const testSendSms = () => {
    let result = dayu.SendSms({
      AccessKeyId,
      AccessKeySecret,
      PhoneNumbers: '13661989491',
      code: '177820'
    }).then(result => {
        console.log ('testSendSms:', result);
    });
};

export const testSendSmsAsync = async () => {
    let result = await dayu.SendSms({
      AccessKeyId,
      AccessKeySecret,
      PhoneNumbers: '13661989491',
      code: '177820'
    });
    console.log ('testSendSmsAsync:', result);
};

//testSendSms();