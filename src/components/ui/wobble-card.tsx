import React, { useState } from 'react'
import { motion } from 'motion/react'
import { cn } from '../../lib/utils'

export const WobbleCard = ({
  children,
  containerClassName,
  className,
}: {
  children: React.ReactNode
  containerClassName?: string
  className?: string
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    const { clientX, clientY } = event
    const rect = event.currentTarget.getBoundingClientRect()
    const x = (clientX - (rect.left + rect.width / 2)) / 20
    const y = (clientY - (rect.top + rect.height / 2)) / 20
    setMousePosition({ x, y })
  }

  return (
    <motion.section
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false)
        setMousePosition({ x: 0, y: 0 })
      }}
      style={{
        transform: isHovered
          ? `perspective(1000px) rotateX(${-mousePosition.y}deg) rotateY(${mousePosition.x}deg) scale3d(1.01, 1.01, 1.01)`
          : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
        transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s ease-in-out',
      }}
      className={cn(
        'mx-auto w-full bg-[#141b18] relative rounded-[28px] overflow-hidden select-none wobble-card-container wobble-card-noise border border-white/10 shadow-2xl',
        containerClassName
      )}
    >
      <div
        className="relative h-full [background-image:radial-gradient(88%_100%_at_top,rgba(255,255,255,0.05),rgba(255,255,255,0))] sm:mx-0 sm:rounded-2xl overflow-hidden"
      >
        <motion.div
          style={{
            transform: isHovered
              ? `translate3d(${-mousePosition.x}px, ${-mousePosition.y}px, 0) scale3d(1.02, 1.02, 1)`
              : 'translate3d(0px, 0px, 0) scale3d(1, 1, 1)',
            transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s ease-in-out',
          }}
          className={cn('h-full px-4 py-6 sm:px-8', className)}
        >
          {children}
        </motion.div>
      </div>
    </motion.section>
  )
}
