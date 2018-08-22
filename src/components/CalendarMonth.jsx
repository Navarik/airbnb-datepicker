/* eslint react/no-array-index-key: 0 */

import React from 'react';
import PropTypes from 'prop-types';
import shallowCompare from 'react-addons-shallow-compare';
import momentPropTypes from 'react-moment-proptypes';
import { forbidExtraProps, mutuallyExclusiveProps, nonNegativeInteger } from 'airbnb-prop-types';
import { css, withStyles, withStylesPropTypes } from 'react-with-styles';
import moment from 'moment';

import { CalendarDayPhrases } from '../defaultPhrases';
import getPhrasePropTypes from '../utils/getPhrasePropTypes';

import CalendarWeek from './CalendarWeek';
import CalendarDay from './CalendarDay';

import calculateDimension from '../utils/calculateDimension';
import getCalendarMonthWeeks from '../utils/getCalendarMonthWeeks';
import isSameDay from '../utils/isSameDay';
import toISODateString from '../utils/toISODateString';

import ModifiersShape from '../shapes/ModifiersShape';
import ScrollableOrientationShape from '../shapes/ScrollableOrientationShape';
import DayOfWeekShape from '../shapes/DayOfWeekShape';

import {
  HORIZONTAL_ORIENTATION,
  VERTICAL_SCROLLABLE,
  DAY_SIZE,
} from '../constants';
import ChevronUp from "./ChevronUp";
import ChevronDown from "./ChevronDown";

const propTypes = forbidExtraProps({
  ...withStylesPropTypes,
  month: momentPropTypes.momentObj,
  horizontalMonthPadding: nonNegativeInteger,
  isVisible: PropTypes.bool,
  enableOutsideDays: PropTypes.bool,
  modifiers: PropTypes.objectOf(ModifiersShape),
  orientation: ScrollableOrientationShape,
  daySize: nonNegativeInteger,
  onDayClick: PropTypes.func,
  onDayMouseEnter: PropTypes.func,
  onDayMouseLeave: PropTypes.func,
  onMonthSelect: PropTypes.func,
  onYearSelect: PropTypes.func,
  renderMonthText: mutuallyExclusiveProps(PropTypes.func, 'renderMonthText', 'renderMonthElement'),
  renderCalendarDay: PropTypes.func,
  renderDayContents: PropTypes.func,
  renderMonthElement: mutuallyExclusiveProps(PropTypes.func, 'renderMonthText', 'renderMonthElement'),
  firstDayOfWeek: DayOfWeekShape,
  setMonthTitleHeight: PropTypes.func,
  verticalBorderSpacing: nonNegativeInteger,

  focusedDate: momentPropTypes.momentObj, // indicates focusable day
  isFocused: PropTypes.bool, // indicates whether or not to move focus to focusable day

  // i18n
  monthFormat: PropTypes.string,
  phrases: PropTypes.shape(getPhrasePropTypes(CalendarDayPhrases)),
  dayAriaLabelFormat: PropTypes.string,

  showYearNav: PropTypes.bool,
});

const defaultProps = {
  month: moment(),
  horizontalMonthPadding: 13,
  isVisible: true,
  enableOutsideDays: false,
  modifiers: {},
  orientation: HORIZONTAL_ORIENTATION,
  daySize: DAY_SIZE,
  onDayClick() {},
  onDayMouseEnter() {},
  onDayMouseLeave() {},
  onMonthSelect() {},
  onYearSelect() {},
  renderMonthText: null,
  renderCalendarDay: props => (<CalendarDay {...props} />),
  renderDayContents: null,
  renderMonthElement: null,
  firstDayOfWeek: null,
  setMonthTitleHeight: null,

  focusedDate: null,
  isFocused: false,

  // i18n
  monthFormat: 'MMMM YYYY', // english locale
  phrases: CalendarDayPhrases,
  dayAriaLabelFormat: undefined,
  verticalBorderSpacing: undefined,

  showYearNav: false,
};

