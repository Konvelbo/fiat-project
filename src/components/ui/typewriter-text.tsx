import React, { useState, useEffect } from 'react'
import { cn } from '../../lib/utils'

interface TypewriterTextProps {
  words: string[]
  typingSpeed?: number
  deletingSpeed?: number
  pauseDuration?: number
  className?: string
  cursorClassName?: string
}

export const TypewriterText: React.FC<TypewriterTextProps> = ({
  words,
  typingSpeed = 80,
  deletingSpeed = 45,
  pauseDuration = 1800,
  className,
  cursorClassName,
}) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [currentText, setCurrentText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const word = words[currentWordIndex]

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          // Typing
          if (currentText.length < word.length) {
            setCurrentText(word.slice(0, currentText.length + 1))
          } else {
            // Finished typing, pause then start deleting
            setTimeout(() => setIsDeleting(true), pauseDuration)
          }
        } else {
          // Deleting
          if (currentText.length > 0) {
            setCurrentText(word.slice(0, currentText.length - 1))
          } else {
            // Finished deleting, move to next word
            setIsDeleting(false)
            setCurrentWordIndex((prev) => (prev + 1) % words.length)
          }
        }
      },
      isDeleting ? deletingSpeed : typingSpeed
    )

    return () => clearTimeout(timeout)
  }, [currentText, isDeleting, currentWordIndex, words, typingSpeed, deletingSpeed, pauseDuration])

  return (
    <span className={cn('inline-flex items-baseline', className)}>
      <span>{currentText}</span>
      <span
        className={cn(
          'inline-block w-[3px] h-[0.9em] ml-1 bg-[#ea580c] align-middle animate-pulse',
          cursorClassName
        )}
      />
    </span>
  )
}
