'use client'

/* eslint-disable  */

import type { KeyboardEvent } from 'react'
import React, {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useState,
} from 'react'

import { Command as CommandPrimitive } from 'cmdk'
import { X as RemoveIcon, Check } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import {
  Command,
  CommandItem,
  CommandEmpty,
  CommandList,
} from '@/components/ui/command'
import { cn } from '@/lib/utils'

type MultiSelectorProps = {
  value: string[]
  onValueChange: (value: string[]) => void
  loop?: boolean
} & React.HTMLAttributes<HTMLDivElement>

type MultiSelectContextProps = {
  value: string[]
  onValueChange: (value: any) => void
  open: boolean
  setOpen: (value: boolean) => void
  inputValue: string
  setInputValue: React.Dispatch<React.SetStateAction<string>>
  activeIndex: number
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>
}

const MultiSelectContext = createContext<MultiSelectContextProps | null>(null)

const useMultiSelect = () => {
  const context = useContext(MultiSelectContext)
  if (!context) {
    throw new Error('useMultiSelect must be used within MultiSelectProvider')
  }
  return context
}

const MultiSelector = ({
  value,
  onValueChange,
  loop = false,
  className,
  children,
}: MultiSelectorProps) => {
  const [inputValue, setInputValue] = useState('')
  const [open, setOpen] = useState<boolean>(false)
  const [activeIndex, setActiveIndex] = useState<number>(-1)

  const onValueChangeHandler = useCallback(
    (val: string) => {
      if (value.includes(val)) {
        onValueChange(value.filter((item) => item !== val))
      } else {
        onValueChange([...value, val])
      }
    },
    [value],
  )

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if ((e.key === 'Backspace' || e.key === 'Delete') && value.length > 0) {
        if (inputValue.length === 0) {
          if (activeIndex !== -1 && activeIndex < value.length) {
            onValueChange(value.filter((item) => item !== value[activeIndex]))
            const newIndex = activeIndex - 1 < 0 ? 0 : activeIndex - 1
            setActiveIndex(newIndex)
          } else {
            onValueChange(
              value.filter((item) => item !== value[value.length - 1]),
            )
          }
        }
      } else if (e.key === 'Enter') {
        setOpen(true)
      } else if (e.key === 'Escape') {
        if (activeIndex !== -1) {
          setActiveIndex(-1)
        } else {
          setOpen(false)
        }
      } else if (e.key === 'ArrowLeft') {
        const index = activeIndex - 1
        setActiveIndex(index < 0 ? value.length - 1 : index)
      } else if (e.key === 'ArrowRight' && (activeIndex !== -1 || loop)) {
        const index = activeIndex + 1
        setActiveIndex(index > value.length - 1 ? (loop ? 0 : -1) : index)
      }
    },
    [value, inputValue, activeIndex, loop],
  )

  return (
    <MultiSelectContext.Provider
      value={{
        value,
        onValueChange: onValueChangeHandler,
        open,
        setOpen,
        inputValue,
        setInputValue,
        activeIndex,
        setActiveIndex,
      }}
    >
      <Command
        className={cn(
          'flex flex-col gap-2 overflow-visible bg-transparent',
          className,
        )}
        onKeyDown={handleKeyDown}
      >
        {children}
      </Command>
    </MultiSelectContext.Provider>
  )
}

const MultiSelectorTrigger = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  const { value, onValueChange, activeIndex } = useMultiSelect()

  const mousePreventDefault = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }, [])

  return (
    <div
      ref={ref}
      className={cn(
        'border-muted flex flex-wrap gap-1 rounded-lg border p-1 py-2',
        className,
      )}
      {...props}
    >
      {value.map((item, index) => (
        <Badge
          key={item}
          variant="secondary"
          className={cn(
            'flex items-center gap-1 rounded-xl px-1',
            activeIndex === index && 'ring-muted-foreground ring-2 ',
          )}
        >
          <span className="text-xs">{item}</span>
          <button
            aria-label={`Remove ${item} option`}
            aria-roledescription="button to remove option"
            type="button"
            onClick={() => onValueChange(item)}
            onMouseDown={mousePreventDefault}
          >
            <span className="sr-only">Remove {item} option</span>
            <RemoveIcon className="hover:stroke-destructive h-4 w-4" />
          </button>
        </Badge>
      ))}
      {children}
    </div>
  )
})

MultiSelectorTrigger.displayName = 'MultiSelectorTrigger'

const MultiSelectorInput = forwardRef<
  React.ElementRef<typeof CommandPrimitive.Input>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>
>(({ className, ...props }, ref) => {
  const { setOpen, inputValue, setInputValue, activeIndex, setActiveIndex } =
    useMultiSelect()
  return (
    <CommandPrimitive.Input
      {...props}
      ref={ref}
      value={inputValue}
      className={cn(
        'placeholder:text-muted-foreground ml-2 flex-1 bg-transparent outline-none',
        className,
        activeIndex !== -1 && 'caret-transparent',
      )}
      onBlur={() => setOpen(false)}
      onClick={() => setActiveIndex(-1)}
      onFocus={() => setOpen(true)}
      onValueChange={activeIndex === -1 ? setInputValue : undefined}
    />
  )
})

MultiSelectorInput.displayName = 'MultiSelectorInput'

const MultiSelectorContent = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ children }, ref) => {
  const { open } = useMultiSelect()
  return (
    <div className="relative" ref={ref}>
      {children}
    </div>
  )
})

MultiSelectorContent.displayName = 'MultiSelectorContent'

const MultiSelectorList = forwardRef<
  React.ElementRef<typeof CommandPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.List>
>(({ className, children }, ref) => {
  return (
    <CommandList
      ref={ref}
      className={cn(
        'scrollbar-thin scrollbar-track-transparent scrollbar-thumb-muted-foreground dark:scrollbar-thumb-muted scrollbar-thumb-rounded-lg border-muted bg-background absolute top-0 z-10 flex w-full flex-col gap-2 rounded-md border p-2 shadow-md transition-colors',
        className,
      )}
    >
      {children}
      <CommandEmpty>
        <span className="text-muted-foreground">No results found</span>
      </CommandEmpty>
    </CommandList>
  )
})

MultiSelectorList.displayName = 'MultiSelectorList'

const MultiSelectorItem = forwardRef<
  React.ElementRef<typeof CommandPrimitive.Item>,
  { value: string } & React.ComponentPropsWithoutRef<
    typeof CommandPrimitive.Item
  >
>(({ className, value, children, ...props }, ref) => {
  const { value: Options, onValueChange, setInputValue } = useMultiSelect()

  const mousePreventDefault = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }, [])

  const isIncluded = Options.includes(value)
  return (
    <CommandItem
      ref={ref}
      {...props}
      className={cn(
        'flex cursor-pointer justify-between rounded-md px-2 py-1 transition-colors ',
        className,
        isIncluded && 'cursor-default opacity-50',
        props.disabled && 'cursor-not-allowed opacity-50',
      )}
      onMouseDown={mousePreventDefault}
      onSelect={() => {
        onValueChange(value)
        setInputValue('')
      }}
    >
      {children}
      {isIncluded && <Check className="h-4 w-4" />}
    </CommandItem>
  )
})

MultiSelectorItem.displayName = 'MultiSelectorItem'

export {
  MultiSelector,
  MultiSelectorTrigger,
  MultiSelectorInput,
  MultiSelectorContent,
  MultiSelectorList,
  MultiSelectorItem,
}
