///////////////////////////////////////////////////
// koa web server for all APPs.
///////////////////////////////////////////////////

//let {dayu} = require('../src/');
import { dayu } from '../src';

// let AccessKeyId = '<your_accessKeyId>'; // 替换成您自己的AccessKeyId
// let AccessKeySecret = '<your_accessKeySecret>'; // 替换成您自己的AccessKeySecret
import {AccessKeyId, AccessKeySecret} from './secret_dayu'; // 去掉此句，这是我自己测试用的AccessKeyId, AccessKeySecret，放在一个私密文件中

export const testSendSms = () => {
    let result = dayu.SendSms({
      AccessKeyId,
      AccessKeySecret,
      PhoneNumbers: '13661989491',
      SignName: '帝利文化',
      TemplateCode: 'SMS_76425078',
      TemplateParam: { number: '177820' },
      OutId:'<应用内部ID>' //可选
    }).then(result => {
        console.log ('testSendSms:', result);
    });
};

export const testSendSmsAsync = async () => {
    let result = await dayu.SendSms({
      AccessKeyId,
      AccessKeySecret,
      PhoneNumbers: '13661989491',
      SignName: '帝利文化',
      TemplateCode: 'SMS_76425078',
      TemplateParam: { number: '177820' },
      OutId:'<应用内部ID>' //可选
    });
    console.log ('testSendSmsAsync:', result);
};

//testSendSms();