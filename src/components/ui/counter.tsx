import React, { useEffect, useRef, useState } from 'react'
import { cn } from '../../lib/utils'

interface CounterProps {
  target: number
  duration?: number
  suffix?: string
  className?: string
  label?: string
}

export const Counter: React.FC<CounterProps> = ({
  target,
  duration = 1600,
  suffix = '',
  className,
  label,
}) => {
  const [count, setCount] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    let animationFrameId: number
    let startTime: number | null = null

    const startAnimation = () => {
      startTime = null
      const update = (now: number) => {
        if (!startTime) startTime = now
        const elapsed = now - startTime
        const progress = Math.min(elapsed / duration, 1)
        // Cubic ease-out
        const easeOut = 1 - Math.pow(1 - progress, 3)
        const current = Math.round(target * easeOut)
        setCount(current)

        if (progress < 1) {
          animationFrameId = requestAnimationFrame(update)
        } else {
          setCount(target)
        }
      }
      animationFrameId = requestAnimationFrame(update)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            startAnimation()
          } else {
            // Reset to 0 when scrolled out of view to allow bidirectional re-animation
            setCount(0)
            cancelAnimationFrame(animationFrameId)
          }
        })
      },
      { threshold: 0.3 }
    )

    observer.observe(el)

    return () => {
      observer.disconnect()
      cancelAnimationFrame(animationFrameId)
    }
  }, [target, duration])

  return (
    <div ref={containerRef} className={cn('text-left', className)}>
      <div className="text-3xl sm:text-4xl font-extrabold text-[#1c2623] tracking-tight tabular-nums">
        <span>{count}</span>
        {suffix && <span className="text-xs font-semibold text-[#576560] ml-1">{suffix}</span>}
      </div>
      {label && <div className="text-[11px] text-[#576560] mt-0.5 font-medium">{label}</div>}
    </div>
  )
}
