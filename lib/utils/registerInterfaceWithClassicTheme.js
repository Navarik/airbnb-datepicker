'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports['default'] = registerInterfaceWithClassicTheme;

var _ThemedStyleSheet = require('react-with-styles/lib/ThemedStyleSheet');

var _ThemedStyleSheet2 = _interopRequireDefault(_ThemedStyleSheet);

var _ClassicTheme = require('../theme/ClassicTheme');

var _ClassicTheme2 = _interopRequireDefault(_ClassicTheme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function registerInterfaceWithClassicTheme(reactWithStylesInterface) {
  _ThemedStyleSheet2['default'].registerInterface(reactWithStylesInterface);
  _ThemedStyleSheet2['default'].registerTheme(_ClassicTheme2['default']);
}