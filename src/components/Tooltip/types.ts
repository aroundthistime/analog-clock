export interface TooltipContext {
  registerTooltip: (uuid: string, tooltipRef: React.RefObject<HTMLDivElement>, tooltipContent: React.ReactNode) => void
  deregisterTooltip: (uuid: string) => void
}