class CalendarMonth extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      weeks: getCalendarMonthWeeks(
        props.month,
        props.enableOutsideDays,
        props.firstDayOfWeek == null ? moment.localeData().firstDayOfWeek() : props.firstDayOfWeek,
      ),
    };

    this.setCaptionRef = this.setCaptionRef.bind(this);
    this.setMonthTitleHeight = this.setMonthTitleHeight.bind(this);
  }

  componentDidMount() {
    this.setMonthTitleHeightTimeout = setTimeout(this.setMonthTitleHeight, 0);
  }

  componentWillReceiveProps(nextProps) {
    const { month, enableOutsideDays, firstDayOfWeek } = nextProps;
    const {
      month: prevMonth,
      enableOutsideDays: prevEnableOutsideDays,
      firstDayOfWeek: prevFirstDayOfWeek,
    } = this.props;
    if (
      !month.isSame(prevMonth)
      || enableOutsideDays !== prevEnableOutsideDays
      || firstDayOfWeek !== prevFirstDayOfWeek
    ) {
      this.setState({
        weeks: getCalendarMonthWeeks(
          month,
          enableOutsideDays,
          firstDayOfWeek == null ? moment.localeData().firstDayOfWeek() : firstDayOfWeek,
        ),
      });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  componentWillUnmount() {
    if (this.setMonthTitleHeightTimeout) {
      clearTimeout(this.setMonthTitleHeightTimeout);
    }
  }

  setMonthTitleHeight() {
    const { setMonthTitleHeight } = this.props;
    if (setMonthTitleHeight) {
      const captionHeight = calculateDimension(this.captionRef, 'height', true, true);
      setMonthTitleHeight(captionHeight);
    }
  }

  setCaptionRef(ref) {
    this.captionRef = ref;
  }

  maybeRenderYearNav(monthTitle) {
    const {
      month,
      styles,
      onMonthSelect,
      onYearSelect,
      showYearNav,
    } = this.props;

    if (!showYearNav) {
      return CalendarMonth.defaultMonthElement(monthTitle, styles);
    }

    return this.renderYearSelector({ month, onMonthSelect, onYearSelect, styles });
  }

  static defaultMonthElement(monthTitle, styles) {
    return (
        <div {...css(styles.CalendarMonth_defaultMonth)}>
          <strong>
            {monthTitle}
          </strong>
        </div>
    );
  }

  renderYearSelector({ month, onMonthSelect, onYearSelect, styles }) {
    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div>
            <select
                value={month.month()}
                onChange={(e) => { onMonthSelect(month, e.target.value); }}
                {...css(styles.CalendarMonth_monthNav)}
            >
              {moment.months().map((label, value) => (
                  <option key={value} value={value} {...css(styles.CalendarMonth_monthNav_option)}>{label}</option>
              ))}
            </select>
          </div>
          <div {...css(styles.CalendarMonth_yearNav_wrapper)}>
            <strong>{month.year()}</strong>
            <div {...css(styles.CalendarMonth_yearNav_btnWrapper)}>
              <ChevronUp onClick={(e) => { e.preventDefault(); onYearSelect(month, month.year() + 1); }} {...css(styles.CalendarMonth_yearNav)}/>
              <ChevronDown onClick={(e) => { e.preventDefault(); onYearSelect(month, month.year() - 1); }} {...css(styles.CalendarMonth_yearNav)}/>
            </div>
          </div>
        </div>
    )
  }

  render() {
    const {
      dayAriaLabelFormat,
      daySize,
      focusedDate,
      horizontalMonthPadding,
      isFocused,
      isVisible,
      modifiers,
      month,
      monthFormat,
      onDayClick,
      onDayMouseEnter,
      onDayMouseLeave,
      onMonthSelect,
      onYearSelect,
      orientation,
      phrases,
      renderCalendarDay,
      renderDayContents,
      renderMonthElement,
      renderMonthText,
      styles,
      verticalBorderSpacing,
    } = this.props;

    const { weeks } = this.state;
    const monthTitle = renderMonthText ? renderMonthText(month) : month.format(monthFormat);

    const verticalScrollable = orientation === VERTICAL_SCROLLABLE;

    return (
      <div
        {...css(
          styles.CalendarMonth,
          { padding: `0 ${horizontalMonthPadding}px` },
        )}
        data-visible={isVisible}
      >
        <div
          ref={this.setCaptionRef}
          {...css(
            styles.CalendarMonth_caption,
            verticalScrollable && styles.CalendarMonth_caption__verticalScrollable,
          )}
        >
          {renderMonthElement ? (
            renderMonthElement({ month, onMonthSelect, onYearSelect })
          ) : (
            this.maybeRenderYearNav(monthTitle)
          )}
        </div>

        <table
          {...css(
            !verticalBorderSpacing && styles.CalendarMonth_table,
            verticalBorderSpacing && styles.CalendarMonth_verticalSpacing,
            verticalBorderSpacing && { borderSpacing: `0px ${verticalBorderSpacing}px` },
          )}
          role="presentation"
        >
          <tbody>
            {weeks.map((week, i) => (
              <CalendarWeek key={i}>
                {week.map((day, dayOfWeek) => renderCalendarDay({
                  key: dayOfWeek,
                  day,
                  daySize,
                  isOutsideDay: !day || day.month() !== month.month(),
                  tabIndex: isVisible && isSameDay(day, focusedDate) ? 0 : -1,
                  isFocused,
                  onDayMouseEnter,
                  onDayMouseLeave,
                  onDayClick,
                  renderDayContents,
                  phrases,
                  modifiers: modifiers[toISODateString(day)],
                  ariaLabelFormat: dayAriaLabelFormat,
                }))}
              </CalendarWeek>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

CalendarMonth.propTypes = propTypes;
CalendarMonth.defaultProps = defaultProps;

export default withStyles(({ reactDates: { color, font, spacing } }) => ({
  CalendarMonth: {
    background: color.background,
    textAlign: 'center',
    verticalAlign: 'top',
    userSelect: 'none',
  },

  CalendarMonth_table: {
    borderCollapse: 'collapse',
    borderSpacing: 0,
  },

  CalendarMonth_verticalSpacing: {
    borderCollapse: 'separate',
  },

  CalendarMonth_caption: {
    color: color.text,
    fontSize: font.captionSize,
    textAlign: 'center',
    paddingTop: spacing.captionPaddingTop,
    paddingBottom: spacing.captionPaddingBottom,
    captionSide: 'initial',
  },

  CalendarMonth_caption__verticalScrollable: {
    paddingTop: 12,
    paddingBottom: 7,
  },

  // Year nav extras

  CalendarMonth_defaultMonth: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 34
  },

  CalendarMonth_monthNav: {
    border: `1px solid ${color.core.borderLight}`,
    borderRadius: 3,
    height: 34,
    fontSize: font.captionSize,
  },

  CalendarMonth_monthNav_option: {
    fontSize: font.size,
  },

  CalendarMonth_yearNav_wrapper: {
    paddingLeft: 5,
    display: 'flex',
    height: 34,
    border: `1px solid ${color.core.borderLight}`,
    borderRadius: 3,
    fontSize: font.captionSize,
    boxSizing: 'border-box',
    alignItems: 'center',
  },

  CalendarMonth_yearNav_btnWrapper: {
    display: 'inline-block',
    height: '100%',
    marginLeft: 3,
    float: 'right',
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

    border: `1px solid transparent`,
    borderRadius: 3,

    ':hover': {
      border: `1px solid ${color.core.borderLight}`,
      backgroundColor: color.core.borderLight,
    },

    ':focus': {
      border: `1px solid ${color.core.borderLight}`,
      backgroundColor: color.core.borderLight,
    },
  },

}))(CalendarMonth);
