import { _get, _genCommonArgs, _sign } from './_base';
/**
 * 获取视频信息
 * see also: https://help.aliyun.com/document_detail/56124.html?spm=a2c4g.11186623.6.635.ulIwpp
 * @param {object} param0
 */
export const GetPlayInfo = ({
  AccessKeyId,
  AccessKeySecret,
  VideoId,
  Formats,
  AuthTimeout,
  StreamType,
  Definition
}) => {
  let args = _genCommonArgs({
    Action: 'GetPlayInfo',
    Version: '2017-03-21',
    AccessKeyId
  });
  let strQuery = _sign(
    {
      ...args,
      VideoId,
      Formats,
      AuthTimeout,
      StreamType,
      Definition
    },
    { AccessKeySecret }
  );
  return _get('http://vod.cn-shanghai.aliyuncs.com/?' + strQuery);
};

/**
 * 获取视频播放凭证
 * see also: https://help.aliyun.com/document_detail/52833.html?spm=a2c4g.11186623.6.636.VV9vfY
 * @param {object} param0
 */
export const GetVideoPlayAuth = ({
  AccessKeyId,
  AccessKeySecret,
  VideoId,
  AuthInfoTimeout
}) => {
  let args = _genCommonArgs({
    Action: 'GetVideoPlayAuth',
    Version: '2017-03-21',
    AccessKeyId
  });
  let strQuery = _sign(
    {
      ...args,
      VideoId,
      AuthInfoTimeout
    },
    { AccessKeySecret }
  );
  return _get('http://vod.cn-shanghai.aliyuncs.com/?' + strQuery);
};
