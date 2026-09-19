import React, { createContext, useContext, useState } from 'react'
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
      <div className={cn('space-y-3 sm:space-y-3.5', className)}>{children}</div>
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
        'bg-white border border-[#dedcd6] hover:border-[#1c2623]/30 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-[border-color,box-shadow] duration-200',
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
        'w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer select-none transition-colors duration-150 hover:bg-[#fbf9f1]/70 group touch-manipulation',
        className
      )}
    >
      <div className="text-sm font-bold text-[#1c2623] group-hover:text-[#ea580c] transition-colors leading-snug">
        {children}
      </div>
      <div
        className={cn(
          'shrink-0 text-[#576560] group-hover:text-[#ea580c] transition-transform duration-300 ease-out',
          isOpen && 'rotate-45 text-[#ea580c]'
        )}
      >
        <Plus className="w-5 h-5" />
      </div>
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
    <div
      className={cn(
        'grid transition-[grid-template-rows,opacity] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]',
        isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
      )}
    >
      <div className="overflow-hidden">
        <div className={cn('px-4 pb-4 sm:px-5 sm:pb-5 text-xs sm:text-sm text-[#576560] leading-relaxed', className)}>
          {children}
        </div>
      </div>
    </div>
  )
}
