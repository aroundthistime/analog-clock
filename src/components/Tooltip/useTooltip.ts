import { useCallback, useEffect, useId, useRef } from 'react';
import { useTooltipContext } from './TooltipProvider';

/**
 * Hook for creating and controlling a tooltip to the system
 * @param {React.MutableRefObject} targetRef Reference to the element deciding the visibility of the tooltip
 */
export const useTooltip = <T extends HTMLElement>(targetRef: React.MutableRefObject<T>) => {
  const tooltipRef = useRef<HTMLDivElement>(null);
  const { registerTooltip, deregisterTooltip } = useTooltipContext();
  const uuid = useId();

  /**
   * Add tooltip based on the content
   * @param {React.ReactNode} tooltipContent Content to fill in the tooltip
   */
  const addTooltip = useCallback((tooltipContent: React.ReactNode) => {
    registerTooltip(uuid, tooltipRef, tooltipContent);

    targetRef.current.addEventListener('pointerenter', onTargetPointerEnter);
    targetRef.current.addEventListener('pointerleave', onTargetPointerLeave);
  }, [registerTooltip, targetRef]);

  /**
   * Delete the created tooltip
   */
  const deleteTooltip = useCallback(() => {
    deregisterTooltip(uuid);
  }, [deregisterTooltip]);

  /**
   * Update content of the previously created tooltip
   * @param {React.ReactNode} updatedTooltipContent New content to apply to the tooltip
   */
  const updateTooltipContent = useCallback((updatedTooltipContent: React.ReactNode) => {
    addTooltip(updatedTooltipContent);
  }, [addTooltip]);

  const onTargetPointerEnter = useCallback(() => {
    if (!tooltipRef.current) return;

    tooltipRef.current.style.display = 'block';
    targetRef.current.addEventListener('pointermove', onTargetPointerMove);
  }, [targetRef]);

  const onTargetPointerLeave = useCallback(() => {
    if (!tooltipRef.current) return;

    tooltipRef.current.style.display = 'none';
    targetRef.current.removeEventListener('pointermove', onTargetPointerMove);
  }, [targetRef]);

  const onTargetPointerMove = useCallback((event: MouseEvent) => {
    if (!tooltipRef.current) return;

    // Offset between the cursor and the tooltip (in px)
    const TOOLTIP_OFFSET = 5;

    const x = event.clientX + TOOLTIP_OFFSET;
    const y = event.clientY + TOOLTIP_OFFSET - tooltipRef.current.clientHeight;

    tooltipRef.current.style.transform = `translate(${x}px, ${y}px)`;
  }, []);

  useEffect(() => {
    return () => {
      if (tooltipRef.current) {
        deleteTooltip();
      }
    };
  }, []);

  return {
    addTooltip,
    deleteTooltip,
    updateTooltipContent
  };
};
