'use client'

/* eslint-disable  */

import type { KeyboardEvent } from 'react'
import { useCallback, useRef, useState } from 'react'

import { Command as CommandPrimitive } from 'cmdk'
import { X as RemoveIcon } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import {
  Command,
  CommandItem,
  CommandEmpty,
  CommandList,
} from '@/components/ui/command'
import { cn } from '@/lib/utils'

type Options = {
  value: string
  label: string
  disabled?: boolean
}

interface MultiSelectProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string[]
  onValueChange: (value: string[]) => void
  options: Options[]
}

export const MultiSelect = ({
  options,
  onValueChange,
  value,
}: MultiSelectProps) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [inputValue, setInputValue] = useState('')
  const [open, setOpen] = useState<boolean>(false)

  const selectOption = useCallback(
    (e: any) => {
      onValueChange([...value, e])
    },
    [value],
  )

  const removeOption = useCallback(
    (e: any) => {
      onValueChange(value.filter((item) => item !== e))
    },
    [value],
  )

  const removeOptionWithBackspace = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if ((e.key === 'Backspace' || e.key === 'Delete') && value.length > 0) {
        if (inputValue.length === 0) {
          onValueChange(
            value.filter((item) => item !== value[value.length - 1]),
          )
        }
      } else if (e.key === 'Enter') {
        setOpen(true)
      } else if (e.key === 'Escape') {
        setOpen(false)
      }
    },
    [value, inputValue],
  )

  const mousePreventDefault = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }, [])

  const notSelected = options.filter((item) => !value.includes(item.value))

  return (
    <Command
      className="flex flex-col gap-2 overflow-visible "
      onKeyDown={removeOptionWithBackspace}
    >
      <div
        className="border-muted flex flex-wrap gap-1 rounded-lg border p-1 py-2"
        ref={containerRef}
      >
        {value.map((item) => (
          <Badge
            key={item}
            className="flex items-center gap-1 rounded-xl px-1"
            variant="secondary"
          >
            <span className="text-xs">{item}</span>
            <button
              aria-label={`Remove ${item} option`}
              aria-roledescription="button to remove option"
              type="button"
              onMouseDown={mousePreventDefault}
              onClick={() => {
                removeOption(item)
                setOpen(true)
              }}
            >
              {' '}
              <RemoveIcon className="hover:stroke-destructive h-4 w-4" />
            </button>
          </Badge>
        ))}
        <CommandPrimitive.Input
          className="placeholder:text-muted-foreground ml-2 flex-1 bg-transparent outline-none"
          placeholder="Select frameworks..."
          ref={inputRef}
          value={inputValue}
          onBlur={() => setOpen(false)}
          onFocus={() => setOpen(true)}
          onValueChange={setInputValue}
        />
      </div>
      <div className="relative">
        {open && notSelected.length > 0 && (
          <CommandList className="scrollbar-thin scrollbar-track-transparent scrollbar-thumb-muted-foreground dark:scrollbar-thumb-muted scrollbar-thumb-rounded-lg border-muted bg-background absolute top-0 z-10 flex w-full flex-col gap-2 rounded-md border p-2 shadow-md transition-colors">
            {notSelected.map((option) => (
              <CommandItem
                key={option.value}
                disabled={option.disabled}
                className={cn(
                  'cursor-pointer rounded-md px-2 py-1 transition-colors ',
                  option.disabled && 'cursor-default opacity-50',
                )}
                onMouseDown={mousePreventDefault}
                onSelect={() => {
                  selectOption(option.value)
                  setInputValue('')
                }}
              >
                {option.label}
              </CommandItem>
            ))}
            <CommandEmpty>
              <span className="text-muted-foreground">No results found</span>
            </CommandEmpty>
          </CommandList>
        )}
      </div>
    </Command>
  )
}
