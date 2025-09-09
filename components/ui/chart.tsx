"use client"

import * as React from "react"
import * as RechartsPrimitive from "recharts"
import { cn } from "@/lib/utils"

// Helper function to filter out recharts-specific props
const filterRechartsProps = (props: any) => {
  const {
    // Chart-specific props
    iconSize,
    itemSorter,
    chartWidth,
    chartHeight,
    // Style props
    itemStyle,
    wrapperStyle,
    labelStyle,
    tickStyle,
    axisLineStyle,
    tickLineStyle,
    gridLineStyle,
    dotStyle,
    lineStyle,
    barStyle,
    pieStyle,
    cellStyle,
    // Animation props
    animationBegin,
    animationDuration,
    animationEasing,
    // Other recharts props
    dataKey,
    valueKey,
    // Additional common recharts props that might leak to DOM
    activeIndex,
    activeShape,
    activeDot,
    allowDataOverflow,
    allowEscapeViewBox,
    angle,
    angleAxisId,
    animationId,
    axisId,
    baseValue,
    brushData,
    brushIndex,
    brushValue,
    connectNulls,
    contentStyle,
    coordinate,
    cornerRadius,
    cursor,
    cx,
    cy,
    data,
    dataMax,
    dataMin,
    defaultShowTooltip,
    dot,
    endAngle,
    fill,
    fillOpacity,
    filter,
    formatter,
    height,
    hide,
    innerRadius,
    isAnimationActive,
    isUpdateAnimationActive,
    label,
    labelLine,
    layout,
    left,
    legendType,
    margin,
    maxBarSize,
    minPointSize,
    name,
    onAnimationEnd,
    onAnimationStart,
    onAnimationComplete,
    onMouseEnter,
    onMouseLeave,
    onMouseMove,
    onClick,
    onMouseDown,
    onMouseUp,
    onTouchStart,
    onTouchMove,
    onTouchEnd,
    orientation,
    outerRadius,
    paddingAngle,
    payload,
    points,
    radius,
    r,
    range,
    reversed,
    right,
    scale,
    shape,
    showLabel,
    startAngle,
    stroke,
    strokeDasharray,
    strokeDashoffset,
    strokeLinecap,
    strokeLinejoin,
    strokeMiterlimit,
    strokeOpacity,
    strokeWidth,
    style,
    textAnchor,
    textBreakAll,
    top,
    type,
    unit,
    value,
    valueAccessor,
    viewBox,
    width,
    x,
    xAxisId,
    y,
    yAxisId,
    zAxisId,
    // Additional props that might cause DOM warnings
    allowDecimals,
    allowDuplicatedCategory,
    allowReorder,
    animationDelay,
    axisType,
    bandSize,
    baseLine,
    breakAll,
    breakWords,
    capIsRound,
    categoryGap,
    clockWise,
    crossAxis,
    crossAxisId,
    defaultIndex,
    domain,
    fontSize,
    fontWeight,
    gap,
    horizontal,
    includeHidden,
    interval,
    nameKey,
    offset,
    ...filteredProps
  } = props

  return filteredProps
}

// Re-export all recharts components
export * from "recharts"

// Export specific recharts components for easier imports
export {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  LineChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  Legend
} from "recharts"

const ChartContainer = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    config: Record<string, any>
  }
>(({ className, children, config, ...props }, ref) => {
  const filteredProps = filterRechartsProps(props)

  return (
    <div
      ref={ref}
      className={cn("flex justify-center text-xs", className)}
      {...filteredProps}
    >
      <RechartsPrimitive.ResponsiveContainer width="100%" height="100%">
        {children as React.ReactElement}
      </RechartsPrimitive.ResponsiveContainer>
    </div>
  )
})
ChartContainer.displayName = "ChartContainer"

const ChartTooltip = RechartsPrimitive.Tooltip

const ChartTooltipContent = React.forwardRef<
  HTMLDivElement,
  any
>(
  (
    {
      active,
      payload,
      className,
      label,
      ...props
    },
    ref
  ) => {
    if (!active || !payload?.length) {
      return null
    }

    const [item] = payload
    const filteredProps = filterRechartsProps(props)

    return (
      <div
        ref={ref}
        className={cn(
          "grid min-w-[6rem] items-start gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs shadow-lg dark:border-slate-800 dark:bg-slate-950",
          className
        )}
        {...filteredProps}
      >
        <div className="grid gap-1.5">
          <div className="font-medium text-slate-900">{label}</div>
          <div className="flex items-center gap-2">
            <div
              className="h-2.5 w-2.5 shrink-0 rounded-full"
              style={{
                backgroundColor: item.color,
              }}
            />
            <span className="text-slate-600 font-medium">
              {item.name || item.dataKey}: {item.value}
            </span>
          </div>
        </div>
      </div>
    )
  }
)
ChartTooltipContent.displayName = "ChartTooltipContent"

const ChartLegend = RechartsPrimitive.Legend

const ChartLegendContent = React.forwardRef<
  HTMLDivElement,
  any
>(
  (
    {
      className,
      hideIcon = false,
      payload,
      verticalAlign = "bottom",
      align = "center",
      nameKey,
      ...props
    },
    ref
  ) => {
    if (!payload?.length) {
      return null
    }

    const filteredProps = filterRechartsProps(props)

    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center justify-center gap-4",
          verticalAlign === "top" ? "pb-3" : "pt-3",
          className
        )}
        {...filteredProps}
      >
        {payload.map((item: any) => {
          const key = nameKey || item.value || item.dataKey || "value"

          return (
            <div
              key={item.value}
              className={cn(
                "flex items-center gap-1.5 [&>svg]:h-3 [&>svg]:w-3 [&>svg]:text-muted-foreground"
              )}
            >
              {!hideIcon && (
                <div
                  className="h-2 w-2 shrink-0 rounded-[2px]"
                  style={{
                    backgroundColor: item.color,
                  }}
                />
              )}
              {key}
            </div>
          )
        })}
      </div>
    )
  }
)
ChartLegendContent.displayName = "ChartLegendContent"

export {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
}
