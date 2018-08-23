'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _object = require('object.assign');

var _object2 = _interopRequireDefault(_object);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactAddonsShallowCompare = require('react-addons-shallow-compare');

var _reactAddonsShallowCompare2 = _interopRequireDefault(_reactAddonsShallowCompare);

var _reactMomentProptypes = require('react-moment-proptypes');

var _reactMomentProptypes2 = _interopRequireDefault(_reactMomentProptypes);

var _airbnbPropTypes = require('airbnb-prop-types');

var _reactWithStyles = require('react-with-styles');

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _defaultPhrases = require('../defaultPhrases');

var _getPhrasePropTypes = require('../utils/getPhrasePropTypes');

var _getPhrasePropTypes2 = _interopRequireDefault(_getPhrasePropTypes);

var _CalendarWeek = require('./CalendarWeek');

var _CalendarWeek2 = _interopRequireDefault(_CalendarWeek);

var _CalendarDay = require('./CalendarDay');

var _CalendarDay2 = _interopRequireDefault(_CalendarDay);

var _calculateDimension = require('../utils/calculateDimension');

var _calculateDimension2 = _interopRequireDefault(_calculateDimension);

var _getCalendarMonthWeeks = require('../utils/getCalendarMonthWeeks');

var _getCalendarMonthWeeks2 = _interopRequireDefault(_getCalendarMonthWeeks);

var _isSameDay = require('../utils/isSameDay');

var _isSameDay2 = _interopRequireDefault(_isSameDay);

var _toISODateString = require('../utils/toISODateString');

var _toISODateString2 = _interopRequireDefault(_toISODateString);

var _ModifiersShape = require('../shapes/ModifiersShape');

var _ModifiersShape2 = _interopRequireDefault(_ModifiersShape);

var _ScrollableOrientationShape = require('../shapes/ScrollableOrientationShape');

var _ScrollableOrientationShape2 = _interopRequireDefault(_ScrollableOrientationShape);

var _DayOfWeekShape = require('../shapes/DayOfWeekShape');

var _DayOfWeekShape2 = _interopRequireDefault(_DayOfWeekShape);

var _constants = require('../constants');

var _ChevronUp = require('./ChevronUp');

var _ChevronUp2 = _interopRequireDefault(_ChevronUp);

var _ChevronDown = require('./ChevronDown');

var _ChevronDown2 = _interopRequireDefault(_ChevronDown);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint react/no-array-index-key: 0 */

var propTypes = (0, _airbnbPropTypes.forbidExtraProps)((0, _object2['default'])({}, _reactWithStyles.withStylesPropTypes, {
  month: _reactMomentProptypes2['default'].momentObj,
  horizontalMonthPadding: _airbnbPropTypes.nonNegativeInteger,
  isVisible: _propTypes2['default'].bool,
  enableOutsideDays: _propTypes2['default'].bool,
  modifiers: _propTypes2['default'].objectOf(_ModifiersShape2['default']),
  orientation: _ScrollableOrientationShape2['default'],
  daySize: _airbnbPropTypes.nonNegativeInteger,
  onDayClick: _propTypes2['default'].func,
  onDayMouseEnter: _propTypes2['default'].func,
  onDayMouseLeave: _propTypes2['default'].func,
  onMonthSelect: _propTypes2['default'].func,
  onYearSelect: _propTypes2['default'].func,
  renderMonthText: (0, _airbnbPropTypes.mutuallyExclusiveProps)(_propTypes2['default'].func, 'renderMonthText', 'renderMonthElement'),
  renderCalendarDay: _propTypes2['default'].func,
  renderDayContents: _propTypes2['default'].func,
  renderMonthElement: (0, _airbnbPropTypes.mutuallyExclusiveProps)(_propTypes2['default'].func, 'renderMonthText', 'renderMonthElement'),
  firstDayOfWeek: _DayOfWeekShape2['default'],
  setMonthTitleHeight: _propTypes2['default'].func,
  verticalBorderSpacing: _airbnbPropTypes.nonNegativeInteger,

  focusedDate: _reactMomentProptypes2['default'].momentObj, // indicates focusable day
  isFocused: _propTypes2['default'].bool, // indicates whether or not to move focus to focusable day

  // i18n
  monthFormat: _propTypes2['default'].string,
  phrases: _propTypes2['default'].shape((0, _getPhrasePropTypes2['default'])(_defaultPhrases.CalendarDayPhrases)),
  dayAriaLabelFormat: _propTypes2['default'].string,

  showYearNav: _propTypes2['default'].bool
}));

