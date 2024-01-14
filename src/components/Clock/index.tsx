import React, { useEffect, useRef, useState } from 'react';
import styles from './index.module.scss';
import classNames from 'classnames/bind';
import { TIME_UNITS, type TimeUnit } from './types';
import { useTooltip } from '../Tooltip/useTooltip';
import ClockHand from './ClockHand';

const cx = classNames.bind(styles);

const Clock = () => {
  const [date, setDate] = useState<Date>(new Date());
  const ref = useRef<HTMLDivElement>(null!);

  const { addTooltip, updateTooltipContent } = useTooltip(ref);

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
    addTooltip('');
    const interval = setInterval(() => {
      const current = new Date();
      setDate(current);
      updateTooltipContent(current.toTimeString());
    });

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={cx('clock')}
    >
      <div className={cx('fixing-pin', 'center')} />
      {TIME_UNITS.map(timeUnit => (
        <ClockHand
          key={timeUnit}
          timeUnit={timeUnit}
          currentValue={getTimeUnitValue(timeUnit)}
        />
      ))}
    </div>
  );
};

export default React.memo(Clock);
