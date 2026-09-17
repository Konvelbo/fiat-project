import React from 'react'
import { Check } from 'lucide-react'
import { cn } from '../../lib/utils'

interface Step {
  id: number
  title: string
  subtitle: string
}

interface StepperProps {
  steps: Step[]
  currentStep: number
  className?: string
}

export const Stepper: React.FC<StepperProps> = ({ steps, currentStep, className }) => {
  return (
    <div className={cn('flex items-center justify-between mb-6 pb-5 border-b border-[#dedcd6]', className)}>
      {steps.map((step, index) => {
        const isCompleted = step.id < currentStep
        const isCurrent = step.id === currentStep

        return (
          <React.Fragment key={step.id}>
            <div className={cn('flex items-center gap-2.5', !isCompleted && !isCurrent && 'opacity-40')}>
              <div
                className={cn(
                  'w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold transition-all duration-300',
                  isCompleted && 'bg-[#1c2623] text-white',
                  isCurrent && 'bg-[#ea580c] text-white shadow-sm shadow-orange-500/30',
                  !isCompleted && !isCurrent && 'bg-[#dedcd6] text-[#1c2623]'
                )}
              >
                {isCompleted ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : step.id}
              </div>
              <div>
                <div className="text-xs font-bold text-[#1c2623]">{step.title}</div>
                <div className="text-[10px] text-[#576560]">{step.subtitle}</div>
              </div>
            </div>

            {index < steps.length - 1 && (
              <div className="w-8 h-px bg-[#dedcd6] hidden sm:block" />
            )}
          </React.Fragment>
        )
      })}
    </div>
  )
}
