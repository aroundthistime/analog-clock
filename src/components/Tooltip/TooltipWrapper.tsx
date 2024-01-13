import React, { type PropsWithChildren } from 'react';
import classNames from 'classnames/bind';
import styles from './TooltipWrapper.module.scss';

const cx = classNames.bind(styles);

/**
 * Tooltip component.
 * This component only involves in the visibility and the location of the tooltip.
 * The rest (including the content) should be decided by its children
 */
const TooltipWrapper = React.forwardRef<HTMLDivElement, PropsWithChildren>(({ children }, ref) => {
  return (
    <div ref={ref} className={cx('tooltip')}>
        {children}
    </div>
  );
});

TooltipWrapper.displayName = 'TooltipWrapper';

export default React.memo(TooltipWrapper);
