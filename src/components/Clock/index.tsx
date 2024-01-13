import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import classNames from 'classnames/bind';
import { TIME_UNITS, type TimeUnit } from './types';

const cx = classNames.bind(styles);

const Clock = () => {
  const [date, setDate] = useState<Date>(new Date());

  /**
   * Get how much clock hand of given tiem unit should be rotated based on current time
   * @param {TimeUnit} timeUnit Time unit of the clock hand to measure
   * @returns {number} Rotation degrees between 0 and 360
   */
  const getClockHandRotation = (timeUnit: TimeUnit) => {
    const MAX_DEGREE = 360;

    /**
     * Maximum value that the time unit can have
     */
    const TIME_UNIT_MAX_VALUE: Record<TimeUnit, number> = {
      hour: 12,
      minute: 60,
      second: 60
    };

    let currentValue = getTimeUnitValue(timeUnit);
    const maxValue = TIME_UNIT_MAX_VALUE[timeUnit];

    /**
     * Remainder operation is required because hour has range of 0~24,
     * while analog clock has to render in range of 0~12
     */
    if (timeUnit === 'hour') {
      currentValue = currentValue % maxValue;
    }

    return currentValue / maxValue * MAX_DEGREE;
  };

  /**
   * Extract current value of the given time unit
   * @param {TimeUnit} timeUnit Time unit to extract value
   * @returns {number} Current value of the given time unit
   */
  const getTimeUnitValue = (timeUnit: TimeUnit): number => {
    switch (timeUnit) {
      case 'hour':
        return date.getHours();
      case 'minute':
        return date.getMinutes();
      case 'second':
        return date.getSeconds();
      default:
        const exhaustiveCheck: never = timeUnit;
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        throw new Error(`Invalid time unit given: ${exhaustiveCheck}`);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const current = new Date();
      setDate(current);
    });

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className={cx('clock')}>
      <div className={cx('fixing-pin', 'center')} />
      {TIME_UNITS.map(timeUnit => (
        <div
          className={cx('clock-hand', `clock-hand--${timeUnit}`)}
          style={{ transform: `rotateZ(${getClockHandRotation(timeUnit)}deg)` }}
          key={timeUnit}
        />
      ))}
    </div>
  );
};

export default React.memo(Clock);
