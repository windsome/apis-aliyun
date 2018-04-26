import { _get, _genCommonArgs, _sign } from './_base';
const URL_API = 'https://sts.aliyuncs.com/';
/**
   * 获取STS临时凭据
    accessKeyId: '<通过访问控制RAM创建的子用户accessKeyId>',
    accessKeySecret: '<通过访问控制RAM创建的子用户accessKeySecret>',
    arn: '<通过RAM创建的角色>',//acs:ram::1459759790853733:role/vod-upload'
   * @param {object} param0 
   */
export const AssumeRole = ({
  AccessKeyId,
  AccessKeySecret,
  RoleArn,
  RoleSessionName
}) => {
  let args = _genCommonArgs({
    Action: 'AssumeRole',
    Version: '2015-04-01',
    AccessKeyId
  });
  let strQuery = _sign(
    {
      ...args,
      RoleArn,
      RoleSessionName
    },
    { AccessKeySecret }
  );

  return _get(URL_API + '?' + strQuery);
};
