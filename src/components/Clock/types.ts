/**
 * Units used to represent time in clock
 */
export const TIME_UNITS = ['hour', 'minute', 'second'] as const;

export type TimeUnit = typeof TIME_UNITS[number];
