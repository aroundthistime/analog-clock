import { type TimeUnit } from './types';

/**
 * Maximum value that the time unit can have
 */
export const TIME_UNIT_MAX_VALUE: Record<TimeUnit, number> = {
  hour: 12,
  minute: 60,
  second: 60
};
