'use client'

import type { FC } from 'react'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useMedia } from 'react-use'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const generateTopItems = (
  step: number,
): {
  value: string
  label: string
}[] => {
  const items = [
    {
      value: `1-${step}`,
      label: `Top ${step.toString()}`,
    },
  ]
  for (let i = step * 2; i <= 1000; i += step) {
    items.push({
      value: `${i - step + 1}-${i}`,
      label: `${i - step + 1} – ${i}`,
    })
  }
  return items
}

export const TopSelect: FC = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const top = searchParams.get('top') || '100'
  const isMobile = useMedia('(max-width: 768px)')

  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('top', value)
    router.replace(`${pathname}?${params.toString()}`)
  }

  return (
    <Select value={top} onValueChange={handleChange}>
      <SelectTrigger className="w-[120px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {generateTopItems(isMobile ? 50 : 100).map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
