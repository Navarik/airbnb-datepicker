'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports['default'] = getResponsiveContainerStyles;

var _constants = require('../constants');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function getResponsiveContainerStyles(anchorDirection, currentOffset, containerEdge, margin) {
  var windowWidth = (typeof document === 'undefined' ? 'undefined' : _typeof(document)) !== undefined && document.body !== undefined ? document.body.clientWidth : 0;
  var calculatedOffset = anchorDirection === _constants.ANCHOR_LEFT ? windowWidth - containerEdge : containerEdge;
  var calculatedMargin = margin || 0;

  return _defineProperty({}, anchorDirection, Math.min(currentOffset + calculatedOffset - calculatedMargin, 0));
}