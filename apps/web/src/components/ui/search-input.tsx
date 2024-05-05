'use client'

import { cn } from "@/lib/utils"
import { Search, X } from "lucide-react"
import { ChangeEvent, FC, InputHTMLAttributes, useEffect, useRef, useState } from "react"
import { Button } from "./button"
import { Input } from "./input"

export type SearchInputProps = {
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
} & InputHTMLAttributes<HTMLInputElement>

const SearchInput: FC<SearchInputProps> = ({
  placeholder,
  value,
  onChange,
}) => {
  const [searchValue, setSearchValue] = useState(value)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (value) {
      setSearchValue(value)
    }
  }, [value])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
    onChange?.(e.target.value)
  }

  const handleClear = () => {
    setSearchValue('')
    onChange?.('')
    inputRef.current?.focus()
  }

  return (
    <div className="relative">
      <Search className="text-muted-foreground absolute left-3 top-1/2 size-5 -translate-y-1/2 transform" />
      <Input
        required
        placeholder={placeholder}
        ref={inputRef}
        value={searchValue}
        className={cn(
          'peer h-9 w-56 max-w-full pl-9 pr-7',
          'transition-[width] valid:w-64',
        )}
        onChange={handleChange}
      />
      <Button
        className="text-muted-foreground hover:text-foreground invisible absolute right-2 top-1/2 -translate-y-1/2 transition-colors peer-valid:visible"
        size={null}
        variant="ghost"
        onClick={handleClear}
      >
        <X className="size-4" />
      </Button>
    </div>
  )
}
SearchInput.displayName = 'SearchInput'

export { Input, SearchInput }