'use client'

import type { FC } from 'react'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export const TopSelect: FC = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const top = searchParams.get('top') || '100'

  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('top', value)
    router.replace(`${pathname}?${params.toString()}`)
  }

  return (
    <Select value={top} onValueChange={handleChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="100">Top 100</SelectItem>
          <SelectItem value="200">101 – 200</SelectItem>
          <SelectItem value="300">201 – 300</SelectItem>
          <SelectItem value="400">301 – 400</SelectItem>
          <SelectItem value="500">401 – 500</SelectItem>
          <SelectItem value="600">501 – 600</SelectItem>
          <SelectItem value="700">601 – 700</SelectItem>
          <SelectItem value="800">701 – 800</SelectItem>
          <SelectItem value="900">801 – 900</SelectItem>
          <SelectItem value="1000">901 – 1000</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