var defaultProps = {
  month: (0, _moment2['default'])(),
  horizontalMonthPadding: 13,
  isVisible: true,
  enableOutsideDays: false,
  modifiers: {},
  orientation: _constants.HORIZONTAL_ORIENTATION,
  daySize: _constants.DAY_SIZE,
  onDayClick: function () {
    function onDayClick() {}

    return onDayClick;
  }(),
  onDayMouseEnter: function () {
    function onDayMouseEnter() {}

    return onDayMouseEnter;
  }(),
  onDayMouseLeave: function () {
    function onDayMouseLeave() {}

    return onDayMouseLeave;
  }(),
  onMonthSelect: function () {
    function onMonthSelect() {}

    return onMonthSelect;
  }(),
  onYearSelect: function () {
    function onYearSelect() {}

    return onYearSelect;
  }(),

  renderMonthText: null,
  renderCalendarDay: function () {
    function renderCalendarDay(props) {
      return _react2['default'].createElement(_CalendarDay2['default'], props);
    }

    return renderCalendarDay;
  }(),
  renderDayContents: null,
  renderMonthElement: null,
  firstDayOfWeek: null,
  setMonthTitleHeight: null,

  focusedDate: null,
  isFocused: false,

  // i18n
  monthFormat: 'MMMM YYYY', // english locale
  phrases: _defaultPhrases.CalendarDayPhrases,
  dayAriaLabelFormat: undefined,
  verticalBorderSpacing: undefined,

  showYearNav: false
};

