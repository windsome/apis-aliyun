'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AliDayu = undefined;

var _debug2 = require('debug');

var _debug3 = _interopRequireDefault(_debug2);

var _dayu = require('./dayu');

var _dayu2 = _interopRequireDefault(_dayu);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var debug = (0, _debug3.default)('app:server:apis-aliyun');

exports.AliDayu = _dayu2.default;