import React from 'react';
import { type TimeUnit } from '../types';
import { TIME_UNIT_MAX_VALUE } from '../constant';
import styles from './index.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const ClockHand = ({ timeUnit, currentValue }: Props) => {
  /**
   * Get how much clock hand should be rotated for current time
   * @returns {number} Rotation degrees between 0 and 360
   */
  const getRotation = (): number => {
    const MAX_DEGREE = 360;

    const maxValue = TIME_UNIT_MAX_VALUE[timeUnit];

    /**
     * Remainder operation is required because hour has range of 0~24,
     * while analog clock has to render in range of 0~12
     */
    return (currentValue % maxValue) / maxValue * MAX_DEGREE;
  };

  return (
    <div
      className={cx('clock-hand', `clock-hand--${timeUnit}`)}
      style={{ transform: `rotateZ(${getRotation()}deg)` }}
    />
  );
};

interface Props {
  timeUnit: TimeUnit
  currentValue: number
}

export default React.memo(ClockHand);