var CalendarMonth = function (_React$Component) {
  _inherits(CalendarMonth, _React$Component);

  function CalendarMonth(props) {
    _classCallCheck(this, CalendarMonth);

    var _this = _possibleConstructorReturn(this, (CalendarMonth.__proto__ || Object.getPrototypeOf(CalendarMonth)).call(this, props));

    _this.state = {
      weeks: (0, _getCalendarMonthWeeks2['default'])(props.month, props.enableOutsideDays, props.firstDayOfWeek == null ? _moment2['default'].localeData().firstDayOfWeek() : props.firstDayOfWeek)
    };

    _this.setCaptionRef = _this.setCaptionRef.bind(_this);
    _this.setMonthTitleHeight = _this.setMonthTitleHeight.bind(_this);
    return _this;
  }

  _createClass(CalendarMonth, [{
    key: 'componentDidMount',
    value: function () {
      function componentDidMount() {
        this.setMonthTitleHeightTimeout = setTimeout(this.setMonthTitleHeight, 0);
      }

      return componentDidMount;
    }()
  }, {
    key: 'componentWillReceiveProps',
    value: function () {
      function componentWillReceiveProps(nextProps) {
        var month = nextProps.month,
            enableOutsideDays = nextProps.enableOutsideDays,
            firstDayOfWeek = nextProps.firstDayOfWeek;
        var _props = this.props,
            prevMonth = _props.month,
            prevEnableOutsideDays = _props.enableOutsideDays,
            prevFirstDayOfWeek = _props.firstDayOfWeek;

        if (!month.isSame(prevMonth) || enableOutsideDays !== prevEnableOutsideDays || firstDayOfWeek !== prevFirstDayOfWeek) {
          this.setState({
            weeks: (0, _getCalendarMonthWeeks2['default'])(month, enableOutsideDays, firstDayOfWeek == null ? _moment2['default'].localeData().firstDayOfWeek() : firstDayOfWeek)
          });
        }
      }

      return componentWillReceiveProps;
    }()
  }, {
    key: 'shouldComponentUpdate',
    value: function () {
      function shouldComponentUpdate(nextProps, nextState) {
        return (0, _reactAddonsShallowCompare2['default'])(this, nextProps, nextState);
      }

      return shouldComponentUpdate;
    }()
  }, {
    key: 'componentWillUnmount',
    value: function () {
      function componentWillUnmount() {
        if (this.setMonthTitleHeightTimeout) {
          clearTimeout(this.setMonthTitleHeightTimeout);
        }
      }

      return componentWillUnmount;
    }()
  }, {
    key: 'setMonthTitleHeight',
    value: function () {
      function setMonthTitleHeight() {
        var setMonthTitleHeight = this.props.setMonthTitleHeight;

        if (setMonthTitleHeight) {
          var captionHeight = (0, _calculateDimension2['default'])(this.captionRef, 'height', true, true);
          setMonthTitleHeight(captionHeight);
        }
      }

      return setMonthTitleHeight;
    }()
  }, {
    key: 'setCaptionRef',
    value: function () {
      function setCaptionRef(ref) {
        this.captionRef = ref;
      }

      return setCaptionRef;
    }()
  }, {
    key: 'maybeRenderYearNav',
    value: function () {
      function maybeRenderYearNav(monthTitle) {
        var _props2 = this.props,
            month = _props2.month,
            styles = _props2.styles,
            onMonthSelect = _props2.onMonthSelect,
            onYearSelect = _props2.onYearSelect,
            showYearNav = _props2.showYearNav;


        if (!showYearNav) {
          return CalendarMonth.defaultMonthElement(monthTitle, styles);
        }

        return this.renderYearSelector({ month: month, onMonthSelect: onMonthSelect, onYearSelect: onYearSelect, styles: styles });
      }

      return maybeRenderYearNav;
    }()
  }, {
    key: 'renderYearSelector',
    value: function () {
      function renderYearSelector(_ref) {
        var month = _ref.month,
            onMonthSelect = _ref.onMonthSelect,
            onYearSelect = _ref.onYearSelect,
            styles = _ref.styles;

        return _react2['default'].createElement(
          'div',
          { style: { display: 'flex', justifyContent: 'center' } },
          _react2['default'].createElement(
            'div',
            null,
            _react2['default'].createElement(
              'select',
              _extends({
                value: month.month(),
                onChange: function () {
                  function onChange(e) {
                    onMonthSelect(month, e.target.value);
                  }

                  return onChange;
                }()
              }, (0, _reactWithStyles.css)(styles.CalendarMonth_monthNav)),
              _moment2['default'].months().map(function (label, value) {
                return _react2['default'].createElement(
                  'option',
                  _extends({ key: value, value: value }, (0, _reactWithStyles.css)(styles.CalendarMonth_monthNav_option)),
                  label
                );
              })
            )
          ),
          _react2['default'].createElement(
            'div',
            (0, _reactWithStyles.css)(styles.CalendarMonth_yearNav_wrapper),
            _react2['default'].createElement(
              'strong',
              null,
              month.year()
            ),
            _react2['default'].createElement(
              'div',
              (0, _reactWithStyles.css)(styles.CalendarMonth_yearNav_btnWrapper),
              _react2['default'].createElement(_ChevronUp2['default'], _extends({ onClick: function () {
                  function onClick(e) {
                    e.preventDefault();onYearSelect(month, month.year() + 1);
                  }

                  return onClick;
                }() }, (0, _reactWithStyles.css)(styles.CalendarMonth_yearNav))),
              _react2['default'].createElement(_ChevronDown2['default'], _extends({ onClick: function () {
                  function onClick(e) {
                    e.preventDefault();onYearSelect(month, month.year() - 1);
                  }

                  return onClick;
                }() }, (0, _reactWithStyles.css)(styles.CalendarMonth_yearNav)))
            )
          )
        );
      }

      return renderYearSelector;
    }()
  }, {
    key: 'render',
    value: function () {
      function render() {
        var _props3 = this.props,
            dayAriaLabelFormat = _props3.dayAriaLabelFormat,
            daySize = _props3.daySize,
            focusedDate = _props3.focusedDate,
            horizontalMonthPadding = _props3.horizontalMonthPadding,
            isFocused = _props3.isFocused,
            isVisible = _props3.isVisible,
            modifiers = _props3.modifiers,
            month = _props3.month,
            monthFormat = _props3.monthFormat,
            onDayClick = _props3.onDayClick,
            onDayMouseEnter = _props3.onDayMouseEnter,
            onDayMouseLeave = _props3.onDayMouseLeave,
            onMonthSelect = _props3.onMonthSelect,
            onYearSelect = _props3.onYearSelect,
            orientation = _props3.orientation,
            phrases = _props3.phrases,
            renderCalendarDay = _props3.renderCalendarDay,
            renderDayContents = _props3.renderDayContents,
            renderMonthElement = _props3.renderMonthElement,
            renderMonthText = _props3.renderMonthText,
            styles = _props3.styles,
            verticalBorderSpacing = _props3.verticalBorderSpacing;
        var weeks = this.state.weeks;

        var monthTitle = renderMonthText ? renderMonthText(month) : month.format(monthFormat);

        var verticalScrollable = orientation === _constants.VERTICAL_SCROLLABLE;

        return _react2['default'].createElement(
          'div',
          _extends({}, (0, _reactWithStyles.css)(styles.CalendarMonth, { padding: '0 ' + String(horizontalMonthPadding) + 'px' }), {
            'data-visible': isVisible
          }),
          _react2['default'].createElement(
            'div',
            _extends({
              ref: this.setCaptionRef
            }, (0, _reactWithStyles.css)(styles.CalendarMonth_caption, verticalScrollable && styles.CalendarMonth_caption__verticalScrollable)),
            renderMonthElement ? renderMonthElement({ month: month, onMonthSelect: onMonthSelect, onYearSelect: onYearSelect }) : this.maybeRenderYearNav(monthTitle)
          ),
          _react2['default'].createElement(
            'table',
            _extends({}, (0, _reactWithStyles.css)(!verticalBorderSpacing && styles.CalendarMonth_table, verticalBorderSpacing && styles.CalendarMonth_verticalSpacing, verticalBorderSpacing && { borderSpacing: '0px ' + String(verticalBorderSpacing) + 'px' }), {
              role: 'presentation'
            }),
            _react2['default'].createElement(
              'tbody',
              null,
              weeks.map(function (week, i) {
                return _react2['default'].createElement(
                  _CalendarWeek2['default'],
                  { key: i },
                  week.map(function (day, dayOfWeek) {
                    return renderCalendarDay({
                      key: dayOfWeek,
                      day: day,
                      daySize: daySize,
                      isOutsideDay: !day || day.month() !== month.month(),
                      tabIndex: isVisible && (0, _isSameDay2['default'])(day, focusedDate) ? 0 : -1,
                      isFocused: isFocused,
                      onDayMouseEnter: onDayMouseEnter,
                      onDayMouseLeave: onDayMouseLeave,
                      onDayClick: onDayClick,
                      renderDayContents: renderDayContents,
                      phrases: phrases,
                      modifiers: modifiers[(0, _toISODateString2['default'])(day)],
                      ariaLabelFormat: dayAriaLabelFormat
                    });
                  })
                );
              })
            )
          )
        );
      }

      return render;
    }()
  }], [{
    key: 'defaultMonthElement',
    value: function () {
      function defaultMonthElement(monthTitle, styles) {
        return _react2['default'].createElement(
          'div',
          (0, _reactWithStyles.css)(styles.CalendarMonth_defaultMonth),
          _react2['default'].createElement(
            'strong',
            null,
            monthTitle
          )
        );
      }

      return defaultMonthElement;
    }()
  }]);

  return CalendarMonth;
}(_react2['default'].Component);

