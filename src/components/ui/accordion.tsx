import React, { createContext, useContext, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Plus } from 'lucide-react'
import { cn } from '../../lib/utils'

interface AccordionContextType {
  openItems: string[]
  toggleItem: (value: string) => void
}

const AccordionContext = createContext<AccordionContextType | undefined>(undefined)

export const Accordion: React.FC<{
  children: React.ReactNode
  className?: string
  defaultOpen?: string[]
}> = ({ children, className, defaultOpen = [] }) => {
  const [openItems, setOpenItems] = useState<string[]>(defaultOpen)

  const toggleItem = (value: string) => {
    setOpenItems((prev) =>
      prev.includes(value) ? prev.filter((i) => i !== value) : [...prev, value]
    )
  }

  return (
    <AccordionContext.Provider value={{ openItems, toggleItem }}>
      <div className={cn('space-y-3.5', className)}>{children}</div>
    </AccordionContext.Provider>
  )
}

export const AccordionItem: React.FC<{
  value: string
  children: React.ReactNode
  className?: string
}> = ({ value, children, className }) => {
  return (
    <div
      data-item-value={value}
      className={cn(
        'bg-white border border-[#dedcd6] hover:border-[#1c2623]/30 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-300',
        className
      )}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { itemValue: value } as any)
        }
        return child
      })}
    </div>
  )
}

export const AccordionTrigger: React.FC<{
  itemValue?: string
  children: React.ReactNode
  className?: string
}> = ({ itemValue, children, className }) => {
  const ctx = useContext(AccordionContext)
  if (!ctx || !itemValue) return null

  const isOpen = ctx.openItems.includes(itemValue)

  return (
    <button
      type="button"
      onClick={() => ctx.toggleItem(itemValue)}
      className={cn(
        'w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer select-none transition-all duration-200 hover:bg-[#fbf9f1]/70 group',
        className
      )}
    >
      <div className="text-sm font-bold text-[#1c2623] group-hover:text-[#ea580c] transition-colors">
        {children}
      </div>
      <motion.div
        animate={{ rotate: isOpen ? 45 : 0 }}
        transition={{ duration: 0.25, ease: 'easeInOut' }}
        className="shrink-0 text-[#576560] group-hover:text-[#ea580c] group-hover:scale-110 transition-all"
      >
        <Plus className="w-5 h-5" />
      </motion.div>
    </button>
  )
}

export const AccordionContent: React.FC<{
  itemValue?: string
  children: React.ReactNode
  className?: string
}> = ({ itemValue, children, className }) => {
  const ctx = useContext(AccordionContext)
  if (!ctx || !itemValue) return null

  const isOpen = ctx.openItems.includes(itemValue)

  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          key="content"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="overflow-hidden"
        >
          <div className={cn('px-5 pb-5 text-xs text-[#576560] leading-relaxed', className)}>
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
