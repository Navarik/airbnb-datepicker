'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports['default'] = registerInterfaceWithBootstrap4Theme;

var _ThemedStyleSheet = require('react-with-styles/lib/ThemedStyleSheet');

var _ThemedStyleSheet2 = _interopRequireDefault(_ThemedStyleSheet);

var _Bootstrap4Theme = require('../theme/Bootstrap4Theme');

var _Bootstrap4Theme2 = _interopRequireDefault(_Bootstrap4Theme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function registerInterfaceWithBootstrap4Theme(reactWithStylesInterface) {
  _ThemedStyleSheet2['default'].registerInterface(reactWithStylesInterface);
  _ThemedStyleSheet2['default'].registerTheme(_Bootstrap4Theme2['default']);
}