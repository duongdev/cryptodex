import * as React from 'react'

import { CheckIcon, PlusCircleIcon } from 'lucide-react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
} from '@/components/ui/command'
import { Separator } from '@/components/ui/separator'

interface ExchangeFilterProps<T> {
  title?: string
  options: {
    label: string
    value: T
    icon?: React.ComponentType<{ className?: string }>
  }[]
  selected?: T[]
  onSelect?: (values: T[]) => void
  className?: string
  disabled?: boolean
  icon?: React.ReactNode | false
}

export function ExchangeFilter<T>({
  title,
  options,
  selected = [],
  onSelect,
  className,
  disabled,
  icon,
}: ExchangeFilterProps<T>) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          disabled={disabled}
          size="sm"
          variant="outline"
          className={cn(
            'h-10 border',
            // selected?.length > 0 ? 'border' : 'border-dashed',
            className,
          )}
        >
          {icon || <PlusCircleIcon className="mr-2 h-4 w-4" />}
          {title}
          {selected?.length > 0 && (
            <>
              <Separator className="mx-2 h-4" orientation="vertical" />

              <div className="flex gap-0.5">
                {selected.length > 5 ? (
                  <Badge
                    className="rounded-sm px-1 font-normal"
                    variant="secondary"
                  >
                    {selected.length} selected
                  </Badge>
                ) : (
                  options
                    .filter((option) => selected.includes(option.value))
                    .map(({ icon: Icon, value }) => (
                      // @ts-expect-error
                      <Icon
                        key={value as string}
                        className="h-4 w-4 shrink-0"
                      />
                    ))
                )}
              </div>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder={title} />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => {
                const isSelected = selected.includes(option.value)
                return (
                  <CommandItem
                    key={option.value as string}
                    onSelect={() => {
                      if (isSelected) {
                        onSelect?.(selected.filter((v) => v !== option.value))
                      } else {
                        onSelect?.([...selected, option.value])
                      }
                    }}
                    className="!pointer-events-auto !cursor-default !opacity-100"
                  >
                    <div
                      className={cn(
                        'mr-2 flex h-4 w-4 items-center justify-center rounded-[4px] border border-primary',
                        isSelected
                          ? 'bg-primary text-primary-foreground'
                          : 'opacity-50 [&_svg]:invisible',
                      )}
                    >
                      <CheckIcon className={cn('h-4 w-4')} />
                    </div>
                    {option.icon && (
                      <option.icon className="mr-2 text-muted-foreground" />
                    )}
                    <span>{option.label}</span>
                  </CommandItem>
                )
              })}
            </CommandGroup>
            {selected.length > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    className="!pointer-events-auto !cursor-default justify-center text-center !opacity-100"
                    onSelect={() => onSelect?.([])}
                  >
                    Clear filters
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
