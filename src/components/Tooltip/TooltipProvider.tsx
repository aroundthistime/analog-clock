import React, { type PropsWithChildren, useState, type RefObject, createContext, useMemo, useContext } from 'react';
import ReactDOM from 'react-dom';
import { type TooltipContext as TooltipContextType } from './types';
import TooltipWrapper from './TooltipWrapper';

const TooltipContext = createContext<TooltipContextType>({
  registerTooltip: () => {},
  deregisterTooltip: () => {}
});

/**
 * Provider component for sharing contexts about Tooltip components.
 * Tooltip features would not work properly unless highest level component (eg. App) is wrapped by this provider.
 */
const TooltipProvider = ({ children }: PropsWithChildren) => {
  // Key: UUID / value: Tooltip JSX element
  const [tooltipMap, setTooltipMap] = useState<Map<string, JSX.Element>>(new Map());
  const Tooltips = useMemo(() => Array.from(tooltipMap.values()), [tooltipMap]);

  const registerTooltip = (uuid: string, tooltipRef: RefObject<HTMLDivElement>, tooltipContent: React.ReactNode) => {
    const CreatedTooltip = (
        <TooltipWrapper ref={tooltipRef} key={uuid}>
            {tooltipContent}
        </TooltipWrapper>
    );

    setTooltipMap(prev => (
      new Map(prev.set(uuid, CreatedTooltip))
    ));

    return tooltipRef;
  };

  const deregisterTooltip = (uuid: string) => {
    setTooltipMap(prev => {
      const updatedMap = new Map(prev);
      updatedMap.delete(uuid);
      return updatedMap;
    });
  };

  const context: TooltipContextType = useMemo(() => ({
    registerTooltip,
    deregisterTooltip
  }), [tooltipMap]);

  return (
    <TooltipContext.Provider value={context}>
        {children}
        {Tooltips.map(Tooltip => (
          ReactDOM.createPortal(
            Tooltip,
            document.body
          )
        ))}
    </TooltipContext.Provider>
  );
};

export const useTooltipContext = () => {
  return useContext(TooltipContext);
};

export default TooltipProvider;