CalendarMonth.propTypes = propTypes;
CalendarMonth.defaultProps = defaultProps;

exports['default'] = (0, _reactWithStyles.withStyles)(function (_ref2) {
  var _ref2$reactDates = _ref2.reactDates,
      color = _ref2$reactDates.color,
      font = _ref2$reactDates.font,
      spacing = _ref2$reactDates.spacing;
  return {
    CalendarMonth: {
      background: color.background,
      textAlign: 'center',
      verticalAlign: 'top',
      userSelect: 'none'
    },

    CalendarMonth_table: {
      borderCollapse: 'collapse',
      borderSpacing: 0
    },

    CalendarMonth_verticalSpacing: {
      borderCollapse: 'separate'
    },

    CalendarMonth_caption: {
      color: color.text,
      fontSize: font.captionSize,
      textAlign: 'center',
      paddingTop: spacing.captionPaddingTop,
      paddingBottom: spacing.captionPaddingBottom,
      captionSide: 'initial'
    },

    CalendarMonth_caption__verticalScrollable: {
      paddingTop: 12,
      paddingBottom: 7
    },

    // Year nav extras

    CalendarMonth_defaultMonth: {
      fontSize: font.captionSize,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: 34
    },

    CalendarMonth_monthNav: {
      border: '1px solid ' + String(color.core.borderLight),
      borderRadius: 3,
      height: 34,
      fontSize: font.captionSize,
      marginTop: 0,
      boxSizing: 'border-box',
      fontWeight: 'bold'
    },

    CalendarMonth_monthNav_option: {
      fontSize: font.size
    },

    CalendarMonth_yearNav_wrapper: {
      paddingLeft: 5,
      display: 'flex',
      height: 34,
      border: '1px solid ' + String(color.core.borderLight),
      borderRadius: 3,
      fontSize: font.captionSize,
      boxSizing: 'border-box',
      alignItems: 'center'
    },

    CalendarMonth_yearNav_btnWrapper: {
      display: 'inline-block',
      height: '100%',
      marginLeft: 3,
      float: 'right'
    },

    CalendarMonth_yearNav: {
      height: '50%',
      display: 'block',
      width: 17,
      padding: 3,
      fontSize: 12,
      overflow: 'hidden',
      backgroundColor: color.background,
      color: color.placeholderText,
      cursor: 'pointer',

      border: '1px solid transparent',
      borderRadius: 3,

      ':hover': {
        border: '1px solid ' + String(color.core.borderLight),
        backgroundColor: color.core.borderLight
      },

      ':focus': {
        border: '1px solid ' + String(color.core.borderLight),
        backgroundColor: color.core.borderLight
      }
    }

  };
})(CalendarMonth);